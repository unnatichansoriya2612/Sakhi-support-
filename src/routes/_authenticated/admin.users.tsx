import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import { formatDate } from "@/lib/format";

export const Route = createFileRoute("/_authenticated/admin/users")({
  head: () => ({
    meta: [
      { title: "Users — Sakhi" },
      { name: "description", content: "All Sakhi accounts." },
      { property: "og:title", content: "Users — Sakhi" },
      { property: "og:description", content: "All Sakhi accounts." },
    ],
  }),
  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminUsers />
    </RoleGate>
  ),
});

type UserProfile = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  role: "customer" | "care_partner" | "admin";
  city: string | null;
  created_at: string;
};

function PageAuthenticatedAdminUsers() {
  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, full_name, email, phone, role, city, created_at"
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data ?? []) as UserProfile[];
    },
  });

  const totalUsers = users?.length ?? 0;
  const customers =
    users?.filter((user) => user.role === "customer").length ?? 0;
  const carePartners =
    users?.filter((user) => user.role === "care_partner").length ?? 0;
  const admins =
    users?.filter((user) => user.role === "admin").length ?? 0;

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Users"
      description="All Sakhi accounts."
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading users...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load users
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading users."}
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Summary */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              label="Total users"
              value={totalUsers}
            />

            <SummaryCard
              label="Customers"
              value={customers}
            />

            <SummaryCard
              label="Care Partners"
              value={carePartners}
            />

            <SummaryCard
              label="Admins"
              value={admins}
            />
          </div>

          {/* Users */}
          {totalUsers === 0 ? (
            <div className="surface-card p-8 text-center">
              <h2 className="text-lg font-medium">
                No users yet
              </h2>

              <p className="mt-2 text-sm text-muted-foreground">
                Registered Sakhi accounts will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="surface-card p-5"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-medium">
                          {user.full_name || "Unnamed user"}
                        </h2>

                        <StatusBadge status={user.role} />
                      </div>

                      <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                        <p>{user.email || "No email"}</p>

                        {user.phone ? (
                          <p>{user.phone}</p>
                        ) : null}

                        {user.city ? (
                          <p>{user.city}</p>
                        ) : null}

                        <p>
                          Joined {formatDate(user.created_at)}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground lg:text-right">
                      <p>User ID</p>
                      <p className="mt-1 break-all font-mono">
                        {user.id}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
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