import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { i as customerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, o as todayISO, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-THimVx1-.js
var import_jsx_runtime = require_jsx_runtime();
function StatCard({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-3xl",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-xs text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
function CustomerDashboard() {
	const { user, profile } = useAuth();
	const { data: bookings } = useQuery({
		queryKey: [
			"bookings",
			"customer",
			user?.id
		],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("*, care_partners(id, profiles!care_partners_profile_id_fkey(full_name))").eq("customer_id", user.id).order("date", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const all = bookings ?? [];
	const today = todayISO();
	const upcoming = all.filter((b) => b.date >= today && ![
		"cancelled",
		"rejected",
		"completed"
	].includes(b.status)).sort((a, b) => a.date.localeCompare(b.date));
	const completed = all.filter((b) => b.status === "completed");
	const hours = completed.reduce((sum, b) => sum + Number(b.duration_hours), 0);
	const spend = completed.reduce((sum, b) => sum + Number(b.total_amount), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		nav: customerNav,
		eyebrow: "Customer",
		title: `Namaste, ${profile?.full_name?.split(" ")[0] ?? "there"}`,
		description: "Book a trained Care Partner by the hour, and keep track of every visit here.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/book",
				children: "Book care"
			})
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Upcoming",
						value: upcoming.length,
						hint: "Live bookings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Completed",
						value: completed.length,
						hint: "Visits finished"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Hours booked",
						value: hours.toFixed(1),
						hint: "Across completed visits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Total spend",
						value: formatCurrency(spend),
						hint: "Completed visits only"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xl",
				children: "Upcoming bookings"
			}),
			upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
					title: "Nothing booked yet",
					description: "Choose a Care Partner and book her time — cooking, companionship, errands and more are all included.",
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/care-partners",
							children: "Browse Care Partners"
						})
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: upcoming.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface-card flex flex-wrap items-center justify-between gap-4 p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: booking.care_partners?.profiles?.full_name ?? "Care Partner"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: [
							formatDate(booking.date),
							" · ",
							formatTime(booking.start_time),
							" –",
							" ",
							formatTime(booking.end_time),
							" · ",
							Number(booking.duration_hours),
							" hrs"
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg",
								children: formatCurrency(booking.total_amount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								size: "sm",
								variant: "outline",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/bookings/$id",
									params: { id: booking.id },
									children: "Details"
								})
							})
						]
					})]
				}, booking.id))
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["customer"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CustomerDashboard, {})
});
//#endregion
export { SplitComponent as component };
