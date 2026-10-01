import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.users-BlrfdcWl.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedAdminUsers() {
	const { data: users, isLoading, error } = useQuery({
		queryKey: ["admin", "users"],
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id, full_name, email, phone, role, city, created_at").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	const totalUsers = users?.length ?? 0;
	const customers = users?.filter((user) => user.role === "customer").length ?? 0;
	const carePartners = users?.filter((user) => user.role === "care_partner").length ?? 0;
	const admins = users?.filter((user) => user.role === "admin").length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Users",
		description: "All Sakhi accounts.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading users..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load users"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading users."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Total users",
						value: totalUsers
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Customers",
						value: customers
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Care Partners",
						value: carePartners
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						label: "Admins",
						value: admins
					})
				]
			}), totalUsers === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-8 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-medium",
					children: "No users yet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Registered Sakhi accounts will appear here."
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: users?.map((user) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card p-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "font-medium",
									children: user.full_name || "Unnamed user"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: user.role })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 space-y-1 text-sm text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: user.email || "No email" }),
									user.phone ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: user.phone }) : null,
									user.city ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: user.city }) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: ["Joined ", formatDate(user.created_at)] })
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-xs text-muted-foreground lg:text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "User ID" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 break-all font-mono",
								children: user.id
							})]
						})]
					})
				}, user.id))
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
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdminUsers, {})
});
//#endregion
export { SplitComponent as component };
