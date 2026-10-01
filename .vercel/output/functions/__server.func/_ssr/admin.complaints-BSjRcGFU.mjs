import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
import { t as Textarea } from "./textarea-DWvAtFt2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.complaints-BSjRcGFU.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedAdminComplaints() {
	const queryClient = useQueryClient();
	const { data: complaints, isLoading, error } = useQuery({
		queryKey: ["admin", "complaints"],
		queryFn: async () => {
			const { data, error } = await supabase.from("complaints").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function updateComplaint(complaintId, status, adminNotes) {
		const { error } = await supabase.from("complaints").update({
			status,
			admin_notes: adminNotes.trim() || null
		}).eq("id", complaintId);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["admin", "complaints"] });
		toast.success("Complaint updated.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Complaints",
		description: "Review and manage safety and service complaints.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading complaints..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load complaints"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading complaints."
			})]
		}) : complaints.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "No complaints yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "New safety or service complaints will appear here."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-6",
			children: complaints.map((complaint) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ComplaintCard, {
				complaint,
				onUpdate: updateComplaint
			}, complaint.id))
		})
	});
}
function ComplaintCard({ complaint, onUpdate }) {
	const [adminNotes, setAdminNotes] = useState(complaint.admin_notes ?? "");
	const status = complaint.status ?? "open";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Complaint ID"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 break-all text-sm font-medium",
					children: complaint.id
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-5 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Booking ID",
						value: complaint.booking_id ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Created",
						value: complaint.created_at ? new Date(complaint.created_at).toLocaleString() : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Complaint type",
						value: complaint.category ?? complaint.type ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Reported by",
						value: complaint.reported_by ?? complaint.customer_id ?? complaint.profile_id ?? "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Complaint"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground",
					children: complaint.description ?? complaint.message ?? complaint.details ?? "No description provided."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: `admin-notes-${complaint.id}`,
					children: "Admin notes"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					id: `admin-notes-${complaint.id}`,
					rows: 4,
					value: adminNotes,
					onChange: (event) => setAdminNotes(event.target.value),
					placeholder: "Add investigation notes or a message for the user."
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-3",
				children: [
					status !== "investigating" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => onUpdate(complaint.id, "investigating", adminNotes),
						children: "Mark investigating"
					}),
					status !== "resolved" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => onUpdate(complaint.id, "resolved", adminNotes),
						children: "Resolve"
					}),
					status !== "dismissed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => onUpdate(complaint.id, "dismissed", adminNotes),
						children: "Dismiss"
					})
				]
			})
		]
	});
}
function InfoItem({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-xs text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-1 break-words text-sm",
		children: value
	})] });
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdminComplaints, {})
});
//#endregion
export { SplitComponent as component };
