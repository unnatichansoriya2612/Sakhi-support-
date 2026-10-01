import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.applications-Cv0JXmjc.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedAdminApplications() {
	const queryClient = useQueryClient();
	const { data: applications, isLoading, error } = useQuery({
		queryKey: ["admin", "care-partner-applications"],
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select(`
          id,
          profile_id,
          bio,
          experience_years,
          languages,
          service_area,
          hourly_rate,
          approval_status,
          verification_status,
          training_status,
          admin_notes,
          created_at,
          updated_at,
          profiles!care_partners_profile_id_fkey(
            full_name,
            email,
            phone,
            city
          )
        `).in("approval_status", [
				"pending",
				"rejected",
				"not_submitted"
			]).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function updateApplication(id, status) {
		const { error } = await supabase.from("care_partners").update({ approval_status: status }).eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["admin", "care-partner-applications"] });
		await queryClient.invalidateQueries({ queryKey: ["care-partners"] });
		toast.success(status === "approved" ? "Care Partner approved." : "Care Partner application rejected.");
	}
	async function approveApplication(id) {
		await updateApplication(id, "approved");
	}
	async function rejectApplication(id) {
		await updateApplication(id, "rejected");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Applications",
		description: "Review Care Partner applications and approve or reject them.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading applications..."
			})
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Unable to load applications"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading applications."
			})]
		}) : (applications ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No applications yet",
			description: "Care Partner applications submitted for review will appear here."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-5",
			children: (applications ?? []).map((application) => {
				const profile = application.profiles;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-medium",
								children: profile?.full_name || "Care Partner"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: profile?.email || "No email available"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: application.approval_status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Phone"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: profile?.phone || "Not provided"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "City"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: profile?.city || "Not provided"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Experience"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-sm",
									children: [application.experience_years, " years"]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: "Hourly rate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm",
									children: application.hourly_rate != null ? `${formatCurrency(application.hourly_rate)}/hr` : "Not set"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Languages"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: application.languages || "Not provided"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Service area"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm",
								children: application.service_area || "Not provided"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Bio"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 rounded-lg bg-sand p-4 text-sm",
								children: application.bio || "No bio provided."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5 grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Verification"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: application.verification_status })
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Training"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: application.training_status })
							})] })]
						}),
						application.admin_notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Admin notes"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 rounded-lg border border-border p-4 text-sm",
								children: application.admin_notes
							})]
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-wrap gap-3 border-t border-border pt-5",
							children: [application.approval_status !== "approved" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								onClick: () => approveApplication(application.id),
								children: "Approve"
							}) : null, application.approval_status !== "rejected" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								onClick: () => rejectApplication(application.id),
								children: "Reject"
							}) : null]
						})
					]
				}, application.id);
			})
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdminApplications, {})
});
//#endregion
export { SplitComponent as component };
