import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reviews-BvX6duP-.js
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedAdminReviews() {
	const { data: reviews, isLoading, error } = useQuery({
		queryKey: ["admin", "reviews"],
		queryFn: async () => {
			const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Reviews",
		description: "Customer reviews of Care Partners.",
		children: isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading reviews..."
		}) : error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load reviews"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading reviews."
			})]
		}) : reviews.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-8 text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "No reviews yet"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Customer reviews will appear here after completed bookings are reviewed."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-4",
			children: reviews.map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ReviewCard, { review }, review.id))
		})
	});
}
function ReviewCard({ review }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "surface-card p-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Review ID"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 break-all text-sm font-medium",
					children: review.id
				})] }), review.status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: review.status }) : null]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-5 md:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Rating",
						value: review.rating !== null && review.rating !== void 0 ? `${review.rating} / 5` : "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Customer",
						value: review.customer_id ?? review.profile_id ?? review.user_id ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Care Partner",
						value: review.care_partner_id ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Booking",
						value: review.booking_id ?? "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoItem, {
						label: "Created",
						value: review.created_at ? new Date(review.created_at).toLocaleString() : "—"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Review"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 whitespace-pre-wrap text-sm text-muted-foreground",
					children: review.comment ?? review.review_text ?? review.body ?? review.content ?? "No written review."
				})]
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
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdminReviews, {})
});
//#endregion
export { SplitComponent as component };
