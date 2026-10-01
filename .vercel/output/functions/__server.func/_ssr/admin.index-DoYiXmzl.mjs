import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-DoYiXmzl.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedAdmin() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["admin", "dashboard"],
		queryFn: async () => {
			const [profilesResult, carePartnersResult, pendingApplicationsResult, approvedPartnersResult, pendingVerificationResult, pendingTrainingResult, activeBookingsResult, openComplaintsResult] = await Promise.all([
				supabase.from("profiles").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("care_partners").select("id", {
					count: "exact",
					head: true
				}),
				supabase.from("care_partners").select("id", {
					count: "exact",
					head: true
				}).eq("approval_status", "pending"),
				supabase.from("care_partners").select("id", {
					count: "exact",
					head: true
				}).eq("approval_status", "approved"),
				supabase.from("care_partners").select("id", {
					count: "exact",
					head: true
				}).in("verification_status", ["not_started", "in_review"]),
				supabase.from("care_partners").select("id", {
					count: "exact",
					head: true
				}).in("training_status", ["not_started", "in_progress"]),
				supabase.from("bookings").select("id", {
					count: "exact",
					head: true
				}).in("status", [
					"pending",
					"accepted",
					"confirmed",
					"in_progress"
				]),
				supabase.from("complaints").select("id", {
					count: "exact",
					head: true
				}).in("status", ["open", "investigating"])
			]);
			const failed = [
				profilesResult,
				carePartnersResult,
				pendingApplicationsResult,
				approvedPartnersResult,
				pendingVerificationResult,
				pendingTrainingResult,
				activeBookingsResult,
				openComplaintsResult
			].find((result) => result.error);
			if (failed?.error) throw failed.error;
			return {
				users: profilesResult.count ?? 0,
				carePartners: carePartnersResult.count ?? 0,
				pendingApplications: pendingApplicationsResult.count ?? 0,
				approvedPartners: approvedPartnersResult.count ?? 0,
				pendingVerification: pendingVerificationResult.count ?? 0,
				pendingTraining: pendingTrainingResult.count ?? 0,
				activeBookings: activeBookingsResult.count ?? 0,
				openComplaints: openComplaintsResult.count ?? 0
			};
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Sakhi Admin",
		title: "Admin Dashboard",
		description: "Platform overview for the Sakhi team.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading dashboard..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load dashboard"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading the dashboard."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Total Users",
						value: data?.users ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Care Partners",
						value: data?.carePartners ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Approved Partners",
						value: data?.approvedPartners ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Pending Applications",
						value: data?.pendingApplications ?? 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Pending Verification",
						value: data?.pendingVerification ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Pending Training",
						value: data?.pendingTraining ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Active Bookings",
						value: data?.activeBookings ?? 0
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardCard, {
						title: "Open Complaints",
						value: data?.openComplaints ?? 0
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 surface-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Admin overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Use the Admin navigation to review applications, Care Partners, verification, training, bookings and complaints."
				})]
			})
		] })
	});
}
function DashboardCard({ title, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl",
			children: value
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdmin, {})
});
//#endregion
export { SplitComponent as component };
