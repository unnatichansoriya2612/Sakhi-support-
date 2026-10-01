import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { t as PlaceholderImage } from "./PlaceholderImage-CcwEu3st.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/about-USkplkYd.js
var import_jsx_runtime = require_jsx_runtime();
function About() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "About us",
				title: "सखी means a woman's closest friend.",
				description: "Millions of women live away from their families for study and work. On a bad day there is no one to make tea, cook something simple, or sit beside them. Sakhi is our answer to that gap."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm text-muted-foreground",
				children: "We are not a maid agency and we are not a clinic. We are a network of trained women who show up for other women, for a few hours at a time, and help with whatever reasonable non-medical thing is needed that day."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
				name: "care-partner",
				alt: "A Sakhi Care Partner",
				ratio: "portrait"
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			muted: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				title: "What we stand for",
				center: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						t: "Dignity",
						b: "Both sides of every booking are treated with respect. Care work is real work."
					},
					{
						t: "Safety",
						b: "Verification, training and clear boundaries come before growth."
					},
					{
						t: "Honesty",
						b: "One hourly rate, shown up front. No packages, no upselling."
					},
					{
						t: "Warmth",
						b: "Comfort and company matter as much as the cooking and the cleaning."
					}
				].map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg",
						children: v.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: v.b
					})]
				}, v.t))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card flex flex-col items-start gap-6 p-10 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "Want to be part of it?"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Book care for yourself, or join us as a Care Partner."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/book",
						children: "Book Care"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/become-a-care-partner",
						children: "Become a Care Partner"
					})
				})]
			})]
		}) })
	] });
}
//#endregion
export { About as component };
