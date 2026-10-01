import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner.availability-QgN3CMif.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedPartnerAvailability() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [date, setDate] = (0, import_react.useState)("");
	const [startTime, setStartTime] = (0, import_react.useState)("10:00");
	const [endTime, setEndTime] = (0, import_react.useState)("18:00");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: partner, isLoading: partnerLoading } = useQuery({
		queryKey: ["my-care-partner", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("id, approval_status").eq("profile_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: availability, isLoading } = useQuery({
		queryKey: ["my-availability", partner?.id],
		enabled: Boolean(partner?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("availability").select("*").eq("care_partner_id", partner.id).order("date", { ascending: true }).order("start_time", { ascending: true });
			if (error) throw error;
			return data ?? [];
		}
	});
	async function addAvailability(event) {
		event.preventDefault();
		if (!partner) {
			toast.error("Care Partner profile not found.");
			return;
		}
		if (!date) {
			toast.error("Please select a date.");
			return;
		}
		if (date < (/* @__PURE__ */ new Date()).toISOString().slice(0, 10)) {
			toast.error("Please choose today or a future date.");
			return;
		}
		if (endTime <= startTime) {
			toast.error("End time must be later than start time.");
			return;
		}
		setSaving(true);
		const { error } = await supabase.from("availability").insert({
			care_partner_id: partner.id,
			date,
			start_time: startTime,
			end_time: endTime,
			is_available: true
		});
		setSaving(false);
		if (error) {
			if (error.code === "23505") toast.error("This availability slot already exists.");
			else toast.error(error.message);
			return;
		}
		toast.success("Availability published.");
		setDate("");
		setStartTime("10:00");
		setEndTime("18:00");
		await queryClient.invalidateQueries({ queryKey: ["my-availability", partner.id] });
	}
	async function removeAvailability(id) {
		const { error } = await supabase.from("availability").delete().eq("id", id);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Availability removed.");
		await queryClient.invalidateQueries({ queryKey: ["my-availability", partner?.id] });
	}
	if (partnerLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Availability",
		description: "Publish the hours you can work.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading your Care Partner profile..."
		})
	});
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Availability",
		description: "Publish the hours you can work.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Care Partner profile not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your Care Partner profile has not been created yet. Please complete your application first."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		eyebrow: "Care Partner",
		title: "Availability",
		description: "Publish the hours you can work.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1fr_1.5fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Add availability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Customers will be able to see these hours when requesting a booking."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: addAvailability,
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "date",
									children: "Date"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "date",
									type: "date",
									min: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
									value: date,
									onChange: (e) => setDate(e.target.value)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "start-time",
										children: "Start time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "start-time",
										type: "time",
										value: startTime,
										onChange: (e) => setStartTime(e.target.value)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "end-time",
										children: "End time"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "end-time",
										type: "time",
										value: endTime,
										onChange: (e) => setEndTime(e.target.value)
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								className: "w-full",
								disabled: saving,
								children: saving ? "Publishing..." : "Publish availability"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "My availability"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Your currently published working hours."
					}),
					isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-sm text-muted-foreground",
						children: "Loading availability..."
					}) : (availability ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl border border-dashed border-border p-8 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: "No availability added yet"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Add your first available date and time using the form."
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 space-y-3",
						children: (availability ?? []).map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: formatDate(slot.date)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted-foreground",
								children: [
									formatTime(slot.start_time),
									" –",
									" ",
									formatTime(slot.end_time)
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								onClick: () => removeAvailability(slot.id),
								children: "Remove"
							})]
						}, slot.id))
					})
				]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["care_partner"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedPartnerAvailability, {})
});
//#endregion
export { SplitComponent as component };
