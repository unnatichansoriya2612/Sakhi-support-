import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as MapPin, r as Star } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/care-partners.index-CiXMMDoF.js
var import_jsx_runtime = require_jsx_runtime();
function usePartnersQuery() {
	return useQuery({
		queryKey: ["care-partners", "approved"],
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("*, profiles!care_partners_profile_id_fkey(id, full_name, avatar_url, city)").eq("approval_status", "approved").order("created_at", { ascending: false });
			if (error) throw error;
			return data ?? [];
		}
	});
}
function BrowsePartners() {
	const { data: partners, isLoading } = usePartnersQuery();
	const { data: ratings } = useQuery({
		queryKey: ["reviews", "aggregate"],
		queryFn: async () => {
			const { data } = await supabase.from("reviews").select("care_partner_id, rating");
			const map = {};
			for (const row of data ?? []) {
				const entry = map[row.care_partner_id] ??= {
					total: 0,
					count: 0
				};
				entry.total += row.rating;
				entry.count += 1;
			}
			return map;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
		eyebrow: "Care Partners",
		title: "Approved, verified and ready to help",
		description: "Only Care Partners who have completed verification and training and been approved by our team appear here. You book her time — everything she can help with is included."
	}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mt-10 text-sm text-muted-foreground",
		children: "Loading Care Partners..."
	}) : (partners ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-10",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
			title: "No approved Care Partners yet",
			description: "New Care Partners are being verified and trained. Please check back shortly.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/become-a-care-partner",
					children: "Become a Care Partner"
				})
			})
		})
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3",
		children: (partners ?? []).map((partner) => {
			const agg = ratings?.[partner.id];
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card flex flex-col p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "text-lg",
							children: partner.profiles?.full_name || "Care Partner"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 flex items-center gap-1 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-3" }), partner.service_area || partner.profiles?.city || "Service area on request"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.verification_status })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 line-clamp-3 text-sm text-muted-foreground",
						children: partner.bio || "This Care Partner has not added a bio yet."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [partner.experience_years, " yrs experience"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: partner.languages }),
							agg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "flex items-center gap-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-3 fill-current text-warning" }),
									(agg.total / agg.count).toFixed(1),
									" (",
									agg.count,
									")"
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-center justify-between border-t border-border pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-display text-xl",
							children: [formatCurrency(partner.hourly_rate), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-normal text-muted-foreground",
								children: "/hr"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/care-partners/$id",
								params: { id: partner.id },
								children: "View profile"
							})
						})]
					})
				]
			}, partner.id);
		})
	})] });
}
//#endregion
export { BrowsePartners as component, usePartnersQuery };
