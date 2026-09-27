import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";
import { formatCurrency } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Sakhi" },
      { name: "description", content: "Platform default hourly rate." },
      { property: "og:title", content: "Pricing — Sakhi" },
      { property: "og:description", content: "Platform default hourly rate." },
    ],
  }),
  component: () => (
    <RoleGate allow={["admin"]}>
      <AdminPricingPage />
    </RoleGate>
  ),
});

type PlatformSettings = {
  id: number;
  default_hourly_rate: number | string;
  currency: string;
  min_duration_hours: number;
  max_duration_hours: number;
};

function AdminPricingPage() {
  const queryClient = useQueryClient();

  const [rate, setRate] = useState("");
  const [minHours, setMinHours] = useState("");
  const [maxHours, setMaxHours] = useState("");
  const [saving, setSaving] = useState(false);

  const {
    data: settings,
    isLoading,
    error,
  } = useQuery<PlatformSettings | null>({
    queryKey: ["platform-settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_settings")
        .select(
          "id, default_hourly_rate, currency, min_duration_hours, max_duration_hours",
        )
        .eq("id", 1)
        .maybeSingle();

      if (error) throw error;

      return data as PlatformSettings | null;
    },
  });

  useEffect(() => {
    if (!settings) return;

    setRate(String(settings.default_hourly_rate));
    setMinHours(String(settings.min_duration_hours));
    setMaxHours(String(settings.max_duration_hours));
  }, [settings]);

  async function saveSettings(event: React.FormEvent) {
    event.preventDefault();

    const hourlyRate = Number(rate);
    const minimum = Number(minHours);
    const maximum = Number(maxHours);

    if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
      toast.error("Hourly rate must be greater than 0.");
      return;
    }

    if (!Number.isInteger(minimum) || minimum <= 0) {
      toast.error("Minimum duration must be a positive whole number.");
      return;
    }

    if (!Number.isInteger(maximum) || maximum <= 0) {
      toast.error("Maximum duration must be a positive whole number.");
      return;
    }

    if (maximum < minimum) {
      toast.error("Maximum duration cannot be smaller than minimum duration.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("platform_settings")
      .upsert(
        {
          id: 1,
          default_hourly_rate: hourlyRate,
          min_duration_hours: minimum,
          max_duration_hours: maximum,
        },
        { onConflict: "id" },
      );

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["platform-settings"],
    });

    toast.success("Pricing settings saved.");
  }

  if (isLoading) {
    return (
      <DashboardShell
        nav={adminNav}
        eyebrow="Admin"
        title="Pricing"
        description="Manage Sakhi's default booking pricing."
      >
        <p className="text-sm text-muted-foreground">
          Loading pricing settings...
        </p>
      </DashboardShell>
    );
  }

  if (error) {
    return (
      <DashboardShell
        nav={adminNav}
        eyebrow="Admin"
        title="Pricing"
        description="Manage Sakhi's default booking pricing."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load pricing settings
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong."}
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Pricing"
      description="Manage Sakhi's default booking pricing."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <form
          onSubmit={saveSettings}
          className="surface-card p-6"
        >
          <h2 className="text-xl font-medium">
            Booking pricing
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            These settings control the platform defaults used for
            new Care Partners and booking duration limits.
          </p>

          <div className="mt-6 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="hourly-rate">
                Default hourly rate
              </Label>

              <div className="flex">
                <div className="flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm">
                  ₹
                </div>

                <Input
                  id="hourly-rate"
                  type="number"
                  min="1"
                  step="0.01"
                  value={rate}
                  onChange={(event) =>
                    setRate(event.target.value)
                  }
                  className="rounded-l-none"
                  required
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Current default:{" "}
                {settings
                  ? formatCurrency(
                      Number(settings.default_hourly_rate),
                    )
                  : "—"}
                  /hour
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="min-hours">
                  Minimum booking hours
                </Label>

                <Input
                  id="min-hours"
                  type="number"
                  min="1"
                  step="1"
                  value={minHours}
                  onChange={(event) =>
                    setMinHours(event.target.value)
                  }
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="max-hours">
                  Maximum booking hours
                </Label>

                <Input
                  id="max-hours"
                  type="number"
                  min="1"
                  step="1"
                  value={maxHours}
                  onChange={(event) =>
                    setMaxHours(event.target.value)
                  }
                  required
                />
              </div>
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save pricing settings"}
            </Button>
          </div>
        </form>

        <aside className="surface-card h-fit p-6">
          <h2 className="text-lg font-medium">
            Current settings
          </h2>

          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">
                Default rate
              </dt>
              <dd className="font-medium">
                {settings
                  ? formatCurrency(
                      Number(settings.default_hourly_rate),
                    )
                  : "—"}
                  /hr
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">
                Currency
              </dt>
              <dd className="font-medium">
                {settings?.currency ?? "INR"}
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">
                Minimum duration
              </dt>
              <dd className="font-medium">
                {settings?.min_duration_hours ?? "—"} hr
              </dd>
            </div>

            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">
                Maximum duration
              </dt>
              <dd className="font-medium">
                {settings?.max_duration_hours ?? "—"} hr
              </dd>
            </div>
          </dl>

          <p className="mt-6 rounded-lg bg-sand p-4 text-xs text-muted-foreground">
            Individual Care Partner hourly rates can still be
            stored separately in the Care Partner profile.
          </p>
        </aside>
      </div>
    </DashboardShell>
  );
}