import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { t as PlaceholderImage } from "./PlaceholderImage-CcwEu3st.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/what-we-offer-CrxYaSC6.js
var import_jsx_runtime = require_jsx_runtime();
function WhatWeOffer() {
	const { data: tasks } = useQuery({
		queryKey: ["care-tasks", "active"],
		queryFn: async () => {
			const { data } = await supabase.from("care_tasks").select("*").eq("is_active", true).order("created_at");
			return data ?? [];
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
		eyebrow: "What we offer",
		title: "One Care Partner. Whatever reasonable help you need in that time.",
		description: "These are the kinds of support your Care Partner can provide. They are capabilities included in her time — not separate services, and never separately priced."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3",
		children: (tasks ?? []).map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-semibold uppercase tracking-[0.14em] text-primary",
					children: task.category
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 text-lg",
					children: task.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: task.description
				})
			]
		}, task.id))
	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
		muted: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-10 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "What is never included" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-6 list-disc space-y-2 pl-5 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Diagnosing any illness or health condition" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Prescribing, administering or advising on medicines" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Medical treatment or any medical procedure" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Any sexual or intimate service of any kind" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Dangerous, illegal or degrading tasks" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Heavy or unsafe work outside her training" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Therapeutic, clinical or physiotherapy-style massage" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: "Massage on Sakhi is only ever a gentle, comfort-oriented hand or leg massage. Your Care Partner can refuse any request she finds unsafe or inappropriate, and the booking stays protected."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/safety",
						children: "Safety & Trust"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
				name: "cooking",
				alt: "Home-style cooking support",
				ratio: "wide"
			})]
		})
	})] });
}
//#endregion
export { WhatWeOffer as component };
