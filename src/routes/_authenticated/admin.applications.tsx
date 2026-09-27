import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { EmptyState } from "@/components/site/EmptyState";

import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/applications")({
  head: () => ({
    meta: [
      { title: "Applications — Sakhi" },
      {
        name: "description",
        content: "Care Partner applications awaiting review.",
      },
      { property: "og:title", content: "Applications — Sakhi" },
      {
        property: "og:description",
        content: "Care Partner applications awaiting review.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminApplications />
    </RoleGate>
  ),
});

function PageAuthenticatedAdminApplications() {
  const queryClient = useQueryClient();

  const {
    data: applications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "care-partner-applications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_partners")
        .select(`
          id,
          profile_id,
          bio,
          experience_years,
          languages,
          service_area,
          hourly_rate,
          approval_status,
          verification_status,
          training_status,
          admin_notes,
          created_at,
          updated_at,
          profiles!care_partners_profile_id_fkey(
            full_name,
            email,
            phone,
            city
          )
        `)
        .in("approval_status", ["pending", "rejected", "not_submitted"])
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  async function updateApplication(
    id: string,
    status: "approved" | "rejected",
  ) {
    const { error } = await supabase
      .from("care_partners")
      .update({
        approval_status: status,
      })
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "care-partner-applications"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["care-partners"],
    });

    toast.success(
      status === "approved"
        ? "Care Partner approved."
        : "Care Partner application rejected.",
    );
  }

  async function approveApplication(id: string) {
    await updateApplication(id, "approved");
  }

  async function rejectApplication(id: string) {
    await updateApplication(id, "rejected");
  }

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Applications"
      description="Review Care Partner applications and approve or reject them."
    >
      {isLoading ? (
        <div className="surface-card p-6">
          <p className="text-sm text-muted-foreground">
            Loading applications...
          </p>
        </div>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Unable to load applications
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading applications."}
          </p>
        </div>
      ) : (applications ?? []).length === 0 ? (
        <EmptyState
          title="No applications yet"
          description="Care Partner applications submitted for review will appear here."
        />
      ) : (
        <div className="space-y-5">
          {(applications ?? []).map((application) => {
            const profile = application.profiles as
              | {
                  full_name?: string;
                  email?: string;
                  phone?: string | null;
                  city?: string | null;
                }
              | null;

            return (
              <div
                key={application.id}
                className="surface-card p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-medium">
                      {profile?.full_name || "Care Partner"}
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {profile?.email || "No email available"}
                    </p>
                  </div>

                  <StatusBadge status={application.approval_status} />
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Phone
                    </p>
                    <p className="mt-1 text-sm">
                      {profile?.phone || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      City
                    </p>
                    <p className="mt-1 text-sm">
                      {profile?.city || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Experience
                    </p>
                    <p className="mt-1 text-sm">
                      {application.experience_years} years
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Hourly rate
                    </p>
                    <p className="mt-1 text-sm">
                      {application.hourly_rate != null
                        ? `${formatCurrency(application.hourly_rate)}/hr`
                        : "Not set"}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Languages
                    </p>
                    <p className="mt-1 text-sm">
                      {application.languages || "Not provided"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Service area
                    </p>
                    <p className="mt-1 text-sm">
                      {application.service_area || "Not provided"}
                    </p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs text-muted-foreground">
                    Bio
                  </p>

                  <p className="mt-1 rounded-lg bg-sand p-4 text-sm">
                    {application.bio || "No bio provided."}
                  </p>
                </div>

                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-muted-foreground">
                      Verification
                    </p>
                    <div className="mt-1">
                      <StatusBadge
                        status={application.verification_status}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-muted-foreground">
                      Training
                    </p>
                    <div className="mt-1">
                      <StatusBadge
                        status={application.training_status}
                      />
                    </div>
                  </div>
                </div>

                {application.admin_notes ? (
                  <div className="mt-5">
                    <p className="text-xs text-muted-foreground">
                      Admin notes
                    </p>

                    <p className="mt-1 rounded-lg border border-border p-4 text-sm">
                      {application.admin_notes}
                    </p>
                  </div>
                ) : null}

                <div className="mt-6 flex flex-wrap gap-3 border-t border-border pt-5">
                  {application.approval_status !== "approved" ? (
                    <Button
                      onClick={() => approveApplication(application.id)}
                    >
                      Approve
                    </Button>
                  ) : null}

                  {application.approval_status !== "rejected" ? (
                    <Button
                      variant="outline"
                      onClick={() => rejectApplication(application.id)}
                    >
                      Reject
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