import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { t as PlaceholderImage } from "./PlaceholderImage-CcwEu3st.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/become-a-care-partner-D1fCOVu_.js
var import_jsx_runtime = require_jsx_runtime();
function BecomePartner() {
	const { user, role } = useAuth();
	const { data: settings } = useQuery({
		queryKey: ["platform-settings"],
		queryFn: async () => {
			const { data } = await supabase.from("platform_settings").select("*").eq("id", 1).maybeSingle();
			return data;
		}
	});
	const applyTo = !user ? "/auth" : role === "care_partner" ? "/partner/application" : "/auth";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Work with Sakhi",
					title: "Become a Care Partner",
					description: "Sakhi Care Partners are trained women who support other women for a few hours at a time. You choose your area, your days and your hours."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: [
						"Current platform rate:",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-semibold text-foreground",
							children: [formatCurrency(settings?.default_hourly_rate ?? 250), " per hour"]
						}),
						". You are paid for your time, not per task."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: applyTo,
							children: role === "care_partner" ? "Continue your application" : "Create a Care Partner account"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						size: "lg",
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/safety",
							children: "Read the safety rules"
						})
					})]
				}),
				!user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "Choose \"Care Partner\" as your account type when you sign up."
				}) : null
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
				name: "care-partner",
				alt: "A Sakhi Care Partner",
				ratio: "portrait"
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			muted: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "What you need",
				center: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: [
					{
						t: "Be a woman aged 18+",
						b: "Sakhi is a women-to-women platform, on both sides of every booking."
					},
					{
						t: "Valid ID for verification",
						b: "Our team verifies identity and background before approval."
					},
					{
						t: "Willingness to train",
						b: "Complete Sakhi's safety, conduct and boundaries training."
					},
					{
						t: "Basic home skills",
						b: "Simple cooking, tea, light household help and errands."
					},
					{
						t: "Warmth and patience",
						b: "Companionship matters as much as the practical tasks."
					},
					{
						t: "A phone",
						b: "To manage availability and respond to booking requests."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg",
						children: item.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: item.b
					})]
				}, item.t))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Your journey" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "mt-8 grid gap-4 md:grid-cols-2",
			children: [
				"Sign up and choose the Care Partner account type.",
				"Submit your application: bio, experience, service area, languages and supported tasks.",
				"Wait for verification and training to be marked complete by the Sakhi team.",
				"Once approved, publish your availability.",
				"Receive booking requests and accept the ones that suit you.",
				"Complete bookings, collect reviews and track your earnings."
			].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
				className: "surface-card flex gap-5 p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "font-display text-2xl text-primary",
					children: String(i + 1).padStart(2, "0")
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: step
				})]
			}, step))
		})] })
	] });
}
//#endregion
export { BecomePartner as component };
