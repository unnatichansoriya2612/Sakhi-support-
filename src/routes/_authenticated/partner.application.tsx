import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell, partnerNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/partner/application")({
  head: () => ({
    meta: [
      { title: "Application — Sakhi" },
      {
        name: "description",
        content: "Your onboarding application status.",
      },
      { property: "og:title", content: "Application — Sakhi" },
      {
        property: "og:description",
        content: "Complete your Care Partner application and track your status.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["care_partner"]}>
      <PageAuthenticatedPartnerApplication />
    </RoleGate>
  ),
});

function PageAuthenticatedPartnerApplication() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("0");
  const [languages, setLanguages] = useState("");
  const [serviceArea, setServiceArea] = useState("");

  // Optional hourly-rate request.
  // Empty means: use Sakhi's default rate.
  const [hourlyRate, setHourlyRate] = useState("");

  const [saving, setSaving] = useState(false);

  const {
    data: partner,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["partner", "application", user?.id],
    enabled: Boolean(user?.id),

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
            created_at,
            updated_at
          `,
        )
        .eq("profile_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  const { data: settings } = useQuery({
    queryKey: ["platform-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_settings")
        .select("default_hourly_rate")
        .eq("id", 1)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  const defaultRate = Number(settings?.default_hourly_rate ?? 250);

  /*
   * Fill the form after the partner record loads.
   */
  useEffect(() => {
    if (!partner) return;

    setBio(partner.bio ?? "");
    setExperience(String(partner.experience_years ?? 0));
    setLanguages(partner.languages ?? "");
    setServiceArea(partner.service_area ?? "");

    // NULL means the partner has not requested a custom rate.
    setHourlyRate(
      partner.hourly_rate !== null && partner.hourly_rate !== undefined
        ? String(partner.hourly_rate)
        : "",
    );
  }, [partner]);

  async function submitApplication() {
    if (!partner || !user) return;

    if (bio.trim().length < 10) {
      toast.error("Please add a little more information about yourself.");
      return;
    }

    if (!serviceArea.trim()) {
      toast.error("Please enter your service area.");
      return;
    }

    const experienceYears = Number(experience);

    if (
      !Number.isFinite(experienceYears) ||
      experienceYears < 0 ||
      experienceYears > 50
    ) {
      toast.error("Please enter a valid experience value.");
      return;
    }

    /*
     * Hourly rate is OPTIONAL.
     *
     * Empty field => NULL in database.
     * Filled field => requested custom hourly rate.
     */
    let requestedHourlyRate: number | null = null;

    if (hourlyRate.trim() !== "") {
      const parsedRate = Number(hourlyRate);

      if (
        !Number.isFinite(parsedRate) ||
        parsedRate <= 0 ||
        parsedRate > 10000
      ) {
        toast.error(
          "Please enter a valid hourly rate, or leave it blank to use the default rate.",
        );
        return;
      }

      requestedHourlyRate = parsedRate;
    }

    setSaving(true);

    const { error } = await supabase
      .from("care_partners")
      .update({
        bio: bio.trim(),
        experience_years: experienceYears,
        languages: languages.trim() || "Hindi, English",
        service_area: serviceArea.trim(),

        // IMPORTANT:
        // NULL when partner does not request a custom rate.
        hourly_rate: requestedHourlyRate,

        approval_status: "pending",
      })
      .eq("id", partner.id)
      .eq("profile_id", user.id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["partner", "application", user.id],
    });

    toast.success("Application submitted for review.");
  }

  if (isLoading) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Application"
        description="Your onboarding application status."
      >
        <p className="text-sm text-muted-foreground">
          Loading your application...
        </p>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Application"
        description="Your onboarding application status."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load your application
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading your application."}
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (!partner) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Application"
        description="Your onboarding application status."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Application not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your Care Partner profile has not been created yet.
          </p>
        </div>
      </DashboardShell>
    );
  }

  const effectiveRate =
    partner.hourly_rate !== null && partner.hourly_rate !== undefined
      ? Number(partner.hourly_rate)
      : defaultRate;

  return (
    <DashboardShell
      nav={partnerNav}
      eyebrow="Care Partner"
      title="Your Application"
      description="Complete your profile and track your onboarding status."
      actions={<StatusBadge status={partner.approval_status} />}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        {/* APPLICATION STATUS */}
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Application status
          </h2>

          <div className="mt-5 space-y-4">
            <StatusRow
              label="Application"
              status={partner.approval_status}
            />

            <StatusRow
              label="Identity verification"
              status={partner.verification_status}
            />

            <StatusRow
              label="Training"
              status={partner.training_status}
            />
          </div>

          {partner.admin_notes ? (
            <div className="mt-6 rounded-xl bg-sand p-4">
              <p className="text-sm font-medium">
                Message from Sakhi Admin
              </p>

              <p className="mt-2 text-sm text-muted-foreground">
                {partner.admin_notes}
              </p>
            </div>
          ) : null}
        </div>

        {/* APPLICATION FORM */}
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Your application
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Keep your information accurate. An admin will review your
            application before you can receive bookings.
          </p>

          <div className="mt-6 space-y-5">
            {/* BIO */}
            <div className="space-y-2">
              <Label htmlFor="bio">
                About you
              </Label>

              <Textarea
                id="bio"
                rows={5}
                maxLength={1000}
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                placeholder="Tell customers and Sakhi a little about yourself."
              />
            </div>

            {/* EXPERIENCE */}
            <div className="space-y-2">
              <Label htmlFor="experience">
                Experience (years)
              </Label>

              <input
                id="experience"
                type="number"
                min={0}
                max={50}
                step={1}
                value={experience}
                onChange={(event) =>
                  setExperience(event.target.value)
                }
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>

            {/* LANGUAGES */}
            <div className="space-y-2">
              <Label htmlFor="languages">
                Languages
              </Label>

              <input
                id="languages"
                value={languages}
                onChange={(event) =>
                  setLanguages(event.target.value)
                }
                placeholder="Hindi, English"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>

            {/* SERVICE AREA */}
            <div className="space-y-2">
              <Label htmlFor="service-area">
                Service area
              </Label>

              <input
                id="service-area"
                value={serviceArea}
                onChange={(event) =>
                  setServiceArea(event.target.value)
                }
                placeholder="Area / locality / city"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />
            </div>

            {/* OPTIONAL HOURLY RATE */}
            <div className="space-y-2">
              <Label htmlFor="hourly-rate">
                Your hourly rate
                <span className="ml-2 text-xs font-normal text-muted-foreground">
                  Optional
                </span>
              </Label>

              <input
                id="hourly-rate"
                type="number"
                min={1}
                max={10000}
                step={1}
                value={hourlyRate}
                onChange={(event) =>
                  setHourlyRate(event.target.value)
                }
                placeholder={`Leave blank to use ${formatCurrency(defaultRate)}/hour`}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              />

              <p className="text-xs text-muted-foreground">
                Sakhi's default rate is{" "}
                <strong>{formatCurrency(defaultRate)}/hour</strong>.
                You may leave this blank and use the default rate, or
                enter the hourly rate you would like to request.
              </p>
            </div>

            {/* CURRENT RATE */}
            <div className="rounded-lg bg-sand p-4 text-sm">
              <p className="text-muted-foreground">
                Current effective hourly rate
              </p>

              <p className="mt-1 font-medium">
                {formatCurrency(effectiveRate)}/hour
              </p>

              {partner.hourly_rate === null ||
              partner.hourly_rate === undefined ? (
                <p className="mt-1 text-xs text-muted-foreground">
                  You are currently using Sakhi's default rate.
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  This is your requested custom rate and may be reviewed
                  by Sakhi Admin.
                </p>
              )}
            </div>

            {/* SUBMIT */}
            <Button
              type="button"
              className="w-full"
              onClick={submitApplication}
              disabled={saving}
            >
              {saving
                ? "Submitting..."
                : partner.approval_status === "approved"
                  ? "Update application"
                  : "Submit application"}
            </Button>
          </div>
        </div>
      </div>
    </DashboardShell>
  );
}

function StatusRow({
  label,
  status,
}: {
  label: string;
  status: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-muted-foreground">
        {label}
      </span>

      <StatusBadge status={status} />
    </div>
  );
}