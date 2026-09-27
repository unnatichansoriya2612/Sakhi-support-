import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { DashboardShell, partnerNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { EmptyState } from "@/components/site/EmptyState";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/partner/bookings")({
  head: () => ({
    meta: [
      { title: "Partner Bookings — Sakhi" },
      { name: "description", content: "Requests and confirmed visits." },
      { property: "og:title", content: "Partner Bookings — Sakhi" },
      { property: "og:description", content: "Requests and confirmed visits." },
    ],
  }),
  component: () => (
    <RoleGate allow={["care_partner"]}>
      <PartnerBookingsPage />
    </RoleGate>
  ),
});

type BookingWithCustomer = {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  duration_hours: number | string;
  hourly_rate: number | string;
  total_amount: number | string;
  address: string;
  instructions: string | null;
  status: string;
  customer_id: string;
  profiles?: {
    full_name?: string;
    phone?: string | null;
  } | null;
};

function PartnerBookingsPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: bookings = [],
    isLoading,
    error,
  } = useQuery<BookingWithCustomer[]>({
    queryKey: ["bookings", "partner", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      if (!user?.id) return [];

      const { data: partner, error: partnerError } = await supabase
        .from("care_partners")
        .select("id")
        .eq("profile_id", user.id)
        .maybeSingle();

      if (partnerError) throw partnerError;

      if (!partner) {
        throw new Error("Care Partner profile was not found.");
      }

      const { data, error: bookingsError } = await supabase
        .from("bookings")
        .select(`
          id,
          date,
          start_time,
          end_time,
          duration_hours,
          hourly_rate,
          total_amount,
          address,
          instructions,
          status,
          customer_id,
          profiles!bookings_customer_id_fkey(
            full_name,
            phone
          )
        `)
        .eq("care_partner_id", partner.id)
        .order("date", { ascending: true })
        .order("start_time", { ascending: true });

      if (bookingsError) throw bookingsError;

      return (data ?? []) as BookingWithCustomer[];
    },
  });

  async function updateStatus(
    bookingId: string,
    status: "accepted" | "rejected" | "in_progress" | "completed",
  ) {
    const confirmation =
      status === "rejected"
        ? window.confirm("Are you sure you want to reject this booking request?")
        : true;

    if (!confirmation) return;

    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["bookings", "partner", user?.id],
    });

    await queryClient.invalidateQueries({
      queryKey: ["bookings"],
    });

    toast.success(
      status === "accepted"
        ? "Booking accepted."
        : status === "rejected"
          ? "Booking rejected."
          : status === "in_progress"
            ? "Booking marked as in progress."
            : "Booking completed.",
    );
  }

  if (isLoading) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Partner Bookings"
        description="Requests and confirmed visits."
      >
        <p className="text-sm text-muted-foreground">Loading bookings...</p>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Partner Bookings"
        description="Requests and confirmed visits."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">Could not load bookings</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Something went wrong."}
          </p>
        </div>
      </DashboardShell>
    );
  }

  const pending = bookings.filter((booking) => booking.status === "pending");
  const upcoming = bookings.filter((booking) =>
    ["accepted", "confirmed", "in_progress"].includes(booking.status),
  );
  const completed = bookings.filter((booking) =>
    ["completed", "rejected", "cancelled"].includes(booking.status),
  );

  return (
    <DashboardShell
      nav={partnerNav}
      eyebrow="Care Partner"
      title="Partner Bookings"
      description="Review requests and manage your Sakhi visits."
    >
      <div className="space-y-8">
        <BookingSection
          title="New requests"
          description="Bookings waiting for your response."
          bookings={pending}
          emptyTitle="No new requests"
          emptyDescription="New booking requests will appear here."
          onStatusChange={updateStatus}
        />

        <BookingSection
          title="Upcoming visits"
          description="Bookings you have accepted or that are in progress."
          bookings={upcoming}
          emptyTitle="No upcoming visits"
          emptyDescription="Accepted bookings will appear here."
          onStatusChange={updateStatus}
        />

        <BookingSection
          title="Past bookings"
          description="Completed, rejected and cancelled bookings."
          bookings={completed}
          emptyTitle="No past bookings"
          emptyDescription="Your completed bookings will appear here."
          onStatusChange={updateStatus}
        />
      </div>
    </DashboardShell>
  );
}

function BookingSection({
  title,
  description,
  bookings,
  emptyTitle,
  emptyDescription,
  onStatusChange,
}: {
  title: string;
  description: string;
  bookings: BookingWithCustomer[];
  emptyTitle: string;
  emptyDescription: string;
  onStatusChange: (
    bookingId: string,
    status: "accepted" | "rejected" | "in_progress" | "completed",
  ) => Promise<void>;
}) {
  return (
    <section>
      <div className="mb-4">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {bookings.length === 0 ? (
        <EmptyState title={emptyTitle} description={emptyDescription} />
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <BookingCard
              key={booking.id}
              booking={booking}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function BookingCard({
  booking,
  onStatusChange,
}: {
  booking: BookingWithCustomer;
  onStatusChange: (
    bookingId: string,
    status: "accepted" | "rejected" | "in_progress" | "completed",
  ) => Promise<void>;
}) {
  const customerName = booking.profiles?.full_name || "Customer";
  const customerPhone = booking.profiles?.phone;

  return (
    <article className="surface-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h3 className="text-lg font-medium">{customerName}</h3>
            <StatusBadge status={booking.status} />
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {formatDate(booking.date)} · {formatTime(booking.start_time)} –{" "}
            {formatTime(booking.end_time)}
          </p>
        </div>

        <div className="text-right">
          <p className="font-display text-xl">
            {formatCurrency(booking.total_amount)}
          </p>
          <p className="text-xs text-muted-foreground">
            {Number(booking.duration_hours)} hours
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-2">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Visit address
          </p>
          <p className="mt-1 text-sm">{booking.address}</p>
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Customer phone
          </p>
          <p className="mt-1 text-sm">
            {customerPhone || "Not provided"}
          </p>
        </div>
      </div>

      {booking.instructions ? (
        <div className="mt-4 rounded-lg bg-sand p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Customer instructions
          </p>
          <p className="mt-1 text-sm">{booking.instructions}</p>
        </div>
      ) : null}

      <div className="mt-5 flex flex-wrap gap-2">
        {booking.status === "pending" ? (
          <>
            <Button
              onClick={() => void onStatusChange(booking.id, "accepted")}
            >
              Accept booking
            </Button>

            <Button
              variant="outline"
              onClick={() => void onStatusChange(booking.id, "rejected")}
            >
              Reject
            </Button>
          </>
        ) : null}

        {["accepted", "confirmed"].includes(booking.status) ? (
          <Button
            onClick={() => void onStatusChange(booking.id, "in_progress")}
          >
            Start visit
          </Button>
        ) : null}

        {booking.status === "in_progress" ? (
          <Button
            onClick={() => void onStatusChange(booking.id, "completed")}
          >
            Mark completed
          </Button>
        ) : null}
      </div>
    </article>
  );
}