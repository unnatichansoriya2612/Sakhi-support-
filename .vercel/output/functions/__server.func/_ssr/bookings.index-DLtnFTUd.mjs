import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { i as customerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/bookings.index-DLtnFTUd.js
var import_jsx_runtime = require_jsx_runtime();
function BookingsList() {
	const { user } = useAuth();
	const { data, isLoading } = useQuery({
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		eyebrow: "Customer",
		title: "My bookings",
		description: "Every visit you've requested, in one place.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading..."
		}) : (data ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No bookings yet",
			description: "When you book a Care Partner, it will show up here.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/book",
					children: "Book care"
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: (data ?? []).map((b) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "surface-card flex flex-wrap items-center justify-between gap-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-medium",
					children: b.care_partners?.profiles?.full_name ?? "Care Partner"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						formatDate(b.date),
						" · ",
						formatTime(b.start_time),
						" – ",
						formatTime(b.end_time),
						" · ",
						Number(b.duration_hours),
						" hrs"
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: b.status }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-lg",
							children: formatCurrency(b.total_amount)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/bookings/$id",
								params: { id: b.id },
								children: "Details"
							})
						})
					]
				})]
			}, b.id))
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["customer"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingsList, {})
});
//#endregion
export { SplitComponent as component };
