import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { o as cn } from "./router-0JUlUF2v.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PlaceholderImage-CcwEu3st.js
var import_jsx_runtime = require_jsx_runtime();
var ratios = {
	video: "aspect-video",
	square: "aspect-square",
	portrait: "aspect-[4/5]",
	wide: "aspect-[16/9]"
};
/**
* Renders a replaceable image from /public/images.
* Drop a real photo in as `public/images/<name>.jpg` and update the src
* extension here (or simply overwrite the .svg) — see README.
*/
function PlaceholderImage({ name, alt, className, ratio = "video" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("overflow-hidden rounded-2xl bg-sand", ratios[ratio], className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: `/images/${name}.jpeg`,
			alt,
			loading: "lazy",
			className: "h-full w-full object-cover"
		})
	});
}
//#endregion
export { PlaceholderImage as t };
