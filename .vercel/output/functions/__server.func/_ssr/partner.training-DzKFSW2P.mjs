import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner.training-DzKFSW2P.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedPartnerTraining() {
	const { user } = useAuth();
	const { data: carePartner, isLoading: partnerLoading } = useQuery({
		queryKey: ["care-partner", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("id").eq("profile_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: trainingRecords, isLoading: trainingLoading } = useQuery({
		queryKey: ["training-records", carePartner?.id],
		enabled: Boolean(carePartner?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("training_records").select("id, training_name, status, notes, completed_at, created_at").eq("care_partner_id", carePartner.id).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		eyebrow: "Care Partner",
		title: "Training",
		description: "View your Sakhi training records and completion status.",
		children: partnerLoading || trainingLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading your training records..."
			})
		}) : !carePartner ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "Care Partner profile not found",
			description: "Your Care Partner profile could not be found. Please contact Sakhi support."
		}) : (trainingRecords ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No training records yet",
			description: "Your training records will appear here once Sakhi adds your training."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: (trainingRecords ?? []).map((training) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-start justify-between gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: training.training_name
						}), training.created_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: ["Added ", formatDate(training.created_at)]
						}) : null] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: training.status })]
					}),
					training.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 rounded-lg bg-sand p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: training.notes
						})
					}) : null,
					training.completed_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted-foreground",
							children: ["Completed on:", " "]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-medium",
							children: formatDate(training.completed_at)
						})]
					}) : null
				]
			}, training.id))
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["care_partner"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedPartnerTraining, {})
});
//#endregion
export { SplitComponent as component };
