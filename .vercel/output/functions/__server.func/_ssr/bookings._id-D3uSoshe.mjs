import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useAuth, n as Route$6 } from "./router-0JUlUF2v.mjs";
import { i as customerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings._id-D3uSoshe.js
var import_jsx_runtime = require_jsx_runtime();
/** Statuses a customer is still allowed to cancel from. */
var CANCELLABLE_STATUSES = [
	"pending",
	"accepted",
	"confirmed"
];
function BookingDetailPage() {
	const { id } = Route$6.useParams();
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: booking, isLoading } = useQuery({
		queryKey: ["booking", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("bookings").select("*, care_partners(id, profiles!care_partners_profile_id_fkey(full_name, phone))").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	async function cancel() {
		const { error } = await supabase.from("bookings").update({
			status: "cancelled",
			cancelled_by: user.id,
			cancel_reason: "Cancelled by customer"
		}).eq("id", id);
		if (error) return toast.error(error.message);
		toast.success("Booking cancelled.");
		await queryClient.invalidateQueries();
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		title: "Booking",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		})
	});
	if (!booking) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		title: "Booking not found",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/bookings",
				children: "Back to bookings"
			})
		})
	});
	const partnerName = booking.care_partners?.profiles?.full_name ?? "Care Partner";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		eyebrow: "Booking",
		title: partnerName,
		description: `${formatDate(booking.date)} · ${formatTime(booking.start_time)} – ${formatTime(booking.end_time)}`,
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg",
						children: "Visit details"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-4 space-y-2 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [Number(booking.duration_hours), " hours"] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Hourly rate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatCurrency(booking.hourly_rate) })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Total"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: formatCurrency(booking.total_amount)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Address"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-right",
									children: booking.address
								})]
							})
						]
					}),
					booking.instructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 rounded-lg bg-sand p-4 text-sm text-muted-foreground",
						children: booking.instructions
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg",
						children: "Manage"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Care Partners provide non-medical support only. If anything felt unsafe, tell us and we will act."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [CANCELLABLE_STATUSES.includes(booking.status) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: cancel,
							children: "Cancel booking"
						}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/bookings",
								children: "All bookings"
							})
						})]
					})
				]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["customer"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingDetailPage, {})
});
//#endregion
export { SplitComponent as component };
