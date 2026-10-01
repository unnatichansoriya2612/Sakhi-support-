import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.training-CVb4b0wM.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedAdminTraining() {
	const queryClient = useQueryClient();
	const { data: records, isLoading, error } = useQuery({
		queryKey: ["admin", "training-records"],
		queryFn: async () => {
			const { data, error } = await supabase.from("training_records").select(`
          id,
          care_partner_id,
          training_name,
          status,
          notes,
          completed_at,
          created_at,
          care_partners!training_records_care_partner_id_fkey(
            id,
            profiles!care_partners_profile_id_fkey(
              full_name,
              email,
              phone
            )
          )
        `).order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function updateTraining(record, status) {
		const { error } = await supabase.from("training_records").update({
			status,
			completed_at: status === "completed" ? (/* @__PURE__ */ new Date()).toISOString() : null
		}).eq("id", record.id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["admin", "training-records"] });
		toast.success(`Training marked as ${status.replace("_", " ")}.`);
	}
	async function addTraining() {
		const carePartnerId = window.prompt("Enter the Care Partner ID:");
		if (!carePartnerId) return;
		const trainingName = window.prompt("Enter the training name:");
		if (!trainingName?.trim()) return;
		const { error } = await supabase.from("training_records").insert({
			care_partner_id: carePartnerId.trim(),
			training_name: trainingName.trim(),
			status: "pending"
		});
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["admin", "training-records"] });
		toast.success("Training record added.");
	}
	async function deleteTraining(id) {
		if (!window.confirm("Are you sure you want to delete this training record?")) return;
		const { error } = await supabase.from("training_records").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["admin", "training-records"] });
		toast.success("Training record deleted.");
	}
	const total = records?.length ?? 0;
	const pending = records?.filter((r) => r.status === "pending").length ?? 0;
	const inProgress = records?.filter((r) => r.status === "in_progress").length ?? 0;
	const completed = records?.filter((r) => r.status === "completed").length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Training",
		description: "Manage training records across Care Partners.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			onClick: addTraining,
			children: "Add training record"
		}),
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading training records..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load training records"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading training records."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Total records",
						value: total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Pending",
						value: pending
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "In progress",
						value: inProgress
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Completed",
						value: completed
					})
				]
			}), total === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "No training records yet"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Training records will appear here when they are added for Care Partners."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5",
						onClick: addTraining,
						children: "Add training record"
					})
				]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-4",
				children: records?.map((record) => {
					const partner = record.care_partners?.profiles;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "surface-card p-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex flex-wrap items-center gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "text-lg font-medium",
											children: record.training_name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: record.status })]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-3 space-y-1 text-sm",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Care Partner:"
												}),
												" ",
												partner?.full_name || "Unknown Care Partner"
											] }),
											partner?.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Email:"
												}),
												" ",
												partner.email
											] }) : null,
											partner?.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Phone:"
												}),
												" ",
												partner.phone
											] }) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Added:"
												}),
												" ",
												formatDate(record.created_at)
											] }),
											record.completed_at ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													className: "text-muted-foreground",
													children: "Completed:"
												}),
												" ",
												formatDate(record.completed_at)
											] }) : null
										]
									}),
									record.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 rounded-lg bg-sand p-4 text-sm text-muted-foreground",
										children: record.notes
									}) : null
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-2 lg:justify-end",
								children: [
									record.status !== "in_progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => updateTraining(record, "in_progress"),
										children: "In progress"
									}) : null,
									record.status !== "completed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										onClick: () => updateTraining(record, "completed"),
										children: "Mark completed"
									}) : null,
									record.status !== "failed" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "outline",
										onClick: () => updateTraining(record, "failed"),
										children: "Mark failed"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "sm",
										variant: "ghost",
										onClick: () => deleteTraining(record.id),
										children: "Delete"
									})
								]
							})]
						})
					}, record.id);
				})
			})]
		})
	});
}
function SummaryCard({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 font-display text-3xl",
			children: value
		})]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdminTraining, {})
});
//#endregion
export { SplitComponent as component };
