import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pricing-C34GsZQc.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminPricingPage() {
	const queryClient = useQueryClient();
	const [rate, setRate] = (0, import_react.useState)("");
	const [minHours, setMinHours] = (0, import_react.useState)("");
	const [maxHours, setMaxHours] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: settings, isLoading, error } = useQuery({
		queryKey: ["platform-settings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("platform_settings").select("id, default_hourly_rate, currency, min_duration_hours, max_duration_hours").eq("id", 1).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (!settings) return;
		setRate(String(settings.default_hourly_rate));
		setMinHours(String(settings.min_duration_hours));
		setMaxHours(String(settings.max_duration_hours));
	}, [settings]);
	async function saveSettings(event) {
		event.preventDefault();
		const hourlyRate = Number(rate);
		const minimum = Number(minHours);
		const maximum = Number(maxHours);
		if (!Number.isFinite(hourlyRate) || hourlyRate <= 0) {
			toast.error("Hourly rate must be greater than 0.");
			return;
		}
		if (!Number.isInteger(minimum) || minimum <= 0) {
			toast.error("Minimum duration must be a positive whole number.");
			return;
		}
		if (!Number.isInteger(maximum) || maximum <= 0) {
			toast.error("Maximum duration must be a positive whole number.");
			return;
		}
		if (maximum < minimum) {
			toast.error("Maximum duration cannot be smaller than minimum duration.");
			return;
		}
		setSaving(true);
		const { error } = await supabase.from("platform_settings").upsert({
			id: 1,
			default_hourly_rate: hourlyRate,
			min_duration_hours: minimum,
			max_duration_hours: maximum
		}, { onConflict: "id" });
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["platform-settings"] });
		toast.success("Pricing settings saved.");
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Pricing",
		description: "Manage Sakhi's default booking pricing.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading pricing settings..."
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Pricing",
		description: "Manage Sakhi's default booking pricing.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load pricing settings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Pricing",
		description: "Manage Sakhi's default booking pricing.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-[1fr_360px]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: saveSettings,
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-xl font-medium",
						children: "Booking pricing"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "These settings control the platform defaults used for new Care Partners and booking duration limits."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "hourly-rate",
										children: "Default hourly rate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "flex h-10 items-center rounded-l-md border border-r-0 border-input bg-muted px-3 text-sm",
											children: "₹"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "hourly-rate",
											type: "number",
											min: "1",
											step: "0.01",
											value: rate,
											onChange: (event) => setRate(event.target.value),
											className: "rounded-l-none",
											required: true
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Current default:",
											" ",
											settings ? formatCurrency(Number(settings.default_hourly_rate)) : "—",
											"/hour"
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "min-hours",
										children: "Minimum booking hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "min-hours",
										type: "number",
										min: "1",
										step: "1",
										value: minHours,
										onChange: (event) => setMinHours(event.target.value),
										required: true
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "max-hours",
										children: "Maximum booking hours"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "max-hours",
										type: "number",
										min: "1",
										step: "1",
										value: maxHours,
										onChange: (event) => setMaxHours(event.target.value),
										required: true
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "submit",
								disabled: saving,
								children: saving ? "Saving..." : "Save pricing settings"
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "surface-card h-fit p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Current settings"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-5 space-y-4 text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Default rate"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: [settings ? formatCurrency(Number(settings.default_hourly_rate)) : "—", "/hr"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Currency"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "font-medium",
									children: settings?.currency ?? "INR"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Minimum duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: [settings?.min_duration_hours ?? "—", " hr"]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-muted-foreground",
									children: "Maximum duration"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
									className: "font-medium",
									children: [settings?.max_duration_hours ?? "—", " hr"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 rounded-lg bg-sand p-4 text-xs text-muted-foreground",
						children: "Individual Care Partner hourly rates can still be stored separately in the Care Partner profile."
					})
				]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPricingPage, {})
});
//#endregion
export { SplitComponent as component };
