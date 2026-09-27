import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  DashboardShell,
  partnerNav,
} from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { EmptyState } from "@/components/site/EmptyState";

import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import {
  formatCurrency,
  formatDate,
  formatTime,
} from "@/lib/format";

export const Route = createFileRoute("/_authenticated/partner/")({
  head: () => ({
    meta: [
      { title: "Care Partner Dashboard — Sakhi" },
      {
        name: "description",
        content: "Your upcoming visits, hours and earnings.",
      },
      {
        property: "og:title",
        content: "Care Partner Dashboard — Sakhi",
      },
      {
        property: "og:description",
        content: "Your upcoming visits, hours and earnings.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["care_partner"]}>
      <PageAuthenticatedPartner />
    </RoleGate>
  ),
});

function PageAuthenticatedPartner() {
  const { user } = useAuth();

  /*
   * Find the Care Partner account belonging
   * to the currently logged-in user.
   */
  const {
    data: partner,
    isLoading: partnerLoading,
  } = useQuery({
    queryKey: ["my-care-partner", user?.id],

    enabled: Boolean(user?.id),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_partners")
        .select(
          "id, approval_status, verification_status, training_status, hourly_rate",
        )
        .eq("profile_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  /*
   * Fetch all bookings belonging to this Care Partner.
   */
  const {
    data: bookings,
    isLoading: bookingsLoading,
  } = useQuery({
    queryKey: ["partner-dashboard-bookings", partner?.id],

    enabled: Boolean(partner?.id),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          customer_id,
          date,
          start_time,
          end_time,
          duration_hours,
          hourly_rate,
          total_amount,
          status,
          address,
          instructions,
          created_at
        `)
        .eq("care_partner_id", partner!.id)
        .order("date", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) throw error;

      return data ?? [];
    },
  });

  if (partnerLoading) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Care Partner Dashboard"
        description="Your upcoming visits, hours and earnings."
      >
        <p className="text-sm text-muted-foreground">
          Loading your dashboard...
        </p>
      </DashboardShell>
    );
  }

  if (!partner) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Care Partner Dashboard"
        description="Your upcoming visits, hours and earnings."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Care Partner profile not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your Care Partner profile has not been created yet.
          </p>

          <Button asChild className="mt-5">
            <Link to="/partner/application">
              Open application
            </Link>
          </Button>
        </div>
      </DashboardShell>
    );
  }

  const allBookings = bookings ?? [];

  /*
   * Only bookings which are waiting for the
   * Care Partner's response.
   */
  const pendingBookings = allBookings.filter(
    (booking) => booking.status === "pending",
  );

  /*
   * Upcoming bookings.
   */
  const today = new Date().toISOString().slice(0, 10);

  const upcomingBookings = allBookings
    .filter(
      (booking) =>
        booking.date >= today &&
        ["accepted", "confirmed", "in_progress"].includes(
          booking.status,
        ),
    )
    .slice(0, 5);

  /*
   * Completed bookings are used for earnings.
   */
  const completedBookings = allBookings.filter(
    (booking) => booking.status === "completed",
  );

  const completedHours = completedBookings.reduce(
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
      title="Care Partner Dashboard"
      description="Your upcoming visits, hours and earnings."
    >
      {/* APPLICATION STATUS */}
      <div className="surface-card p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              Application status
            </p>

            <div className="mt-2 flex flex-wrap gap-2">
              <StatusBadge status={partner.approval_status} />

              <StatusBadge
                status={partner.verification_status}
              />

              <StatusBadge
                status={partner.training_status}
              />
            </div>
          </div>

          <Button asChild variant="outline">
            <Link to="/partner/application">
              View application
            </Link>
          </Button>
        </div>
      </div>

      {/* SUMMARY CARDS */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="surface-card p-5">
          <p className="text-sm text-muted-foreground">
            New requests
          </p>

          <p className="mt-2 font-display text-3xl">
            {pendingBookings.length}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="text-sm text-muted-foreground">
            Upcoming visits
          </p>

          <p className="mt-2 font-display text-3xl">
            {upcomingBookings.length}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="text-sm text-muted-foreground">
            Completed hours
          </p>

          <p className="mt-2 font-display text-3xl">
            {completedHours}
          </p>
        </div>

        <div className="surface-card p-5">
          <p className="text-sm text-muted-foreground">
            Total earnings
          </p>

          <p className="mt-2 font-display text-3xl">
            {formatCurrency(totalEarnings)}
          </p>
        </div>
      </div>

      {/* QUICK ACTIONS */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild>
          <Link to="/partner/bookings">
            View bookings
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link to="/partner/availability">
            Manage availability
          </Link>
        </Button>

        <Button asChild variant="outline">
          <Link to="/partner/earnings">
            View earnings
          </Link>
        </Button>
      </div>

      {/* PENDING REQUESTS */}
      <section className="mt-10">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-medium">
              New booking requests
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Requests waiting for your response.
            </p>
          </div>

          {pendingBookings.length > 0 ? (
            <Button asChild variant="outline" size="sm">
              <Link to="/partner/bookings">
                View all
              </Link>
            </Button>
          ) : null}
        </div>

        {bookingsLoading ? (
          <p className="mt-5 text-sm text-muted-foreground">
            Loading bookings...
          </p>
        ) : pendingBookings.length === 0 ? (
          <div className="mt-5">
            <EmptyState
              title="No new requests"
              description="New customer booking requests will appear here."
            />
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {pendingBookings.slice(0, 5).map((booking) => (
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
                    {" · "}
                    {Number(booking.duration_hours)} hrs
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <StatusBadge status={booking.status} />

                  <span className="font-display text-lg">
                    {formatCurrency(booking.total_amount)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* UPCOMING VISITS */}
      <section className="mt-10">
        <h2 className="text-xl font-medium">
          Upcoming visits
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Your next confirmed visits.
        </p>

        {upcomingBookings.length === 0 ? (
          <div className="mt-5">
            <EmptyState
              title="No upcoming visits"
              description="Accepted and confirmed bookings will appear here."
            />
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            {upcomingBookings.map((booking) => (
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
                    {" · "}
                    {Number(booking.duration_hours)} hrs
                  </p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {booking.address}
                  </p>
                </div>

                <StatusBadge status={booking.status} />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* RATE */}
      <div className="mt-8 rounded-xl border border-border bg-sand p-5">
        <p className="text-sm text-muted-foreground">
          Your current hourly rate
        </p>

        <p className="mt-1 font-display text-2xl">
          {partner.hourly_rate != null
            ? formatCurrency(partner.hourly_rate)
            : "Not set"}
          {partner.hourly_rate != null ? "/hr" : ""}
        </p>

        <p className="mt-2 text-xs text-muted-foreground">
          Your hourly rate is managed by the Sakhi platform.
        </p>
      </div>
    </DashboardShell>
  );
}