import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  DashboardShell,
  partnerNav,
} from "@/components/site/DashboardShell";

import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";
import { formatDate, formatTime } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/partner/availability")({
  head: () => ({
    meta: [
      { title: "Availability — Sakhi" },
      {
        name: "description",
        content: "Publish the hours you can work.",
      },
      {
        property: "og:title",
        content: "Availability — Sakhi",
      },
      {
        property: "og:description",
        content: "Publish the hours you can work.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["care_partner"]}>
      <PageAuthenticatedPartnerAvailability />
    </RoleGate>
  ),
});

function PageAuthenticatedPartnerAvailability() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("10:00");
  const [endTime, setEndTime] = useState("18:00");
  const [saving, setSaving] = useState(false);

  /*
   * Find the Care Partner record belonging to the logged-in user.
   */
  const { data: partner, isLoading: partnerLoading } = useQuery({
    queryKey: ["my-care-partner", user?.id],

    enabled: Boolean(user?.id),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("care_partners")
        .select("id, approval_status")
        .eq("profile_id", user!.id)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  /*
   * Get this Care Partner's published availability.
   */
  const { data: availability, isLoading } = useQuery({
    queryKey: ["my-availability", partner?.id],

    enabled: Boolean(partner?.id),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .eq("care_partner_id", partner!.id)
        .order("date", { ascending: true })
        .order("start_time", { ascending: true });

      if (error) throw error;

      return data ?? [];
    },
  });

  async function addAvailability(event: React.FormEvent) {
    event.preventDefault();

    if (!partner) {
      toast.error("Care Partner profile not found.");
      return;
    }

    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    if (date < new Date().toISOString().slice(0, 10)) {
      toast.error("Please choose today or a future date.");
      return;
    }

    if (endTime <= startTime) {
      toast.error("End time must be later than start time.");
      return;
    }

    setSaving(true);

    const { error } = await supabase.from("availability").insert({
      care_partner_id: partner.id,
      date,
      start_time: startTime,
      end_time: endTime,
      is_available: true,
    });

    setSaving(false);

    if (error) {
      if (error.code === "23505") {
        toast.error("This availability slot already exists.");
      } else {
        toast.error(error.message);
      }

      return;
    }

    toast.success("Availability published.");

    setDate("");
    setStartTime("10:00");
    setEndTime("18:00");

    await queryClient.invalidateQueries({
      queryKey: ["my-availability", partner.id],
    });
  }

  async function removeAvailability(id: string) {
    const { error } = await supabase
      .from("availability")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Availability removed.");

    await queryClient.invalidateQueries({
      queryKey: ["my-availability", partner?.id],
    });
  }

  if (partnerLoading) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Availability"
        description="Publish the hours you can work."
      >
        <p className="text-sm text-muted-foreground">
          Loading your Care Partner profile...
        </p>
      </DashboardShell>
    );
  }

  if (!partner) {
    return (
      <DashboardShell
        nav={partnerNav}
        title="Availability"
        description="Publish the hours you can work."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Care Partner profile not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Your Care Partner profile has not been created yet. Please complete
            your application first.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      nav={partnerNav}
      eyebrow="Care Partner"
      title="Availability"
      description="Publish the hours you can work."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.5fr]">

        {/* ADD AVAILABILITY */}
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Add availability
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Customers will be able to see these hours when requesting a
            booking.
          </p>

          <form
            onSubmit={addAvailability}
            className="mt-6 space-y-5"
          >
            <div className="space-y-2">
              <Label htmlFor="date">
                Date
              </Label>

              <Input
                id="date"
                type="date"
                min={new Date().toISOString().slice(0, 10)}
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="start-time">
                  Start time
                </Label>

                <Input
                  id="start-time"
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="end-time">
                  End time
                </Label>

                <Input
                  id="end-time"
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={saving}
            >
              {saving
                ? "Publishing..."
                : "Publish availability"}
            </Button>
          </form>
        </div>

        {/* EXISTING AVAILABILITY */}
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            My availability
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Your currently published working hours.
          </p>

          {isLoading ? (
            <p className="mt-6 text-sm text-muted-foreground">
              Loading availability...
            </p>
          ) : (availability ?? []).length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-border p-8 text-center">
              <p className="font-medium">
                No availability added yet
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                Add your first available date and time using the form.
              </p>
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {(availability ?? []).map((slot) => (
                <div
                  key={slot.id}
                  className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border p-4"
                >
                  <div>
                    <p className="font-medium">
                      {formatDate(slot.date)}
                    </p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatTime(slot.start_time)} –{" "}
                      {formatTime(slot.end_time)}
                    </p>
                  </div>

                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      removeAvailability(slot.id)
                    }
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}