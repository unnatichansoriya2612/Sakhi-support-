import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import {
  formatCurrency,
  formatDate,
  formatTime,
} from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/bookings")({
  head: () => ({
    meta: [
      { title: "Bookings — Sakhi" },
      { name: "description", content: "All bookings on the platform." },
      { property: "og:title", content: "Bookings — Sakhi" },
      { property: "og:description", content: "All bookings on the platform." },
    ],
  }),
  component: () => (
    <RoleGate allow={["admin"]}>
      <AdminBookingsPage />
    </RoleGate>
  ),
});

function AdminBookingsPage() {
  const queryClient = useQueryClient();

  const {
    data: bookings,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["bookings", "admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(
          `
          *,
          profiles!bookings_customer_id_fkey (
            full_name,
            email,
            phone
          ),
          care_partners (
            id,
            profiles!care_partners_profile_id_fkey (
              full_name,
              phone
            )
          )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  async function updateStatus(
    bookingId: string,
    status:
      | "pending"
      | "accepted"
      | "rejected"
      | "confirmed"
      | "in_progress"
      | "completed"
      | "cancelled",
  ) {
    const { error } = await supabase
      .from("bookings")
      .update({ status })
      .eq("id", bookingId);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["bookings", "admin"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["bookings"],
    });

    toast.success(`Booking marked as ${status}.`);
  }

  if (isLoading) {
    return (
      <DashboardShell
        nav={adminNav}
        eyebrow="Admin"
        title="Bookings"
        description="All bookings on the platform."
      >
        <p className="text-sm text-muted-foreground">
          Loading bookings...
        </p>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell
        nav={adminNav}
        eyebrow="Admin"
        title="Bookings"
        description="All bookings on the platform."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load bookings
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading bookings."}
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Bookings"
      description="All bookings on the platform."
    >
      {(bookings ?? []).length === 0 ? (
        <div className="surface-card p-8 text-center">
          <h2 className="text-lg font-medium">
            No bookings yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Customer booking requests will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {(bookings ?? []).map((booking) => {
            const customer = (
              booking as {
                profiles?: {
                  full_name?: string;
                  email?: string;
                  phone?: string;
                };
              }
            ).profiles;

            const partner = (
              booking as {
                care_partners?: {
                  profiles?: {
                    full_name?: string;
                    phone?: string;
                  };
                };
              }
            ).care_partners?.profiles;

            return (
              <div
                key={booking.id}
                className="surface-card p-6"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <h2 className="text-lg font-medium">
                        {customer?.full_name || "Customer"}
                      </h2>

                      <StatusBadge status={booking.status} />
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                      Care Partner:{" "}
                      {partner?.full_name || "Care Partner"}
                    </p>
                  </div>

                  <div className="text-left lg:text-right">
                    <p className="font-display text-xl">
                      {formatCurrency(booking.total_amount)}
                    </p>

                    <p className="text-xs text-muted-foreground">
                      {Number(booking.duration_hours)} hours
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-muted-foreground">
                      Date
                    </p>
                    <p className="mt-1 font-medium">
                      {formatDate(booking.date)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Time
                    </p>
                    <p className="mt-1 font-medium">
                      {formatTime(booking.start_time)} –{" "}
                      {formatTime(booking.end_time)}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Customer phone
                    </p>
                    <p className="mt-1 font-medium">
                      {customer?.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-muted-foreground">
                      Partner phone
                    </p>
                    <p className="mt-1 font-medium">
                      {partner?.phone || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 rounded-lg bg-sand p-4 text-sm">
                  <p className="font-medium">
                    Visit address
                  </p>

                  <p className="mt-1 text-muted-foreground">
                    {booking.address}
                  </p>

                  {booking.instructions ? (
                    <>
                      <p className="mt-3 font-medium">
                        Customer instructions
                      </p>

                      <p className="mt-1 text-muted-foreground">
                        {booking.instructions}
                      </p>
                    </>
                  ) : null}
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {booking.status === "pending" ? (
                    <>
                      <Button
                        size="sm"
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "accepted",
                          )
                        }
                      >
                        Accept
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateStatus(
                            booking.id,
                            "rejected",
                          )
                        }
                      >
                        Reject
                      </Button>
                    </>
                  ) : null}

                  {booking.status === "accepted" ? (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "confirmed",
                        )
                      }
                    >
                      Confirm
                    </Button>
                  ) : null}

                  {booking.status === "confirmed" ? (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "in_progress",
                        )
                      }
                    >
                      Start visit
                    </Button>
                  ) : null}

                  {booking.status === "in_progress" ? (
                    <Button
                      size="sm"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "completed",
                        )
                      }
                    >
                      Mark completed
                    </Button>
                  ) : null}

                  {["pending", "accepted", "confirmed"].includes(
                    booking.status,
                  ) ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateStatus(
                          booking.id,
                          "cancelled",
                        )
                      }
                    >
                      Cancel
                    </Button>
                  ) : null}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </DashboardShell>
  );
}