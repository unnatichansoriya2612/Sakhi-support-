import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell, customerNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/profile")({
  head: () => ({
    meta: [
      { title: "Profile — Sakhi" },
      { name: "description", content: "Your Sakhi account details." },
      { property: "og:title", content: "Profile — Sakhi" },
      { property: "og:description", content: "Your Sakhi account details." },
    ],
  }),

  component: () => (
    <RoleGate allow={["customer", "care_partner", "admin"]}>
      <PageAuthenticatedProfile />
    </RoleGate>
  ),
});

function PageAuthenticatedProfile() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [saving, setSaving] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email, phone, city, role")
        .eq("id", user!.id)
        .maybeSingle();

      if (error) throw error;

      return data;
    },
  });

  useEffect(() => {
    if (!profile) return;

    setFullName(profile.full_name ?? "");
    setPhone(profile.phone ?? "");
    setCity(profile.city ?? "");
  }, [profile]);

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();

    if (!user?.id) {
      toast.error("You must be logged in.");
      return;
    }

    if (!fullName.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    setSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName.trim(),
        phone: phone.trim() || null,
        city: city.trim() || null,
      })
      .eq("id", user.id);

    setSaving(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["profile", user.id],
    });

    toast.success("Profile updated successfully.");
  }

  if (isLoading) {
    return (
      <DashboardShell
        nav={customerNav}
        title="Profile"
        description="Your Sakhi account details."
      >
        <div className="surface-card p-6">
          <p className="text-sm text-muted-foreground">
            Loading your profile...
          </p>
        </div>
      </DashboardShell>
    );
  }

  if (!profile) {
    return (
      <DashboardShell
        nav={customerNav}
        title="Profile"
        description="Your Sakhi account details."
      >
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Profile not found
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            We couldn't find your Sakhi profile. Please sign out and sign in
            again, or contact support.
          </p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      nav={customerNav}
      eyebrow="Account"
      title="Profile"
      description="Manage your Sakhi account details."
    >
      <div className="max-w-2xl">
        <form onSubmit={handleSave} className="surface-card space-y-6 p-6">
          <div>
            <h2 className="text-lg font-medium">
              Personal information
            </h2>

            <p className="mt-1 text-sm text-muted-foreground">
              Keep your contact information up to date.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full-name">
              Full name
            </Label>

            <Input
              id="full-name"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              placeholder="Enter your full name"
              maxLength={100}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              Email
            </Label>

            <Input
              id="email"
              value={profile.email ?? user?.email ?? ""}
              disabled
              className="bg-muted"
            />

            <p className="text-xs text-muted-foreground">
              Your login email cannot be changed from this page.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone number
            </Label>

            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="Enter your phone number"
              maxLength={20}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              City
            </Label>

            <Input
              id="city"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Enter your city"
              maxLength={100}
            />
          </div>

          <div className="rounded-lg bg-sand p-4">
            <p className="text-sm">
              <span className="text-muted-foreground">
                Account type:{" "}
              </span>

              <span className="font-medium capitalize">
                {profile.role.replace("_", " ")}
              </span>
            </p>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </form>
      </div>
    </DashboardShell>
  );
}