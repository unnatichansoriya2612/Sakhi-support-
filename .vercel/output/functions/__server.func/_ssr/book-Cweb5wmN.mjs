import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { g as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { m as Check } from "../_libs/lucide-react.mjs";
import { a as stringType, i as objectType, n as literalType, r as numberType } from "../_libs/zod.mjs";
import { a as Button, c as useAuth, i as Route$24, o as cn } from "./router-0JUlUF2v.mjs";
import { i as customerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, o as todayISO, r as formatDate, t as addHoursToTime } from "./format-C7GCbIxL.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
import { t as Textarea } from "./textarea-DWvAtFt2.mjs";
import { n as CheckboxIndicator, t as Checkbox$1 } from "../_libs/@radix-ui/react-checkbox+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/book-Cweb5wmN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Checkbox = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox$1, {
	ref,
	className: cn("grid place-content-center peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground", className),
	...props,
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckboxIndicator, {
		className: cn("grid place-content-center text-current"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" })
	})
}));
Checkbox.displayName = Checkbox$1.displayName;
var bookingSchema = objectType({
	partnerId: stringType().uuid({ message: "Please choose a Care Partner." }),
	date: stringType().min(1, "Please choose a date."),
	startTime: stringType().min(1, "Please choose a start time."),
	duration: numberType().min(1, "Minimum booking is 1 hour.").max(12, "Maximum booking is 12 hours."),
	address: stringType().trim().min(10, "Please enter a full address.").max(500),
	instructions: stringType().trim().max(1e3).optional(),
	terms: literalType(true, { message: "Please accept the terms and the non-medical policy." })
});
function BookPage() {
	const { partner: partnerParam } = Route$24.useSearch();
	const { user } = useAuth();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [partnerId, setPartnerId] = (0, import_react.useState)(partnerParam ?? "");
	const [date, setDate] = (0, import_react.useState)(todayISO());
	const [startTime, setStartTime] = (0, import_react.useState)("10:00");
	const [duration, setDuration] = (0, import_react.useState)(2);
	const [address, setAddress] = (0, import_react.useState)("");
	const [instructions, setInstructions] = (0, import_react.useState)("");
	const [terms, setTerms] = (0, import_react.useState)(false);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const { data: partners, isLoading: partnersLoading } = useQuery({
		queryKey: ["care-partners", "approved"],
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("id, hourly_rate, service_area, profiles!care_partners_profile_id_fkey(full_name)").eq("approval_status", "approved");
			if (error) throw error;
			return data ?? [];
		}
	});
	const { data: settings } = useQuery({
		queryKey: ["platform-settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("platform_settings").select("default_hourly_rate").eq("id", 1).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const defaultRate = Number(settings?.default_hourly_rate ?? 250);
	const selected = (partners ?? []).find((p) => p.id === partnerId);
	const rate = selected?.hourly_rate !== null && selected?.hourly_rate !== void 0 ? Number(selected.hourly_rate) : defaultRate;
	const endTime = addHoursToTime(startTime, duration);
	const total = rate * duration;
	const { data: slots } = useQuery({
		queryKey: [
			"availability",
			partnerId,
			date
		],
		enabled: Boolean(partnerId && date),
		queryFn: async () => {
			const { data, error } = await supabase.from("availability").select("*").eq("care_partner_id", partnerId).eq("date", date).eq("is_available", true).order("start_time");
			if (error) throw error;
			return data ?? [];
		}
	});
	async function handleSubmit(event) {
		event.preventDefault();
		const parsed = bookingSchema.safeParse({
			partnerId,
			date,
			startTime,
			duration: Number(duration),
			address,
			instructions,
			terms
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Please check the form.");
			return;
		}
		if (date < todayISO()) {
			toast.error("Please pick today or a future date.");
			return;
		}
		if (!selected) {
			toast.error("Please choose a Care Partner.");
			return;
		}
		if (!Number.isFinite(rate) || rate <= 0) {
			toast.error("The Care Partner's hourly rate is not available. Please try again later.");
			return;
		}
		if (!user) {
			toast.error("Please sign in before booking.");
			return;
		}
		setSubmitting(true);
		const { data, error } = await supabase.from("bookings").insert({
			customer_id: user.id,
			care_partner_id: partnerId,
			date,
			start_time: startTime,
			end_time: endTime,
			duration_hours: duration,
			hourly_rate: rate,
			total_amount: total,
			address: address.trim(),
			instructions: instructions.trim() || null,
			terms_accepted: true
		}).select("id").single();
		setSubmitting(false);
		if (error) {
			if (error.message.includes("bookings_no_double_booking") || error.code === "23P01") {
				toast.error("This Care Partner is already booked for that time. Please choose another slot.");
				return;
			}
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["bookings"] });
		toast.success("Booking request sent. Your Care Partner will confirm shortly.");
		navigate({
			to: "/bookings/$id",
			params: { id: data.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		eyebrow: "Customer",
		title: "Book a Care Partner",
		description: "You are booking her time, not a list of chores. Anything reasonable and non-medical during those hours is included.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit: handleSubmit,
			className: "grid gap-8 lg:grid-cols-[2fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "partner",
								children: "Care Partner"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "partner",
								value: partnerId,
								onChange: (e) => setPartnerId(e.target.value),
								disabled: partnersLoading,
								className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: partnersLoading ? "Loading Care Partners..." : "Select a Care Partner"
								}), (partners ?? []).map((p) => {
									const partnerRate = p.hourly_rate !== null && p.hourly_rate !== void 0 ? Number(p.hourly_rate) : defaultRate;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: p.id,
										children: [
											p.profiles?.full_name ?? "Care Partner",
											" ",
											"—",
											" ",
											formatCurrency(partnerRate),
											"/hr",
											p.service_area ? ` · ${p.service_area}` : ""
										]
									}, p.id);
								})]
							}),
							selected?.hourly_rate === null || selected?.hourly_rate === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted-foreground",
								children: [
									"This Care Partner is using Sakhi's default rate of",
									" ",
									formatCurrency(defaultRate),
									"/hour."
								]
							}) : null
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "date",
									children: "Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "date",
									type: "date",
									min: todayISO(),
									value: date,
									onChange: (e) => setDate(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "start",
									children: "Start time"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "start",
									type: "time",
									value: startTime,
									onChange: (e) => setStartTime(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "duration",
									children: "Hours"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "duration",
									type: "number",
									min: 1,
									max: 12,
									step: .5,
									value: duration,
									onChange: (e) => setDuration(Number(e.target.value))
								})]
							})
						]
					}),
					partnerId ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-sand p-4 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								"Her published availability on",
								" ",
								formatDate(date)
							]
						}), (slots ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-muted-foreground",
							children: "Nothing published for this date. You can still request this time — she'll accept or decline."
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 flex flex-wrap gap-2",
							children: (slots ?? []).map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setStartTime(slot.start_time.slice(0, 5)),
								className: "rounded-full border border-border bg-card px-3 py-1 text-xs hover:bg-muted",
								children: [
									formatTime(slot.start_time),
									" ",
									"–",
									" ",
									formatTime(slot.end_time)
								]
							}) }, slot.id))
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "address",
							children: "Address for the visit"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "address",
							rows: 3,
							maxLength: 500,
							value: address,
							onChange: (e) => setAddress(e.target.value),
							placeholder: "Flat / house number, street, landmark, city, pincode"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
							htmlFor: "instructions",
							children: [
								"What would help most?",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-xs text-muted-foreground",
									children: "(optional)"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							id: "instructions",
							rows: 4,
							maxLength: 1e3,
							value: instructions,
							onChange: (e) => setInstructions(e.target.value),
							placeholder: "E.g. cook dinner for two, sit with my mother, help sort the kitchen."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-start gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
							checked: terms,
							onCheckedChange: (v) => setTerms(v === true),
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted-foreground",
							children: "I accept the Terms of Service and understand Sakhi Care Partners provide non-medical support only — no injections, medication decisions, wound care or clinical procedures."
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "lg:sticky lg:top-24 lg:self-start",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg",
							children: "Booking summary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Date"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: formatDate(date) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [
										formatTime(startTime),
										" –",
										" ",
										formatTime(endTime)
									] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Duration"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", { children: [duration, " hours"] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted-foreground",
										children: "Hourly rate"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: selected ? formatCurrency(rate) : "—" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-baseline justify-between border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm text-muted-foreground",
								children: "Total"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-2xl",
								children: selected ? formatCurrency(total) : "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							className: "mt-5 w-full",
							disabled: submitting || !selected,
							children: submitting ? "Sending request..." : "Request booking"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: "Payment is settled directly with your Care Partner. Sakhi does not process payments in this MVP."
						})
					]
				})
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["customer"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookPage, {})
});
//#endregion
export { SplitComponent as component };
