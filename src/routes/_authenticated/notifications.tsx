import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DashboardShell,
  customerNav,
  partnerNav,
  adminNav,
} from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/_authenticated/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications — Sakhi" },
      {
        name: "description",
        content: "Updates about your Sakhi bookings and account.",
      },
      { property: "og:title", content: "Notifications — Sakhi" },
      {
        property: "og:description",
        content: "Updates about your Sakhi bookings and account.",
      },
    ],
  }),
  component: NotificationsPage,
});

function NotificationsPage() {
  return (
    <>
      <RoleGate allow={["customer"]}>
        <NotificationsContent
          nav={customerNav}
          eyebrow="Customer"
        />
      </RoleGate>

      <RoleGate allow={["care_partner"]}>
        <NotificationsContent
          nav={partnerNav}
          eyebrow="Care Partner"
        />
      </RoleGate>

      <RoleGate allow={["admin"]}>
        <NotificationsContent
          nav={adminNav}
          eyebrow="Admin"
        />
      </RoleGate>
    </>
  );
}

function NotificationsContent({
  nav,
  eyebrow,
}: {
  nav: typeof customerNav;
  eyebrow: string;
}) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["notifications", user?.id],
    enabled: Boolean(user?.id),
    queryFn: async () => {
      const { data, error } = await supabase
        .from("notifications")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  async function markAsRead(id: string) {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .eq("user_id", user!.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["notifications", user?.id],
    });
  }

  async function markAllAsRead() {
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("user_id", user!.id)
      .eq("is_read", false);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["notifications", user?.id],
    });

    toast.success("All notifications marked as read.");
  }

  async function deleteNotification(id: string) {
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id)
      .eq("user_id", user!.id);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["notifications", user?.id],
    });
  }

  const unreadCount =
    notifications?.filter((notification) => !notification.is_read)
      .length ?? 0;

  return (
    <DashboardShell
      nav={nav}
      eyebrow={eyebrow}
      title="Notifications"
      description="Updates about your Sakhi bookings and account."
      actions={
        unreadCount > 0 ? (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
          >
            Mark all as read
          </Button>
        ) : null
      }
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading notifications...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load notifications
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading notifications."}
          </p>
        </div>
      ) : (notifications ?? []).length === 0 ? (
        <div className="surface-card p-8 text-center">
          <h2 className="text-lg font-medium">
            No notifications yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Booking updates and other important Sakhi updates
            will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(notifications ?? []).map((notification) => (
            <div
              key={notification.id}
              className={`surface-card p-5 ${
                !notification.is_read
                  ? "border-primary/40 bg-primary/5"
                  : ""
              }`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!notification.is_read ? (
                      <span
                        className="h-2.5 w-2.5 shrink-0 rounded-full bg-primary"
                        aria-label="Unread"
                      />
                    ) : null}

                    <h2 className="font-medium">
                      {notification.title}
                    </h2>
                  </div>

                  <p className="mt-2 text-sm text-muted-foreground">
                    {notification.message}
                  </p>

                  <p className="mt-3 text-xs text-muted-foreground">
                    {formatNotificationDate(
                      notification.created_at,
                    )}
                  </p>
                </div>

                <div className="flex shrink-0 flex-wrap gap-2">
                  {!notification.is_read ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        markAsRead(notification.id)
                      }
                    >
                      Mark as read
                    </Button>
                  ) : null}

                  {notification.link ? (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        window.location.href =
                          notification.link!;
                      }}
                    >
                      View
                    </Button>
                  ) : null}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      deleteNotification(notification.id)
                    }
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardShell>
  );
}

function formatNotificationDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}