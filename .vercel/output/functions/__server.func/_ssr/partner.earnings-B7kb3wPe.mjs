import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner.earnings-B7kb3wPe.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedPartnerEarnings() {
	const { user } = useAuth();
	const { data: partner, isLoading: partnerLoading } = useQuery({
		queryKey: ["my-care-partner", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("id").eq("profile_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: bookings, isLoading: bookingsLoading, error } = useQuery({
		queryKey: ["partner-earnings", partner?.id],
		enabled: Boolean(partner?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select(`
          id,
          date,
          start_time,
          end_time,
          duration_hours,
          hourly_rate,
          total_amount,
          status
        `).eq("care_partner_id", partner.id).eq("status", "completed").order("date", { ascending: false }).order("start_time", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	if (partnerLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Earnings",
		description: "Hours worked and amounts earned.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading your Care Partner profile..."
		})
	});
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Earnings",
		description: "Hours worked and amounts earned.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Care Partner profile not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your Care Partner profile has not been created yet."
			})]
		})
	});
	if (bookingsLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Earnings",
		description: "Hours worked and amounts earned.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading earnings..."
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Earnings",
		description: "Hours worked and amounts earned.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Unable to load earnings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error.message
			})]
		})
	});
	const completedBookings = bookings ?? [];
	const totalHours = completedBookings.reduce((sum, booking) => sum + Number(booking.duration_hours ?? 0), 0);
	const totalEarnings = completedBookings.reduce((sum, booking) => sum + Number(booking.total_amount ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		nav: partnerNav,
		eyebrow: "Care Partner",
		title: "Earnings",
		description: "Hours worked and amounts earned.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Total hours worked"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: totalHours
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "From completed bookings"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Total earnings"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: formatCurrency(totalEarnings)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "From completed bookings"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Completed bookings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Your earnings are calculated from completed visits."
					}),
					completedBookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No completed bookings yet",
							description: "Once you complete a booking, your hours and earnings will appear here."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-3",
						children: completedBookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "surface-card flex flex-wrap items-center justify-between gap-4 p-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: formatDate(booking.date)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										formatTime(booking.start_time),
										" –",
										" ",
										formatTime(booking.end_time)
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: [
										Number(booking.duration_hours),
										" hours ×",
										" ",
										formatCurrency(booking.hourly_rate),
										"/hr"
									]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-display text-lg",
									children: formatCurrency(booking.total_amount)
								})]
							})]
						}, booking.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6 rounded-xl border border-border bg-sand p-4 text-sm text-muted-foreground",
				children: "Sakhi does not process payments in this MVP. The amount shown here is the booking amount calculated from your hourly rate and completed hours. Payment is settled directly with the customer."
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["care_partner"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedPartnerEarnings, {})
});
//#endregion
export { SplitComponent as component };
