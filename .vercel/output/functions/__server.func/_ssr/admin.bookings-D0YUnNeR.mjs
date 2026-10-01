import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.bookings-D0YUnNeR.js
var import_jsx_runtime = require_jsx_runtime();
function AdminBookingsPage() {
	const queryClient = useQueryClient();
	const { data: bookings, isLoading, error } = useQuery({
		queryKey: ["bookings", "admin"],
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select(`
          *,
          profiles!bookings_customer_id_fkey (
            full_name,
            email,
            phone
          ),
          care_partners (
            id,
            profiles!care_partners_profile_id_fkey (
              full_name,
              phone
            )
          )
        `).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function updateStatus(bookingId, status) {
		const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["bookings", "admin"] });
		await queryClient.invalidateQueries({ queryKey: ["bookings"] });
		toast.success(`Booking marked as ${status}.`);
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Bookings",
		description: "All bookings on the platform.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading bookings..."
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Bookings",
		description: "All bookings on the platform.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load bookings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading bookings."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Bookings",
		description: "All bookings on the platform.",
		children: (bookings ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "No bookings yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Customer booking requests will appear here."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: (bookings ?? []).map((booking) => {
				const customer = booking.profiles;
				const partner = booking.care_partners?.profiles;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-lg font-medium",
									children: customer?.full_name || "Customer"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									"Care Partner:",
									" ",
									partner?.full_name || "Care Partner"
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-left lg:text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-xl",
									children: formatCurrency(booking.total_amount)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted-foreground",
									children: [Number(booking.duration_hours), " hours"]
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 text-sm sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: formatDate(booking.date)
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 font-medium",
									children: [
										formatTime(booking.start_time),
										" –",
										" ",
										formatTime(booking.end_time)
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Customer phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: customer?.phone || "Not provided"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-muted-foreground",
									children: "Partner phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-medium",
									children: partner?.phone || "Not provided"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 rounded-lg bg-sand p-4 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: "Visit address"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: booking.address
								}),
								booking.instructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 font-medium",
									children: "Customer instructions"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-muted-foreground",
									children: booking.instructions
								})] }) : null
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 flex flex-wrap gap-2",
							children: [
								booking.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => updateStatus(booking.id, "accepted"),
									children: "Accept"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => updateStatus(booking.id, "rejected"),
									children: "Reject"
								})] }) : null,
								booking.status === "accepted" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => updateStatus(booking.id, "confirmed"),
									children: "Confirm"
								}) : null,
								booking.status === "confirmed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => updateStatus(booking.id, "in_progress"),
									children: "Start visit"
								}) : null,
								booking.status === "in_progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									onClick: () => updateStatus(booking.id, "completed"),
									children: "Mark completed"
								}) : null,
								[
									"pending",
									"accepted",
									"confirmed"
								].includes(booking.status) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "sm",
									variant: "outline",
									onClick: () => updateStatus(booking.id, "cancelled"),
									children: "Cancel"
								}) : null
							]
						})
					]
				}, booking.id);
			})
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBookingsPage, {})
});
//#endregion
export { SplitComponent as component };
