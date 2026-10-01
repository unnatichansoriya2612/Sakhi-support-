import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, i as customerNav, n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BqfEdwT8.js
var import_jsx_runtime = require_jsx_runtime();
function NotificationsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
			allow: ["customer"],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsContent, {
				nav: customerNav,
				eyebrow: "Customer"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
			allow: ["care_partner"],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsContent, {
				nav: partnerNav,
				eyebrow: "Care Partner"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
			allow: ["admin"],
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationsContent, {
				nav: adminNav,
				eyebrow: "Admin"
			})
		})
	] });
}
function NotificationsContent({ nav, eyebrow }) {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: notifications, isLoading, error } = useQuery({
		queryKey: ["notifications", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("notifications").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function markAsRead(id) {
		const { error } = await supabase.from("notifications").update({ is_read: true }).eq("id", id).eq("user_id", user.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
	}
	async function markAllAsRead() {
		const { error } = await supabase.from("notifications").update({ is_read: true }).eq("user_id", user.id).eq("is_read", false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
		toast.success("All notifications marked as read.");
	}
	async function deleteNotification(id) {
		const { error } = await supabase.from("notifications").delete().eq("id", id).eq("user_id", user.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["notifications", user?.id] });
	}
	const unreadCount = notifications?.filter((notification) => !notification.is_read).length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav,
		eyebrow,
		title: "Notifications",
		description: "Updates about your Sakhi bookings and account.",
		actions: unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			variant: "outline",
			size: "sm",
			onClick: markAllAsRead,
			children: "Mark all as read"
		}) : null,
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading notifications..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load notifications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading notifications."
			})]
		}) : (notifications ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "No notifications yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Booking updates and other important Sakhi updates will appear here."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: (notifications ?? []).map((notification) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `surface-card p-5 ${!notification.is_read ? "border-primary/40 bg-primary/5" : ""}`,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [!notification.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "h-2.5 w-2.5 shrink-0 rounded-full bg-primary",
									"aria-label": "Unread"
								}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-medium",
									children: notification.title
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: notification.message
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-muted-foreground",
								children: formatNotificationDate(notification.created_at)
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 flex-wrap gap-2",
						children: [
							!notification.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => markAsRead(notification.id),
								children: "Mark as read"
							}) : null,
							notification.link ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								size: "sm",
								onClick: () => {
									window.location.href = notification.link;
								},
								children: "View"
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "ghost",
								size: "sm",
								onClick: () => deleteNotification(notification.id),
								children: "Delete"
							})
						]
					})]
				})
			}, notification.id))
		})
	});
}
function formatNotificationDate(value) {
	const date = new Date(value);
	if (Number.isNaN(date.getTime())) return "";
	return date.toLocaleString("en-IN", {
		dateStyle: "medium",
		timeStyle: "short"
	});
}
//#endregion
export { NotificationsPage as component };
