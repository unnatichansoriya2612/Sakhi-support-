import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-IjtAajii.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/faq-B1PodieR.js
var import_jsx_runtime = require_jsx_runtime();
var groups = [
	{
		title: "Bookings & pricing",
		items: [
			["What exactly am I booking?", "One trained female Care Partner for a block of time. Within those hours she can help with any reasonable, safe, non-medical task."],
			["How is the price calculated?", "Hourly rate × number of hours = total. You see the total before confirming. There is never a separate charge per task."],
			["Can I book more than one Care Partner?", "Each booking is one Care Partner for one time block. You can make separate bookings if you genuinely need more help."],
			["Can I change what I ask for during the booking?", "Yes. That is the point of time-based booking. Ask for tea instead of laundry — it is your time."],
			["What if the Care Partner is already booked?", "The system prevents double bookings. If a slot overlaps with an existing booking for that Care Partner, you will be asked to choose a different time."]
		]
	},
	{
		title: "Safety & boundaries",
		items: [
			["Is Sakhi medical care?", "No. Sakhi is strictly non-medical. No diagnosis, no medicines, no treatment, no procedures."],
			["What kind of massage is offered?", "Only a gentle, comfort-oriented hand or leg massage. Nothing therapeutic, clinical, full-body or intimate."],
			["Can a Care Partner refuse a task?", "Always. She can decline anything unsafe, illegal, intimate, medical or outside her training, without losing the booking."],
			["Are Care Partners verified?", "Yes. Identity verification and safety training must be completed and approved before she can receive any booking."],
			["How do I report a problem?", "Open the booking's detail page and raise a complaint. It goes directly to the Sakhi admin team."]
		]
	},
	{
		title: "Accounts & cancellations",
		items: [
			["Who can use Sakhi?", "Sakhi is a women-to-women platform. Both customers and Care Partners are women."],
			["Can I cancel a booking?", "Yes, while the booking is still pending, accepted or confirmed. See our Cancellation & Refund Policy for timing and charges."],
			["Can I become an admin?", "No. Admin access is never selectable at signup and cannot be self-assigned. It is granted directly in the database by the platform owner."],
			["When can I review a Care Partner?", "Once a booking is marked completed, you can leave one rating and comment for it."]
		]
	}
];
function Faq() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "FAQ",
			title: "Frequently asked questions"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-12 space-y-12",
			children: groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-xl",
				children: group.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				className: "mt-4",
				children: group.items.map(([q, a]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: q,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left",
						children: q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-muted-foreground",
						children: a
					})]
				}, q))
			})] }, group.title))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-12 flex flex-wrap gap-3",
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
					to: "/safety",
					children: "Safety & Trust"
				})
			})]
		})
	] });
}
//#endregion
export { Faq as component };
