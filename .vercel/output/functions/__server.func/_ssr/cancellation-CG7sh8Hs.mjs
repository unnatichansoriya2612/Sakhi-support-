import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { n as LegalPage, r as LegalSection, t as LegalList } from "./LegalPage-r32vwSnW.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cancellation-CG7sh8Hs.js
var import_jsx_runtime = require_jsx_runtime();
function Cancellation() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalPage, {
		title: "Cancellation & Refund Policy",
		intro: "Plans change. This policy explains what happens when a booking is cancelled by either side.",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
				heading: "1. When a customer can cancel",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"You can cancel while a booking is still ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "pending" }),
					", ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "accepted" }),
					" ",
					"or ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "confirmed" }),
					". Once a booking is ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "in progress" }),
					" or",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "completed" }),
					", it can no longer be cancelled from the app."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LegalSection, {
				heading: "2. Cancellation charges",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalList, { items: [
					"More than 12 hours before the start time: no charge, full refund.",
					"Between 2 and 12 hours before the start time: 25% of the booking total.",
					"Less than 2 hours before the start time: 50% of the booking total.",
					"No-show at the address: 100% of the booking total."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A cancellation charge respects the Care Partner's blocked time — she has already turned down other bookings for those hours." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
				heading: "3. If the Care Partner cancels or rejects",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If a Care Partner rejects a request or cancels a confirmed booking, you are not charged and any amount already paid is refunded in full. The time slot is released immediately so you can book someone else." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
				heading: "4. Ending a booking early",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalList, { items: [
					"If you end the booking early by choice, the full booked time is chargeable.",
					"If the Care Partner leaves early for a safety reason, only the time actually worked is charged.",
					"If a Care Partner refuses a prohibited request and the customer ends the booking, the full booked time remains chargeable."
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
				heading: "5. Refund timelines",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Approved refunds are issued to the original payment method. Depending on your bank, refunds usually appear within 5-7 working days." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
				heading: "6. Disputes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "If you believe a charge is wrong, raise a complaint from the booking's detail page. The Sakhi admin team will review the booking history, reviews and both accounts before deciding." })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LegalSection, {
				heading: "7. Safety overrides everything",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Any booking involving a prohibited request, harassment or an unsafe environment is cancelled immediately, with account action against the party at fault. Safety decisions are not subject to the standard refund grid." })
			})
		]
	});
}
//#endregion
export { Cancellation as component };
