import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { DashboardShell, partnerNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { EmptyState } from "@/components/site/EmptyState";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/partner/training")({
  head: () => ({
    meta: [
      { title: "Training — Sakhi" },
      { name: "description", content: "Your Sakhi training records." },
      { property: "og:title", content: "Training — Sakhi" },
      { property: "og:description", content: "Your Sakhi training records." },
    ],
  }),
  component: () => (
    <RoleGate allow={["care_partner"]}>
      <PageAuthenticatedPartnerTraining />
    </RoleGate>
  ),
});

function PageAuthenticatedPartnerTraining() {
  const { user } = useAuth();

  const { data: carePartner, isLoading: partnerLoading } = useQuery({
    queryKey: ["care-partner", user?.id],
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

  const { data: trainingRecords, isLoading: trainingLoading } = useQuery({
    queryKey: ["training-records", carePartner?.id],
    enabled: Boolean(carePartner?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("training_records")
        .select(
          "id, training_name, status, notes, completed_at, created_at"
        )
        .eq("care_partner_id", carePartner!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data ?? [];
    },
  });

  const isLoading = partnerLoading || trainingLoading;

  return (
    <DashboardShell
      nav={partnerNav}
      eyebrow="Care Partner"
      title="Training"
      description="View your Sakhi training records and completion status."
    >
      {isLoading ? (
        <div className="surface-card p-6">
          <p className="text-sm text-muted-foreground">
            Loading your training records...
          </p>
        </div>
      ) : !carePartner ? (
        <EmptyState
          title="Care Partner profile not found"
          description="Your Care Partner profile could not be found. Please contact Sakhi support."
        />
      ) : (trainingRecords ?? []).length === 0 ? (
        <EmptyState
          title="No training records yet"
          description="Your training records will appear here once Sakhi adds your training."
        />
      ) : (
        <div className="space-y-4">
          {(trainingRecords ?? []).map((training) => (
            <div key={training.id} className="surface-card p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <h2 className="text-lg font-medium">
                    {training.training_name}
                  </h2>

                  {training.created_at ? (
                    <p className="mt-1 text-sm text-muted-foreground">
                      Added {formatDate(training.created_at)}
                    </p>
                  ) : null}
                </div>

                <StatusBadge status={training.status} />
              </div>

              {training.notes ? (
                <div className="mt-4 rounded-lg bg-sand p-4">
                  <p className="text-sm text-muted-foreground">
                    {training.notes}
                  </p>
                </div>
              ) : null}

              {training.completed_at ? (
                <p className="mt-4 text-sm">
                  <span className="text-muted-foreground">
                    Completed on:{" "}
                  </span>
                  <span className="font-medium">
                    {formatDate(training.completed_at)}
                  </span>
                </p>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}