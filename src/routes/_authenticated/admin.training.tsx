import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const Route = createFileRoute("/_authenticated/admin/training")({
  head: () => ({
    meta: [
      { title: "Training — Sakhi" },
      {
        name: "description",
        content: "Training records across Care Partners.",
      },
      { property: "og:title", content: "Training — Sakhi" },
      {
        property: "og:description",
        content: "Training records across Care Partners.",
      },
    ],
  }),
  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminTraining />
    </RoleGate>
  ),
});

type TrainingRecord = {
  id: string;
  care_partner_id: string;
  training_name: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  notes: string | null;
  completed_at: string | null;
  created_at: string;
  care_partners?: {
    id: string;
    profiles?: {
      full_name?: string;
      email?: string;
      phone?: string | null;
    } | null;
  } | null;
};

function PageAuthenticatedAdminTraining() {
  const queryClient = useQueryClient();

  const {
    data: records,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "training-records"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("training_records")
        .select(`
          id,
          care_partner_id,
          training_name,
          status,
          notes,
          completed_at,
          created_at,
          care_partners!training_records_care_partner_id_fkey(
            id,
            profiles!care_partners_profile_id_fkey(
              full_name,
              email,
              phone
            )
          )
        `)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []) as TrainingRecord[];
    },
  });

  async function updateTraining(
    record: TrainingRecord,
    status: TrainingRecord["status"],
  ) {
    const { error } = await supabase
      .from("training_records")
      .update({
        status,
        completed_at:
          status === "completed"
            ? new Date().toISOString()
            : null,
      })
      .eq("id", record.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "training-records"],
    });

    toast.success(`Training marked as ${status.replace("_", " ")}.`);
  }

  async function addTraining() {
    const carePartnerId = window.prompt(
      "Enter the Care Partner ID:",
    );

    if (!carePartnerId) return;

    const trainingName = window.prompt(
      "Enter the training name:",
    );

    if (!trainingName?.trim()) return;

    const { error } = await supabase
      .from("training_records")
      .insert({
        care_partner_id: carePartnerId.trim(),
        training_name: trainingName.trim(),
        status: "pending",
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "training-records"],
    });

    toast.success("Training record added.");
  }

  async function deleteTraining(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this training record?",
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("training_records")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "training-records"],
    });

    toast.success("Training record deleted.");
  }

  const total = records?.length ?? 0;
  const pending =
    records?.filter((r) => r.status === "pending").length ?? 0;
  const inProgress =
    records?.filter((r) => r.status === "in_progress").length ?? 0;
  const completed =
    records?.filter((r) => r.status === "completed").length ?? 0;

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Training"
      description="Manage training records across Care Partners."
      actions={
        <Button onClick={addTraining}>
          Add training record
        </Button>
      }
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading training records...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load training records
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading training records."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard label="Total records" value={total} />
            <SummaryCard label="Pending" value={pending} />
            <SummaryCard label="In progress" value={inProgress} />
            <SummaryCard label="Completed" value={completed} />
          </div>

          {/* Records */}
          {total === 0 ? (
            <div className="surface-card p-8 text-center">
              <h2 className="text-lg font-medium">
                No training records yet
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Training records will appear here when they are
                added for Care Partners.
              </p>

              <Button className="mt-5" onClick={addTraining}>
                Add training record
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {records?.map((record) => {
                const partner =
                  record.care_partners?.profiles;

                return (
                  <div
                    key={record.id}
                    className="surface-card p-5"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-3">
                          <h2 className="text-lg font-medium">
                            {record.training_name}
                          </h2>

                          <StatusBadge
                            status={record.status}
                          />
                        </div>

                        <div className="mt-3 space-y-1 text-sm">
                          <p>
                            <span className="text-muted-foreground">
                              Care Partner:
                            </span>{" "}
                            {partner?.full_name ||
                              "Unknown Care Partner"}
                          </p>

                          {partner?.email ? (
                            <p>
                              <span className="text-muted-foreground">
                                Email:
                              </span>{" "}
                              {partner.email}
                            </p>
                          ) : null}

                          {partner?.phone ? (
                            <p>
                              <span className="text-muted-foreground">
                                Phone:
                              </span>{" "}
                              {partner.phone}
                            </p>
                          ) : null}

                          <p>
                            <span className="text-muted-foreground">
                              Added:
                            </span>{" "}
                            {formatDate(record.created_at)}
                          </p>

                          {record.completed_at ? (
                            <p>
                              <span className="text-muted-foreground">
                                Completed:
                              </span>{" "}
                              {formatDate(
                                record.completed_at,
                              )}
                            </p>
                          ) : null}
                        </div>

                        {record.notes ? (
                          <p className="mt-4 rounded-lg bg-sand p-4 text-sm text-muted-foreground">
                            {record.notes}
                          </p>
                        ) : null}
                      </div>

                      <div className="flex flex-wrap gap-2 lg:justify-end">
                        {record.status !== "in_progress" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateTraining(
                                record,
                                "in_progress",
                              )
                            }
                          >
                            In progress
                          </Button>
                        ) : null}

                        {record.status !== "completed" ? (
                          <Button
                            size="sm"
                            onClick={() =>
                              updateTraining(
                                record,
                                "completed",
                              )
                            }
                          >
                            Mark completed
                          </Button>
                        ) : null}

                        {record.status !== "failed" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateTraining(
                                record,
                                "failed",
                              )
                            }
                          >
                            Mark failed
                          </Button>
                        ) : null}

                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() =>
                            deleteTraining(record.id)
                          }
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </DashboardShell>
  );
}

function SummaryCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="surface-card p-5">
      <p className="text-sm text-muted-foreground">
        {label}
      </p>

      <p className="mt-2 font-display text-3xl">
        {value}
      </p>
    </div>
  );
}