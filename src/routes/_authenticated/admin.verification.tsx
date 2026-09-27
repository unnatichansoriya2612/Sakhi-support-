import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/format";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_authenticated/admin/verification")({
  head: () => ({
    meta: [
      { title: "Verification — Sakhi" },
      {
        name: "description",
        content: "Identity and background verification records.",
      },
      { property: "og:title", content: "Verification — Sakhi" },
      {
        property: "og:description",
        content: "Identity and background verification records.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminVerification />
    </RoleGate>
  ),
});

type VerificationRecord = {
  id: string;
  care_partner_id: string;
  verification_type: string;
  status: "pending" | "in_progress" | "completed" | "failed";
  notes: string | null;
  verified_at: string | null;
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

function PageAuthenticatedAdminVerification() {
  const queryClient = useQueryClient();

  const {
    data: records,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "verification-records"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("verification_records")
        .select(`
          id,
          care_partner_id,
          verification_type,
          status,
          notes,
          verified_at,
          created_at,
          care_partners!verification_records_care_partner_id_fkey(
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

      return (data ?? []) as VerificationRecord[];
    },
  });

  async function updateVerification(
    record: VerificationRecord,
    status: VerificationRecord["status"],
  ) {
    const { error } = await supabase
      .from("verification_records")
      .update({
        status,
        verified_at:
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
      queryKey: ["admin", "verification-records"],
    });

    toast.success(
      `Verification marked as ${status.replace("_", " ")}.`,
    );
  }

  async function addVerification() {
    const carePartnerId = window.prompt(
      "Enter the Care Partner ID:",
    );

    if (!carePartnerId?.trim()) return;

    const verificationType = window.prompt(
      "Enter verification type (for example: Identity, Address, Background):",
    );

    if (!verificationType?.trim()) return;

    const { error } = await supabase
      .from("verification_records")
      .insert({
        care_partner_id: carePartnerId.trim(),
        verification_type: verificationType.trim(),
        status: "pending",
      });

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "verification-records"],
    });

    toast.success("Verification record added.");
  }

  async function deleteVerification(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this verification record?",
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("verification_records")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "verification-records"],
    });

    toast.success("Verification record deleted.");
  }

  const total = records?.length ?? 0;

  const pending =
    records?.filter((r) => r.status === "pending").length ?? 0;

  const inProgress =
    records?.filter((r) => r.status === "in_progress").length ?? 0;

  const completed =
    records?.filter((r) => r.status === "completed").length ?? 0;

  const failed =
    records?.filter((r) => r.status === "failed").length ?? 0;

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Verification"
      description="Identity and background verification records."
      actions={
        <Button onClick={addVerification}>
          Add verification
        </Button>
      }
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading verification records...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load verification records
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading verification records."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            <SummaryCard
              label="Total"
              value={total}
            />

            <SummaryCard
              label="Pending"
              value={pending}
            />

            <SummaryCard
              label="In progress"
              value={inProgress}
            />

            <SummaryCard
              label="Completed"
              value={completed}
            />

            <SummaryCard
              label="Failed"
              value={failed}
            />
          </div>

          {/* Records */}
          {total === 0 ? (
            <div className="surface-card p-8 text-center">
              <h2 className="text-lg font-medium">
                No verification records yet
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Verification records will appear here when they
                are created for Care Partners.
              </p>

              <Button
                className="mt-5"
                onClick={addVerification}
              >
                Add verification
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
                            {record.verification_type}
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

                          {record.verified_at ? (
                            <p>
                              <span className="text-muted-foreground">
                                Completed:
                              </span>{" "}
                              {formatDate(
                                record.verified_at,
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
                              updateVerification(
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
                              updateVerification(
                                record,
                                "completed",
                              )
                            }
                          >
                            Mark verified
                          </Button>
                        ) : null}

                        {record.status !== "failed" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              updateVerification(
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
                            deleteVerification(record.id)
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