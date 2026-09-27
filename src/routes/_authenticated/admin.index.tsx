import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/_authenticated/admin/")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Sakhi" },
      {
        name: "description",
        content: "Platform overview for the Sakhi team.",
      },
      { property: "og:title", content: "Admin Dashboard — Sakhi" },
      {
        property: "og:description",
        content: "Platform overview for the Sakhi team.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdmin />
    </RoleGate>
  ),
});

function PageAuthenticatedAdmin() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin", "dashboard"],

    queryFn: async () => {
      const [
        profilesResult,
        carePartnersResult,
        pendingApplicationsResult,
        approvedPartnersResult,
        pendingVerificationResult,
        pendingTrainingResult,
        activeBookingsResult,
        openComplaintsResult,
      ] = await Promise.all([
        supabase
          .from("profiles")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("care_partners")
          .select("id", { count: "exact", head: true }),

        supabase
          .from("care_partners")
          .select("id", { count: "exact", head: true })
          .eq("approval_status", "pending"),

        supabase
          .from("care_partners")
          .select("id", { count: "exact", head: true })
          .eq("approval_status", "approved"),

        supabase
          .from("care_partners")
          .select("id", { count: "exact", head: true })
          .in("verification_status", ["not_started", "in_review"]),

        supabase
          .from("care_partners")
          .select("id", { count: "exact", head: true })
          .in("training_status", ["not_started", "in_progress"]),

        supabase
          .from("bookings")
          .select("id", { count: "exact", head: true })
          .in("status", ["pending", "accepted", "confirmed", "in_progress"]),

        supabase
          .from("complaints")
          .select("id", { count: "exact", head: true })
          .in("status", ["open", "investigating"]),
      ]);

      const results = [
        profilesResult,
        carePartnersResult,
        pendingApplicationsResult,
        approvedPartnersResult,
        pendingVerificationResult,
        pendingTrainingResult,
        activeBookingsResult,
        openComplaintsResult,
      ];

      const failed = results.find((result) => result.error);

      if (failed?.error) {
        throw failed.error;
      }

      return {
        users: profilesResult.count ?? 0,
        carePartners: carePartnersResult.count ?? 0,
        pendingApplications: pendingApplicationsResult.count ?? 0,
        approvedPartners: approvedPartnersResult.count ?? 0,
        pendingVerification: pendingVerificationResult.count ?? 0,
        pendingTraining: pendingTrainingResult.count ?? 0,
        activeBookings: activeBookingsResult.count ?? 0,
        openComplaints: openComplaintsResult.count ?? 0,
      };
    },
  });

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Sakhi Admin"
      title="Admin Dashboard"
      description="Platform overview for the Sakhi team."
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading dashboard...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load dashboard
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading the dashboard."}
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Total Users"
              value={data?.users ?? 0}
            />

            <DashboardCard
              title="Care Partners"
              value={data?.carePartners ?? 0}
            />

            <DashboardCard
              title="Approved Partners"
              value={data?.approvedPartners ?? 0}
            />

            <DashboardCard
              title="Pending Applications"
              value={data?.pendingApplications ?? 0}
            />
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="Pending Verification"
              value={data?.pendingVerification ?? 0}
            />

            <DashboardCard
              title="Pending Training"
              value={data?.pendingTraining ?? 0}
            />

            <DashboardCard
              title="Active Bookings"
              value={data?.activeBookings ?? 0}
            />

            <DashboardCard
              title="Open Complaints"
              value={data?.openComplaints ?? 0}
            />
          </div>

          <div className="mt-8 surface-card p-6">
            <h2 className="text-lg font-medium">
              Admin overview
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              Use the Admin navigation to review applications,
              Care Partners, verification, training, bookings and
              complaints.
            </p>
          </div>
        </>
      )}
    </DashboardShell>
  );
}

function DashboardCard({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="surface-card p-6">
      <p className="text-sm text-muted-foreground">
        {title}
      </p>

      <p className="mt-2 font-display text-3xl">
        {value}
      </p>
    </div>
  );
}