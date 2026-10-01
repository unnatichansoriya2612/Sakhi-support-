import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner.index-DM4eWTBe.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedPartner() {
	const { user } = useAuth();
	const { data: partner, isLoading: partnerLoading } = useQuery({
		queryKey: ["my-care-partner", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("id, approval_status, verification_status, training_status, hourly_rate").eq("profile_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: bookings, isLoading: bookingsLoading } = useQuery({
		queryKey: ["partner-dashboard-bookings", partner?.id],
		enabled: Boolean(partner?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select(`
          id,
          customer_id,
          date,
          start_time,
          end_time,
          duration_hours,
          hourly_rate,
          total_amount,
          status,
          address,
          instructions,
          created_at
        `).eq("care_partner_id", partner.id).order("date", { ascending: true }).order("start_time", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	if (partnerLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Care Partner Dashboard",
		description: "Your upcoming visits, hours and earnings.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading your dashboard..."
		})
	});
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Care Partner Dashboard",
		description: "Your upcoming visits, hours and earnings.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Care Partner profile not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Your Care Partner profile has not been created yet."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/partner/application",
						children: "Open application"
					})
				})
			]
		})
	});
	const allBookings = bookings ?? [];
	const pendingBookings = allBookings.filter((booking) => booking.status === "pending");
	const today = (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
	const upcomingBookings = allBookings.filter((booking) => booking.date >= today && [
		"accepted",
		"confirmed",
		"in_progress"
	].includes(booking.status)).slice(0, 5);
	const completedBookings = allBookings.filter((booking) => booking.status === "completed");
	const completedHours = completedBookings.reduce((sum, booking) => sum + Number(booking.duration_hours ?? 0), 0);
	const totalEarnings = completedBookings.reduce((sum, booking) => sum + Number(booking.total_amount ?? 0), 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DashboardShell, {
		nav: partnerNav,
		eyebrow: "Care Partner",
		title: "Care Partner Dashboard",
		description: "Your upcoming visits, hours and earnings.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card p-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Application status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.approval_status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.verification_status }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.training_status })
						]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner/application",
							children: "View application"
						})
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "New requests"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: pendingBookings.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Upcoming visits"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: upcomingBookings.length
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Completed hours"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: completedHours
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: "Total earnings"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-3xl",
							children: formatCurrency(totalEarnings)
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner/bookings",
							children: "View bookings"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner/availability",
							children: "Manage availability"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner/earnings",
							children: "View earnings"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "New booking requests"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Requests waiting for your response."
					})] }), pendingBookings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/partner/bookings",
							children: "View all"
						})
					}) : null]
				}), bookingsLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-sm text-muted-foreground",
					children: "Loading bookings..."
				}) : pendingBookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
						title: "No new requests",
						description: "New customer booking requests will appear here."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-5 space-y-3",
					children: pendingBookings.slice(0, 5).map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card flex flex-wrap items-center justify-between gap-4 p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: formatDate(booking.date)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: [
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
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg",
								children: formatCurrency(booking.total_amount)
							})]
						})]
					}, booking.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Upcoming visits"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Your next confirmed visits."
					}),
					upcomingBookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
							title: "No upcoming visits",
							description: "Accepted and confirmed bookings will appear here."
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-5 space-y-3",
						children: upcomingBookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
										formatTime(booking.end_time),
										" · ",
										Number(booking.duration_hours),
										" hrs"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: booking.address
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status })]
						}, booking.id))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 rounded-xl border border-border bg-sand p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Your current hourly rate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-2xl",
						children: [partner.hourly_rate != null ? formatCurrency(partner.hourly_rate) : "Not set", partner.hourly_rate != null ? "/hr" : ""]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: "Your hourly rate is managed by the Sakhi platform."
					})
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["care_partner"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedPartner, {})
});
//#endregion
export { SplitComponent as component };
