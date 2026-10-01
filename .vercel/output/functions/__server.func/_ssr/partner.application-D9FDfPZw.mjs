import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
import { t as Textarea } from "./textarea-DWvAtFt2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner.application-D9FDfPZw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedPartnerApplication() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [bio, setBio] = (0, import_react.useState)("");
	const [experience, setExperience] = (0, import_react.useState)("0");
	const [languages, setLanguages] = (0, import_react.useState)("");
	const [serviceArea, setServiceArea] = (0, import_react.useState)("");
	const [hourlyRate, setHourlyRate] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: partner, isLoading, error } = useQuery({
		queryKey: [
			"partner",
			"application",
			user?.id
		],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select(`
            id,
            profile_id,
            bio,
            experience_years,
            languages,
            service_area,
            hourly_rate,
            approval_status,
            verification_status,
            training_status,
            admin_notes,
            created_at,
            updated_at
          `).eq("profile_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
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
	(0, import_react.useEffect)(() => {
		if (!partner) return;
		setBio(partner.bio ?? "");
		setExperience(String(partner.experience_years ?? 0));
		setLanguages(partner.languages ?? "");
		setServiceArea(partner.service_area ?? "");
		setHourlyRate(partner.hourly_rate !== null && partner.hourly_rate !== void 0 ? String(partner.hourly_rate) : "");
	}, [partner]);
	async function submitApplication() {
		if (!partner || !user) return;
		if (bio.trim().length < 10) {
			toast.error("Please add a little more information about yourself.");
			return;
		}
		if (!serviceArea.trim()) {
			toast.error("Please enter your service area.");
			return;
		}
		const experienceYears = Number(experience);
		if (!Number.isFinite(experienceYears) || experienceYears < 0 || experienceYears > 50) {
			toast.error("Please enter a valid experience value.");
			return;
		}
		let requestedHourlyRate = null;
		if (hourlyRate.trim() !== "") {
			const parsedRate = Number(hourlyRate);
			if (!Number.isFinite(parsedRate) || parsedRate <= 0 || parsedRate > 1e4) {
				toast.error("Please enter a valid hourly rate, or leave it blank to use the default rate.");
				return;
			}
			requestedHourlyRate = parsedRate;
		}
		setSaving(true);
		const { error } = await supabase.from("care_partners").update({
			bio: bio.trim(),
			experience_years: experienceYears,
			languages: languages.trim() || "Hindi, English",
			service_area: serviceArea.trim(),
			hourly_rate: requestedHourlyRate,
			approval_status: "pending"
		}).eq("id", partner.id).eq("profile_id", user.id);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: [
			"partner",
			"application",
			user.id
		] });
		toast.success("Application submitted for review.");
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Application",
		description: "Your onboarding application status.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading your application..."
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Application",
		description: "Your onboarding application status.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load your application"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong while loading your application."
			})]
		})
	});
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Application",
		description: "Your onboarding application status.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Application not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "Your Care Partner profile has not been created yet."
			})]
		})
	});
	const effectiveRate = partner.hourly_rate !== null && partner.hourly_rate !== void 0 ? Number(partner.hourly_rate) : defaultRate;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		eyebrow: "Care Partner",
		title: "Your Application",
		description: "Complete your profile and track your onboarding status.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.approval_status }),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-6 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Application status"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 space-y-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
								label: "Application",
								status: partner.approval_status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
								label: "Identity verification",
								status: partner.verification_status
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusRow, {
								label: "Training",
								status: partner.training_status
							})
						]
					}),
					partner.admin_notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 rounded-xl bg-sand p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Message from Sakhi Admin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: partner.admin_notes
						})]
					}) : null
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Your application"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Keep your information accurate. An admin will review your application before you can receive bookings."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "bio",
									children: "About you"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "bio",
									rows: 5,
									maxLength: 1e3,
									value: bio,
									onChange: (event) => setBio(event.target.value),
									placeholder: "Tell customers and Sakhi a little about yourself."
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "experience",
									children: "Experience (years)"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "experience",
									type: "number",
									min: 0,
									max: 50,
									step: 1,
									value: experience,
									onChange: (event) => setExperience(event.target.value),
									className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "languages",
									children: "Languages"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "languages",
									value: languages,
									onChange: (event) => setLanguages(event.target.value),
									placeholder: "Hindi, English",
									className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "service-area",
									children: "Service area"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "service-area",
									value: serviceArea,
									onChange: (event) => setServiceArea(event.target.value),
									placeholder: "Area / locality / city",
									className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, {
										htmlFor: "hourly-rate",
										children: ["Your hourly rate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "ml-2 text-xs font-normal text-muted-foreground",
											children: "Optional"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "hourly-rate",
										type: "number",
										min: 1,
										max: 1e4,
										step: 1,
										value: hourlyRate,
										onChange: (event) => setHourlyRate(event.target.value),
										placeholder: `Leave blank to use ${formatCurrency(defaultRate)}/hour`,
										className: "h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											"Sakhi's default rate is",
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [formatCurrency(defaultRate), "/hour"] }),
											". You may leave this blank and use the default rate, or enter the hourly rate you would like to request."
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-lg bg-sand p-4 text-sm",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted-foreground",
										children: "Current effective hourly rate"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-medium",
										children: [formatCurrency(effectiveRate), "/hour"]
									}),
									partner.hourly_rate === null || partner.hourly_rate === void 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "You are currently using Sakhi's default rate."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-xs text-muted-foreground",
										children: "This is your requested custom rate and may be reviewed by Sakhi Admin."
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								className: "w-full",
								onClick: submitApplication,
								disabled: saving,
								children: saving ? "Submitting..." : partner.approval_status === "approved" ? "Update application" : "Submit application"
							})
						]
					})
				]
			})]
		})
	});
}
function StatusRow({ label, status }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-sm text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status })]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["care_partner"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedPartnerApplication, {})
});
//#endregion
export { SplitComponent as component };
