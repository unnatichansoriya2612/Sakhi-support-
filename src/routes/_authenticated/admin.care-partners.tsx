import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DashboardShell,
  adminNav,
} from "@/components/site/DashboardShell";

import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";

import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/care-partners")({
  head: () => ({
    meta: [
      { title: "Care Partners — Sakhi" },
      {
        name: "description",
        content: "Manage Sakhi Care Partners.",
      },
      {
        property: "og:title",
        content: "Care Partners — Sakhi",
      },
      {
        property: "og:description",
        content: "Manage Sakhi Care Partners.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <AdminCarePartnersPage />
    </RoleGate>
  ),
});

type CarePartnerRow = {
  id: string;
  profile_id: string;
  bio: string | null;
  experience_years: number;
  languages: string;
  service_area: string;
  hourly_rate: number | null;
  approval_status: string;
  verification_status: string;
  training_status: string;
  admin_notes: string | null;
  profiles:
    | {
        id: string;
        full_name: string;
        phone: string | null;
        avatar_url: string | null;
        city: string | null;
      }
    | null;
};

const DEFAULT_HOURLY_RATE = 250;

function AdminCarePartnersPage() {
  const queryClient = useQueryClient();

  const [editingRate, setEditingRate] = useState<string | null>(null);
  const [rateValue, setRateValue] = useState("");
  const [savingRate, setSavingRate] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);

  const {
    data: partners = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "care-partners"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_partners")
        .select(
          `
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
          profiles!care_partners_profile_id_fkey(
            id,
            full_name,
            phone,
            avatar_url,
            city
          )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      return (data ?? []) as CarePartnerRow[];
    },
  });

  function startEditingRate(partner: CarePartnerRow) {
    setEditingRate(partner.id);

    setRateValue(
      partner.hourly_rate !== null
        ? String(partner.hourly_rate)
        : "",
    );
  }

  function cancelEditingRate() {
    setEditingRate(null);
    setRateValue("");
  }

  async function saveRate(partnerId: string) {
    const trimmed = rateValue.trim();

    /*
     * Empty means the partner/admin wants the default rate.
     * Therefore we store NULL.
     */
    const rate =
      trimmed === ""
        ? null
        : Number(trimmed);

    if (
      rate !== null &&
      (!Number.isFinite(rate) ||
        rate <= 0 ||
        rate > 10000)
    ) {
      toast.error(
        "Please enter a valid hourly rate between ₹1 and ₹10,000.",
      );
      return;
    }

    setSavingRate(true);

    const { error } = await supabase
      .from("care_partners")
      .update({
        hourly_rate: rate,
      })
      .eq("id", partnerId);

    setSavingRate(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success(
      rate === null
        ? "Hourly rate reset to the Sakhi default."
        : "Hourly rate updated successfully.",
    );

    cancelEditingRate();

    await queryClient.invalidateQueries({
      queryKey: ["admin", "care-partners"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["care-partners"],
    });
  }

  async function updateApproval(
    partnerId: string,
    status: "pending" | "approved" | "rejected",
  ) {
    setUpdatingStatus(partnerId);

    const { error } = await supabase
      .from("care_partners")
      .update({
        approval_status: status,
      })
      .eq("id", partnerId);

    setUpdatingStatus(null);

    if (error) {
      toast.error(error.message);
      return;
    }

    if (status === "approved") {
      toast.success("Care Partner approved.");
    } else if (status === "rejected") {
      toast.success("Care Partner rejected.");
    } else {
      toast.success("Application moved to pending.");
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "care-partners"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["admin", "care-partner-applications"],
    });

    await queryClient.invalidateQueries({
      queryKey: ["care-partners"],
    });
  }

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Care Partners"
      description="Manage Care Partner applications, approval and pricing."
    >
      <div className="space-y-6">
        {/* INTRO */}
        <div className="surface-card p-5">
          <h2 className="text-lg font-medium">
            Care Partner management
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Review Care Partners, approve or reject applications,
            and manage their hourly rates.
          </p>
        </div>

        {/* LOADING */}
        {isLoading ? (
          <div className="surface-card p-6">
            <p className="text-sm text-muted-foreground">
              Loading Care Partners...
            </p>
          </div>
        ) : error ? (
          /* ERROR */
          <div className="surface-card p-6">
            <p className="text-sm text-destructive">
              Failed to load Care Partners.
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
              {error instanceof Error
                ? error.message
                : "Unknown error"}
            </p>
          </div>
        ) : partners.length === 0 ? (
          /* EMPTY */
          <div className="surface-card p-8 text-center">
            <h2 className="text-lg font-medium">
              No Care Partners yet
            </h2>

            <p className="mt-2 text-sm text-muted-foreground">
              New Care Partner accounts will appear here.
            </p>
          </div>
        ) : (
          /* PARTNER LIST */
          <div className="space-y-4">
            {partners.map((partner) => {
              const profile = partner.profiles;

              const effectiveRate =
                partner.hourly_rate ?? DEFAULT_HOURLY_RATE;

              return (
                <div
                  key={partner.id}
                  className="surface-card p-6"
                >
                  {/* HEADER */}
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-xl font-medium">
                        {profile?.full_name || "Care Partner"}
                      </h2>

                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        {profile?.phone && (
                          <p>{profile.phone}</p>
                        )}

                        {profile?.city && (
                          <p>{profile.city}</p>
                        )}

                        {partner.service_area && (
                          <p>
                            Service area:{" "}
                            {partner.service_area}
                          </p>
                        )}

                        <p>
                          Experience:{" "}
                          {partner.experience_years}{" "}
                          {partner.experience_years === 1
                            ? "year"
                            : "years"}
                        </p>

                        {partner.languages && (
                          <p>
                            Languages: {partner.languages}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* STATUS BADGES */}
                    <div className="flex flex-wrap gap-2">
                      <StatusBadge
                        status={partner.approval_status}
                      />

                      <StatusBadge
                        status={partner.verification_status}
                      />

                      <StatusBadge
                        status={partner.training_status}
                      />
                    </div>
                  </div>

                  {/* RATE + APPROVAL */}
                  <div className="mt-6 grid gap-6 border-t border-border pt-5 md:grid-cols-2">
                    {/* HOURLY RATE */}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Hourly rate
                      </p>

                      {editingRate === partner.id ? (
                        <div className="mt-2 flex flex-wrap items-end gap-2">
                          <div className="w-full sm:w-48">
                            <Label
                              htmlFor={`rate-${partner.id}`}
                              className="sr-only"
                            >
                              Hourly rate
                            </Label>

                            <Input
                              id={`rate-${partner.id}`}
                              type="number"
                              min="1"
                              max="10000"
                              step="0.01"
                              value={rateValue}
                              onChange={(event) =>
                                setRateValue(
                                  event.target.value,
                                )
                              }
                              placeholder="250"
                            />
                          </div>

                          <Button
                            type="button"
                            onClick={() =>
                              void saveRate(partner.id)
                            }
                            disabled={savingRate}
                          >
                            {savingRate
                              ? "Saving..."
                              : "Save"}
                          </Button>

                          <Button
                            type="button"
                            variant="outline"
                            onClick={cancelEditingRate}
                            disabled={savingRate}
                          >
                            Cancel
                          </Button>
                        </div>
                      ) : (
                        <div className="mt-2 flex flex-wrap items-center gap-3">
                          <span className="font-display text-xl">
                            {formatCurrency(effectiveRate)}
                            /hr
                          </span>

                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              startEditingRate(partner)
                            }
                          >
                            Change rate
                          </Button>
                        </div>
                      )}

                      {partner.hourly_rate === null ? (
                        <p className="mt-2 text-xs text-muted-foreground">
                          No custom rate requested. Sakhi's
                          default rate of{" "}
                          {formatCurrency(
                            DEFAULT_HOURLY_RATE,
                          )}
                          /hour applies.
                        </p>
                      ) : (
                        <p className="mt-2 text-xs text-muted-foreground">
                          Custom rate requested by the Care
                          Partner. Admin can change it.
                        </p>
                      )}
                    </div>

                    {/* APPROVAL */}
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Application approval
                      </p>

                      <div className="mt-2 flex flex-wrap gap-2">
                        {partner.approval_status !==
                          "approved" && (
                          <Button
                            type="button"
                            size="sm"
                            onClick={() =>
                              void updateApproval(
                                partner.id,
                                "approved",
                              )
                            }
                            disabled={
                              updatingStatus ===
                              partner.id
                            }
                          >
                            {updatingStatus ===
                            partner.id
                              ? "Updating..."
                              : "Approve"}
                          </Button>
                        )}

                        {partner.approval_status !==
                          "rejected" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              void updateApproval(
                                partner.id,
                                "rejected",
                              )
                            }
                            disabled={
                              updatingStatus ===
                              partner.id
                            }
                          >
                            {updatingStatus ===
                            partner.id
                              ? "Updating..."
                              : "Reject"}
                          </Button>
                        )}

                        {partner.approval_status ===
                          "rejected" && (
                          <Button
                            type="button"
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              void updateApproval(
                                partner.id,
                                "pending",
                              )
                            }
                            disabled={
                              updatingStatus ===
                              partner.id
                            }
                          >
                            {updatingStatus ===
                            partner.id
                              ? "Updating..."
                              : "Move to pending"}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* ABOUT */}
                  {partner.bio && (
                    <div className="mt-5 border-t border-border pt-5">
                      <p className="text-sm font-medium">
                        About
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {partner.bio}
                      </p>
                    </div>
                  )}

                  {/* ADMIN NOTES */}
                  {partner.admin_notes && (
                    <div className="mt-4 rounded-lg bg-sand p-4">
                      <p className="text-sm font-medium">
                        Admin notes
                      </p>

                      <p className="mt-1 text-sm text-muted-foreground">
                        {partner.admin_notes}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardShell>
  );
}