import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/how-it-works-Bxaaxqmv.js
var import_jsx_runtime = require_jsx_runtime();
var customerSteps = [
	{
		title: "Create your account",
		body: "Sign up as a Customer with your name, email and phone. It takes a minute."
	},
	{
		title: "Browse approved Care Partners",
		body: "Only Care Partners who are verified, trained and approved by our team can appear here."
	},
	{
		title: "Check her availability",
		body: "Each Care Partner publishes the dates and time windows she is free."
	},
	{
		title: "Choose date, start time and duration",
		body: "Duration is in hours. Your Care Partner is yours for that whole block."
	},
	{
		title: "Add address and instructions",
		body: "Tell her where to come and anything useful — allergies, building access, what you'd like help with."
	},
	{
		title: "Review the total",
		body: "Hourly rate × hours. The full amount is shown before you confirm anything."
	},
	{
		title: "Accept the terms and confirm",
		body: "You confirm you have read our Terms, Safety Rules and Cancellation Policy. This acceptance is stored with the booking."
	},
	{
		title: "She accepts, and the day arrives",
		body: "Track the booking through pending, accepted, confirmed, in progress and completed."
	},
	{
		title: "Review her afterwards",
		body: "Once a booking is completed, you can leave a rating and comment."
	}
];
var partnerSteps = [
	{
		title: "Apply",
		body: "Submit your application with your bio, experience, service area and languages."
	},
	{
		title: "Verification",
		body: "Our team reviews your identity and background documents."
	},
	{
		title: "Training",
		body: "Complete Sakhi's safety, conduct and boundaries training."
	},
	{
		title: "Approval",
		body: "Once approved, you become visible to customers and can receive bookings."
	},
	{
		title: "Set availability",
		body: "Publish the dates and hours you are free. You are never auto-assigned outside them."
	},
	{
		title: "Accept or decline",
		body: "Every request is yours to accept or reject. Completed bookings roll into your earnings."
	}
];
function HowItWorks() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "How it works",
			title: "You book time, not tasks.",
			description: "A Sakhi booking is one trained Care Partner for a set number of hours. Within those hours she can help with any reasonable, safe, non-medical task — and you can change what you need as the time goes on."
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			muted: true,
			className: "pt-0 sm:pt-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "For customers"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 space-y-4",
				children: customerSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface-card flex gap-5 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-primary",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: step.body
					})] })]
				}, step.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-2xl",
				children: "For Care Partners"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-8 grid gap-4 md:grid-cols-2",
				children: partnerSteps.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface-card flex gap-5 p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-primary",
						children: String(i + 1).padStart(2, "0")
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-base font-semibold",
						children: step.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: step.body
					})] })]
				}, step.title))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 flex flex-wrap gap-3",
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
			})
		] })
	] });
}
//#endregion
export { HowItWorks as component };
