import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as ShieldCheck, u as GraduationCap, v as Ban, y as BadgeCheck } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { t as PlaceholderImage } from "./PlaceholderImage-CcwEu3st.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/safety-TI870Rbd.js
var import_jsx_runtime = require_jsx_runtime();
var pillars = [
	{
		icon: BadgeCheck,
		t: "Verified identity",
		b: "Every Care Partner's identity and background documents are reviewed by our admin team before approval."
	},
	{
		icon: GraduationCap,
		t: "Mandatory training",
		b: "Safety, conduct, boundaries and basic home-care training must be completed before any booking."
	},
	{
		icon: ShieldCheck,
		t: "Admin oversight",
		b: "Approvals, complaints, reviews and bookings are all monitored by the Sakhi team."
	},
	{
		icon: Ban,
		t: "The right to refuse",
		b: "Care Partners can decline any task that is unsafe, illegal, intimate, medical or outside training."
	}
];
function Safety() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Safety & trust",
				title: "Care only works when both women feel safe.",
				description: "Sakhi is a women-to-women platform with hard limits. These rules are not fine print — they are enforced in our product, our approvals and our policies."
			}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
				name: "safety",
				alt: "Safety at Sakhi",
				ratio: "wide"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-14 grid gap-6 md:grid-cols-2",
			children: pillars.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(p.icon, { className: "size-6 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-lg",
						children: p.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: p.b
					})
				]
			}, p.t))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			muted: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-10 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl",
							children: "Sakhi provides non-medical support only"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: "A Care Partner must never:"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Diagnose any illness or condition" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Prescribe or administer medicines" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Provide medical treatment or advice" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Perform any medical procedure, injection or dressing" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Provide any sexual or intimate service" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Perform dangerous or illegal tasks" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Perform unsafe or heavy work outside her training" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "If you have a medical emergency, contact emergency services or a qualified doctor immediately. Sakhi is not a substitute for medical care."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-xl",
							children: "About massage on Sakhi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: [
								"The only massage offered on Sakhi is a ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "gentle, comfort-oriented hand or leg massage" }),
								". It is a small comfort, like a warm compress or a cup of tea."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 list-disc space-y-2 pl-5 text-sm text-muted-foreground",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "It is never therapeutic, clinical or physiotherapy-style." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "It is never full-body, intimate or oil-based spa treatment." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "It stops immediately whenever either woman asks." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Requesting anything beyond this is a violation and can end your account." })
							]
						})
					]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, { title: "Reporting and accountability" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-sm text-muted-foreground",
				children: "Every booking can be reported. Complaints go straight to the Sakhi admin team, who can investigate, suspend accounts and remove Care Partners or customers from the platform. You can raise a complaint from any booking's detail page."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-wrap gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/terms",
						children: "Terms & Conditions"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/cancellation",
						children: "Cancellation & Refund Policy"
					})
				})]
			})
		] })
	] });
}
//#endregion
export { Safety as component };
