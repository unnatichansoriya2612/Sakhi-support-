import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as cn } from "./router-0JUlUF2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Section-Cjglc_Pw.js
var import_jsx_runtime = require_jsx_runtime();
function Section({ children, className, muted = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: cn("py-16 sm:py-20", muted && "bg-sand", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-page",
			children
		})
	});
}
function SectionHeading({ eyebrow, title, description, center = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("max-w-2xl", center && "mx-auto text-center"),
		children: [
			eyebrow ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-semibold uppercase tracking-[0.18em] text-primary",
				children: eyebrow
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-2 text-3xl sm:text-4xl",
				children: title
			}),
			description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-muted-foreground",
				children: description
			}) : null
		]
	});
}
//#endregion
export { SectionHeading as n, Section as t };
