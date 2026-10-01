import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.care-partners-DsbCHeoD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DEFAULT_HOURLY_RATE = 250;
function AdminCarePartnersPage() {
	const queryClient = useQueryClient();
	const [editingRate, setEditingRate] = (0, import_react.useState)(null);
	const [rateValue, setRateValue] = (0, import_react.useState)("");
	const [savingRate, setSavingRate] = (0, import_react.useState)(false);
	const [updatingStatus, setUpdatingStatus] = (0, import_react.useState)(null);
	const { data: partners = [], isLoading, error } = useQuery({
		queryKey: ["admin", "care-partners"],
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
          profiles!care_partners_profile_id_fkey(
            id,
            full_name,
            phone,
            avatar_url,
            city
          )
        `).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	function startEditingRate(partner) {
		setEditingRate(partner.id);
		setRateValue(partner.hourly_rate !== null ? String(partner.hourly_rate) : "");
	}
	function cancelEditingRate() {
		setEditingRate(null);
		setRateValue("");
	}
	async function saveRate(partnerId) {
		const trimmed = rateValue.trim();
		const rate = trimmed === "" ? null : Number(trimmed);
		if (rate !== null && (!Number.isFinite(rate) || rate <= 0 || rate > 1e4)) {
			toast.error("Please enter a valid hourly rate between ₹1 and ₹10,000.");
			return;
		}
		setSavingRate(true);
		const { error } = await supabase.from("care_partners").update({ hourly_rate: rate }).eq("id", partnerId);
		setSavingRate(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success(rate === null ? "Hourly rate reset to the Sakhi default." : "Hourly rate updated successfully.");
		cancelEditingRate();
		await queryClient.invalidateQueries({ queryKey: ["admin", "care-partners"] });
		await queryClient.invalidateQueries({ queryKey: ["care-partners"] });
	}
	async function updateApproval(partnerId, status) {
		setUpdatingStatus(partnerId);
		const { error } = await supabase.from("care_partners").update({ approval_status: status }).eq("id", partnerId);
		setUpdatingStatus(null);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (status === "approved") toast.success("Care Partner approved.");
		else if (status === "rejected") toast.success("Care Partner rejected.");
		else toast.success("Application moved to pending.");
		await queryClient.invalidateQueries({ queryKey: ["admin", "care-partners"] });
		await queryClient.invalidateQueries({ queryKey: ["admin", "care-partner-applications"] });
		await queryClient.invalidateQueries({ queryKey: ["care-partners"] });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Care Partners",
		description: "Manage Care Partner applications, approval and pricing.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "Care Partner management"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: "Review Care Partners, approve or reject applications, and manage their hourly rates."
				})]
			}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "surface-card p-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "Loading Care Partners..."
				})
			}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-destructive",
					children: "Failed to load Care Partners."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: error instanceof Error ? error.message : "Unknown error"
				})]
			}) : partners.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "No Care Partners yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "New Care Partner accounts will appear here."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: partners.map((partner) => {
					const profile = partner.profiles;
					const effectiveRate = partner.hourly_rate ?? DEFAULT_HOURLY_RATE;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-xl font-medium",
									children: profile?.full_name || "Care Partner"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 space-y-1 text-sm text-muted-foreground",
									children: [
										profile?.phone && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.phone }),
										profile?.city && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: profile.city }),
										partner.service_area && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Service area:",
											" ",
											partner.service_area
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
											"Experience:",
											" ",
											partner.experience_years,
											" ",
											partner.experience_years === 1 ? "year" : "years"
										] }),
										partner.languages && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Languages: ", partner.languages] })
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.approval_status }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.verification_status }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.training_status })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-6 grid gap-6 border-t border-border pt-5 md:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm text-muted-foreground",
										children: "Hourly rate"
									}),
									editingRate === partner.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-end gap-2",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "w-full sm:w-48",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: `rate-${partner.id}`,
													className: "sr-only",
													children: "Hourly rate"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													id: `rate-${partner.id}`,
													type: "number",
													min: "1",
													max: "10000",
													step: "0.01",
													value: rateValue,
													onChange: (event) => setRateValue(event.target.value),
													placeholder: "250"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												onClick: () => void saveRate(partner.id),
												disabled: savingRate,
												children: savingRate ? "Saving..." : "Save"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
												type: "button",
												variant: "outline",
												onClick: cancelEditingRate,
												disabled: savingRate,
												children: "Cancel"
											})
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-2 flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "font-display text-xl",
											children: [formatCurrency(effectiveRate), "/hr"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => startEditingRate(partner),
											children: "Change rate"
										})]
									}),
									partner.hourly_rate === null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [
											"No custom rate requested. Sakhi's default rate of",
											" ",
											formatCurrency(DEFAULT_HOURLY_RATE),
											"/hour applies."
										]
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Custom rate requested by the Care Partner. Admin can change it."
									})
								] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: "Application approval"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex flex-wrap gap-2",
									children: [
										partner.approval_status !== "approved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											onClick: () => void updateApproval(partner.id, "approved"),
											disabled: updatingStatus === partner.id,
											children: updatingStatus === partner.id ? "Updating..." : "Approve"
										}),
										partner.approval_status !== "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => void updateApproval(partner.id, "rejected"),
											disabled: updatingStatus === partner.id,
											children: updatingStatus === partner.id ? "Updating..." : "Reject"
										}),
										partner.approval_status === "rejected" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => void updateApproval(partner.id, "pending"),
											disabled: updatingStatus === partner.id,
											children: updatingStatus === partner.id ? "Updating..." : "Move to pending"
										})
									]
								})] })]
							}),
							partner.bio && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 border-t border-border pt-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "About"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: partner.bio
								})]
							}),
							partner.admin_notes && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 rounded-lg bg-sand p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm font-medium",
									children: "Admin notes"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: partner.admin_notes
								})]
							})
						]
					}, partner.id);
				})
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCarePartnersPage, {})
});
//#endregion
export { SplitComponent as component };
