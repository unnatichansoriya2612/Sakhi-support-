import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { DashboardShell, partnerNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { EmptyState } from "@/components/site/EmptyState";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { formatCurrency, formatDate, formatTime } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/partner/earnings")({
  head: () => ({
    meta: [
      { title: "Earnings — Sakhi" },
      {
        name: "description",
        content: "Hours worked and amounts earned.",
      },
      {
        property: "og:title",
        content: "Earnings — Sakhi",
      },
      {
        property: "og:description",
        content: "Hours worked and amounts earned.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["care_partner"]}>
      <PageAuthenticatedPartnerEarnings />
    </RoleGate>
  ),
});

function PageAuthenticatedPartnerEarnings() {
  const { user } = useAuth();

  /*
   * First find the Care Partner record belonging
   * to the currently logged-in user.
   */
  const { data: partner, isLoading: partnerLoading } = useQuery({
    queryKey: ["my-care-partner", user?.id],

    enabled: Boolean(user?.id),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_partners")
        .select("id")
        .eq("profile_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  /*
   * Get completed bookings for this Care Partner.
   */
  const {
    data: bookings,
    isLoading: bookingsLoading,
    error,
  } = useQuery({
    queryKey: ["partner-earnings", partner?.id],

    enabled: Boolean(partner?.id),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          date,
          start_time,
          end_time,
          duration_hours,
          hourly_rate,
          total_amount,
          status
        `)
        .eq("care_partner_id", partner!.id)
        .eq("status", "completed")
        .order("date", { ascending: false })
        .order("start_time", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  if (partnerLoading) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Earnings"
        description="Hours worked and amounts earned."
      >
        <p className="text-sm text-muted-foreground">
          Loading your Care Partner profile...
        </p>
      </DashboardShell>
    );
  }

  if (!partner) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Earnings"
        description="Hours worked and amounts earned."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Care Partner profile not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your Care Partner profile has not been created yet.
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (bookingsLoading) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Earnings"
        description="Hours worked and amounts earned."
      >
        <p className="text-sm text-muted-foreground">
          Loading earnings...
        </p>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Earnings"
        description="Hours worked and amounts earned."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Unable to load earnings
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error.message}
          </p>
        </div>
      </DashboardShell>
    );
  }

  const completedBookings = bookings ?? [];

  const totalHours = completedBookings.reduce(
    (sum, booking) =>
      sum + Number(booking.duration_hours ?? 0),
    0,
  );

  const totalEarnings = completedBookings.reduce(
    (sum, booking) =>
      sum + Number(booking.total_amount ?? 0),
    0,
  );

  return (
    <DashboardShell
      nav={partnerNav}
      eyebrow="Care Partner"
      title="Earnings"
      description="Hours worked and amounts earned."
    >
      {/* SUMMARY */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="surface-card p-6">
          <p className="text-sm text-muted-foreground">
            Total hours worked
          </p>

          <p className="mt-2 font-display text-3xl">
            {totalHours}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            From completed bookings
          </p>
        </div>

        <div className="surface-card p-6">
          <p className="text-sm text-muted-foreground">
            Total earnings
          </p>

          <p className="mt-2 font-display text-3xl">
            {formatCurrency(totalEarnings)}
          </p>

          <p className="mt-1 text-xs text-muted-foreground">
            From completed bookings
          </p>
        </div>
      </div>

      {/* BOOKING HISTORY */}
      <div className="mt-8">
        <h2 className="text-xl font-medium">
          Completed bookings
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your earnings are calculated from completed visits.
        </p>

        {completedBookings.length === 0 ? (
          <div className="mt-5">
            <EmptyState
              title="No completed bookings yet"
              description="Once you complete a booking, your hours and earnings will appear here."
            />
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {completedBookings.map((booking) => (
              <div
                key={booking.id}
                className="surface-card flex flex-wrap items-center justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-medium">
                    {formatDate(booking.date)}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {formatTime(booking.start_time)} –{" "}
                    {formatTime(booking.end_time)}
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {Number(booking.duration_hours)} hours ×{" "}
                    {formatCurrency(booking.hourly_rate)}/hr
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <StatusBadge status={booking.status} />

                  <span className="font-display text-lg">
                    {formatCurrency(booking.total_amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PAYMENT NOTE */}
      <div className="mt-6 rounded-xl border border-border bg-sand p-4 text-sm text-muted-foreground">
        Sakhi does not process payments in this MVP. The amount shown here is
        the booking amount calculated from your hourly rate and completed
        hours. Payment is settled directly with the customer.
      </div>
    </DashboardShell>
  );
}