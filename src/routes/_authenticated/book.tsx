import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

import {
  DashboardShell,
  customerNav,
} from "@/components/site/DashboardShell";

import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

import {
  addHoursToTime,
  formatCurrency,
  formatDate,
  formatTime,
  todayISO,
} from "@/lib/format";

const searchSchema = z.object({
  partner: z.string().optional(),
});

export const Route = createFileRoute("/_authenticated/book")({
  validateSearch: searchSchema,

  head: () => ({
    meta: [
      { title: "Book a Care Partner — Sakhi" },
      {
        name: "description",
        content:
          "Book a trained Sakhi Care Partner by the hour for non-medical support at home.",
      },
      {
        property: "og:title",
        content: "Book a Care Partner — Sakhi",
      },
      {
        property: "og:description",
        content: "Pick a date, a start time and how many hours you need.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["customer"]}>
      <BookPage />
    </RoleGate>
  ),
});

const bookingSchema = z.object({
  partnerId: z.string().uuid({
    message: "Please choose a Care Partner.",
  }),

  date: z.string().min(1, "Please choose a date."),

  startTime: z.string().min(1, "Please choose a start time."),

  duration: z
    .number()
    .min(1, "Minimum booking is 1 hour.")
    .max(12, "Maximum booking is 12 hours."),

  address: z
    .string()
    .trim()
    .min(10, "Please enter a full address.")
    .max(500),

  instructions: z
    .string()
    .trim()
    .max(1000)
    .optional(),

  terms: z.literal(true, {
    message:
      "Please accept the terms and the non-medical policy.",
  }),
});

function BookPage() {
  const { partner: partnerParam } = Route.useSearch();

  const { user } = useAuth();

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const [partnerId, setPartnerId] = useState(
    partnerParam ?? "",
  );

  const [date, setDate] = useState(todayISO());

  const [startTime, setStartTime] = useState("10:00");

  const [duration, setDuration] = useState(2);

  const [address, setAddress] = useState("");

  const [instructions, setInstructions] = useState("");

  const [terms, setTerms] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  /*
   * ---------------------------------------------------------
   * LOAD APPROVED CARE PARTNERS
   * ---------------------------------------------------------
   */

  const { data: partners, isLoading: partnersLoading } =
    useQuery({
      queryKey: ["care-partners", "approved"],

      queryFn: async () => {
        const { data, error } = await supabase
          .from("care_partners")
          .select(
            "id, hourly_rate, service_area, profiles!care_partners_profile_id_fkey(full_name)",
          )
          .eq("approval_status", "approved");

        if (error) throw error;

        return data ?? [];
      },
    });

  /*
   * ---------------------------------------------------------
   * LOAD SAKHI DEFAULT HOURLY RATE
   * ---------------------------------------------------------
   */

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

  /*
   * If the platform setting doesn't load,
   * use ₹250 as the fallback.
   */

  const defaultRate = Number(
    settings?.default_hourly_rate ?? 250,
  );

  /*
   * ---------------------------------------------------------
   * SELECTED PARTNER
   * ---------------------------------------------------------
   */

  const selected = (partners ?? []).find(
    (p) => p.id === partnerId,
  );

  /*
   * IMPORTANT:
   *
   * If Care Partner has a custom hourly_rate:
   *     use that rate.
   *
   * If hourly_rate is NULL:
   *     use Sakhi's default rate.
   *
   * Therefore:
   *
   * NULL → ₹250
   * ₹300 → ₹300
   * ₹500 → ₹500
   */

  const rate =
    selected?.hourly_rate !== null &&
    selected?.hourly_rate !== undefined
      ? Number(selected.hourly_rate)
      : defaultRate;

  const endTime = addHoursToTime(
    startTime,
    duration,
  );

  const total = rate * duration;

  /*
   * ---------------------------------------------------------
   * LOAD AVAILABILITY
   * ---------------------------------------------------------
   */

  const { data: slots } = useQuery({
    queryKey: [
      "availability",
      partnerId,
      date,
    ],

    enabled: Boolean(partnerId && date),

    queryFn: async () => {
      const { data, error } = await supabase
        .from("availability")
        .select("*")
        .eq("care_partner_id", partnerId)
        .eq("date", date)
        .eq("is_available", true)
        .order("start_time");

      if (error) throw error;

      return data ?? [];
    },
  });

  /*
   * ---------------------------------------------------------
   * SUBMIT BOOKING
   * ---------------------------------------------------------
   */

  async function handleSubmit(
    event: React.FormEvent,
  ) {
    event.preventDefault();

    const parsed =
      bookingSchema.safeParse({
        partnerId,
        date,
        startTime,
        duration: Number(duration),
        address,
        instructions,
        terms,
      });

    if (!parsed.success) {
      toast.error(
        parsed.error.issues[0]?.message ??
          "Please check the form.",
      );

      return;
    }

    if (date < todayISO()) {
      toast.error(
        "Please pick today or a future date.",
      );

      return;
    }

    if (!selected) {
      toast.error(
        "Please choose a Care Partner.",
      );

      return;
    }

    /*
     * Make sure the rate is valid before
     * creating the booking.
     */

    if (!Number.isFinite(rate) || rate <= 0) {
      toast.error(
        "The Care Partner's hourly rate is not available. Please try again later.",
      );

      return;
    }

    if (!user) {
      toast.error(
        "Please sign in before booking.",
      );

      return;
    }

    setSubmitting(true);

    /*
     * Store the EFFECTIVE rate in the booking.
     *
     * This is important because the booking should
     * remember the rate that was agreed at the time
     * of booking.
     */

    const { data, error } = await supabase
      .from("bookings")
      .insert({
        customer_id: user.id,

        care_partner_id: partnerId,

        date,

        start_time: startTime,

        end_time: endTime,

        duration_hours: duration,

        hourly_rate: rate,

        total_amount: total,

        address: address.trim(),

        instructions:
          instructions.trim() || null,

        terms_accepted: true,
      })
      .select("id")
      .single();

    setSubmitting(false);

    if (error) {
      if (
        error.message.includes(
          "bookings_no_double_booking",
        ) ||
        error.code === "23P01"
      ) {
        toast.error(
          "This Care Partner is already booked for that time. Please choose another slot.",
        );

        return;
      }

      toast.error(error.message);

      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["bookings"],
    });

    toast.success(
      "Booking request sent. Your Care Partner will confirm shortly.",
    );

    void navigate({
      to: "/bookings/$id",
      params: {
        id: data.id,
      },
    });
  }

  /*
   * ---------------------------------------------------------
   * UI
   * ---------------------------------------------------------
   */

  return (
    <DashboardShell
      nav={customerNav}
      eyebrow="Customer"
      title="Book a Care Partner"
      description="You are booking her time, not a list of chores. Anything reasonable and non-medical during those hours is included."
    >
      <form
        onSubmit={handleSubmit}
        className="grid gap-8 lg:grid-cols-[2fr_1fr]"
      >
        <div className="space-y-6">

          {/* CARE PARTNER */}

          <div className="space-y-2">
            <Label htmlFor="partner">
              Care Partner
            </Label>

            <select
              id="partner"
              value={partnerId}
              onChange={(e) =>
                setPartnerId(e.target.value)
              }
              disabled={partnersLoading}
              className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">
                {partnersLoading
                  ? "Loading Care Partners..."
                  : "Select a Care Partner"}
              </option>

              {(partners ?? []).map((p) => {
                const partnerRate =
                  p.hourly_rate !== null &&
                  p.hourly_rate !== undefined
                    ? Number(p.hourly_rate)
                    : defaultRate;

                return (
                  <option
                    key={p.id}
                    value={p.id}
                  >
                    {(p as {
                      profiles?: {
                        full_name?: string;
                      };
                    }).profiles?.full_name ??
                      "Care Partner"}{" "}
                    —{" "}
                    {formatCurrency(
                      partnerRate,
                    )}
                    /hr
                    {p.service_area
                      ? ` · ${p.service_area}`
                      : ""}
                  </option>
                );
              })}
            </select>

            {selected?.hourly_rate === null ||
            selected?.hourly_rate ===
              undefined ? (
              <p className="text-xs text-muted-foreground">
                This Care Partner is using
                Sakhi's default rate of{" "}
                {formatCurrency(defaultRate)}
                /hour.
              </p>
            ) : null}
          </div>

          {/* DATE / TIME / DURATION */}

          <div className="grid gap-4 sm:grid-cols-3">

            <div className="space-y-2">
              <Label htmlFor="date">
                Date
              </Label>

              <Input
                id="date"
                type="date"
                min={todayISO()}
                value={date}
                onChange={(e) =>
                  setDate(e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start">
                Start time
              </Label>

              <Input
                id="start"
                type="time"
                value={startTime}
                onChange={(e) =>
                  setStartTime(
                    e.target.value,
                  )
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">
                Hours
              </Label>

              <Input
                id="duration"
                type="number"
                min={1}
                max={12}
                step={0.5}
                value={duration}
                onChange={(e) =>
                  setDuration(
                    Number(e.target.value),
                  )
                }
              />
            </div>

          </div>

          {/* AVAILABILITY */}

          {partnerId ? (
            <div className="rounded-xl border border-border bg-sand p-4 text-sm">

              <p className="font-medium">
                Her published availability on{" "}
                {formatDate(date)}
              </p>

              {(slots ?? []).length ===
              0 ? (
                <p className="mt-1 text-muted-foreground">
                  Nothing published for this
                  date. You can still request
                  this time — she'll accept or
                  decline.
                </p>
              ) : (
                <ul className="mt-2 flex flex-wrap gap-2">
                  {(slots ?? []).map(
                    (slot) => (
                      <li key={slot.id}>
                        <button
                          type="button"
                          onClick={() =>
                            setStartTime(
                              slot.start_time.slice(
                                0,
                                5,
                              ),
                            )
                          }
                          className="rounded-full border border-border bg-card px-3 py-1 text-xs hover:bg-muted"
                        >
                          {formatTime(
                            slot.start_time,
                          )}{" "}
                          –{" "}
                          {formatTime(
                            slot.end_time,
                          )}
                        </button>
                      </li>
                    ),
                  )}
                </ul>
              )}

            </div>
          ) : null}

          {/* ADDRESS */}

          <div className="space-y-2">
            <Label htmlFor="address">
              Address for the visit
            </Label>

            <Textarea
              id="address"
              rows={3}
              maxLength={500}
              value={address}
              onChange={(e) =>
                setAddress(e.target.value)
              }
              placeholder="Flat / house number, street, landmark, city, pincode"
            />
          </div>

          {/* INSTRUCTIONS */}

          <div className="space-y-2">
            <Label htmlFor="instructions">
              What would help most?{" "}
              <span className="text-xs text-muted-foreground">
                (optional)
              </span>
            </Label>

            <Textarea
              id="instructions"
              rows={4}
              maxLength={1000}
              value={instructions}
              onChange={(e) =>
                setInstructions(
                  e.target.value,
                )
              }
              placeholder="E.g. cook dinner for two, sit with my mother, help sort the kitchen."
            />
          </div>

          {/* TERMS */}

          <label className="flex items-start gap-3 text-sm">
            <Checkbox
              checked={terms}
              onCheckedChange={(v) =>
                setTerms(v === true)
              }
              className="mt-0.5"
            />

            <span className="text-muted-foreground">
              I accept the Terms of Service
              and understand Sakhi Care
              Partners provide non-medical
              support only — no injections,
              medication decisions, wound care
              or clinical procedures.
            </span>
          </label>

        </div>

        {/* BOOKING SUMMARY */}

        <aside className="lg:sticky lg:top-24 lg:self-start">

          <div className="surface-card p-6">

            <h2 className="text-lg">
              Booking summary
            </h2>

            <dl className="mt-4 space-y-2 text-sm">

              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Date
                </dt>

                <dd>
                  {formatDate(date)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Time
                </dt>

                <dd>
                  {formatTime(startTime)} –{" "}
                  {formatTime(endTime)}
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Duration
                </dt>

                <dd>
                  {duration} hours
                </dd>
              </div>

              <div className="flex justify-between">
                <dt className="text-muted-foreground">
                  Hourly rate
                </dt>

                <dd>
                  {selected
                    ? formatCurrency(rate)
                    : "—"}
                </dd>
              </div>

            </dl>

            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4">

              <span className="text-sm text-muted-foreground">
                Total
              </span>

              <span className="font-display text-2xl">
                {selected
                  ? formatCurrency(total)
                  : "—"}
              </span>

            </div>

            <Button
              type="submit"
              className="mt-5 w-full"
              disabled={
                submitting ||
                !selected
              }
            >
              {submitting
                ? "Sending request..."
                : "Request booking"}
            </Button>

            <p className="mt-3 text-xs text-muted-foreground">
              Payment is settled directly
              with your Care Partner. Sakhi
              does not process payments in this
              MVP.
            </p>

          </div>

        </aside>

      </form>
    </DashboardShell>
  );
}