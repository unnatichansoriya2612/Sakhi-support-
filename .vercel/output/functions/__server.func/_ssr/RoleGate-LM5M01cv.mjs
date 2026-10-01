import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button, c as useAuth, o as cn, s as homeForRole } from "./router-0JUlUF2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RoleGate-LM5M01cv.js
var import_jsx_runtime = require_jsx_runtime();
function DashboardNav({ items }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "-mx-1 flex gap-1 overflow-x-auto pb-2",
		children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: item.to,
			className: cn("shrink-0 rounded-full px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted"),
			activeProps: { className: "bg-primary text-primary-foreground hover:bg-primary" },
			activeOptions: { exact: true },
			children: item.label
		}, item.to))
	});
}
function PageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-4 border-b border-border pb-6 sm:flex-row sm:items-end sm:justify-between",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-1 text-3xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-2xl text-sm text-muted-foreground",
				children: description
			}) : null
		] }), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap gap-2",
			children: actions
		}) : null]
	});
}
var customerNav = [
	{
		to: "/dashboard",
		label: "Dashboard"
	},
	{
		to: "/book",
		label: "Book Care"
	},
	{
		to: "/bookings",
		label: "My Bookings"
	},
	{
		to: "/notifications",
		label: "Notifications"
	},
	{
		to: "/profile",
		label: "Profile"
	}
];
var partnerNav = [
	{
		to: "/partner",
		label: "Dashboard"
	},
	{
		to: "/partner/application",
		label: "Application"
	},
	{
		to: "/partner/bookings",
		label: "Bookings"
	},
	{
		to: "/partner/availability",
		label: "Availability"
	},
	{
		to: "/partner/training",
		label: "Training"
	},
	{
		to: "/partner/earnings",
		label: "Earnings"
	},
	{
		to: "/profile",
		label: "Profile"
	}
];
var adminNav = [
	{
		to: "/admin",
		label: "Dashboard"
	},
	{
		to: "/admin/users",
		label: "Users"
	},
	{
		to: "/admin/care-partners",
		label: "Care Partners"
	},
	{
		to: "/admin/applications",
		label: "Applications"
	},
	{
		to: "/admin/verification",
		label: "Verification"
	},
	{
		to: "/admin/training",
		label: "Training"
	},
	{
		to: "/admin/tasks",
		label: "Tasks"
	},
	{
		to: "/admin/pricing",
		label: "Pricing"
	},
	{
		to: "/admin/bookings",
		label: "Bookings"
	},
	{
		to: "/admin/reviews",
		label: "Reviews"
	},
	{
		to: "/admin/complaints",
		label: "Complaints"
	}
];
function DashboardShell({ nav, eyebrow, title, description, actions, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-page py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardNav, { items: nav }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
					eyebrow,
					title,
					description,
					actions
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8",
				children
			})
		]
	});
}
function RoleGate({ allow, children }) {
	const { role, loading } = useAuth();
	if (loading || !role) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading your account..."
		})
	});
	if (!allow.includes(role)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page py-20",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card mx-auto max-w-lg p-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-2xl",
					children: "This area isn't for your account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 text-sm text-muted-foreground",
					children: [
						"You're signed in as a ",
						role.replace("_", " "),
						". Head back to your own dashboard."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: homeForRole(role),
						children: "Go to my dashboard"
					})
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
//#endregion
export { partnerNav as a, customerNav as i, RoleGate as n, adminNav as r, DashboardShell as t };
