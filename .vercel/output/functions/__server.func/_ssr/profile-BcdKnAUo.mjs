import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { i as customerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BcdKnAUo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PageAuthenticatedProfile() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const [fullName, setFullName] = (0, import_react.useState)("");
	const [phone, setPhone] = (0, import_react.useState)("");
	const [city, setCity] = (0, import_react.useState)("");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data: profile, isLoading } = useQuery({
		queryKey: ["profile", user?.id],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			const { data, error } = await supabase.from("profiles").select("id, full_name, email, phone, city, role").eq("id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (!profile) return;
		setFullName(profile.full_name ?? "");
		setPhone(profile.phone ?? "");
		setCity(profile.city ?? "");
	}, [profile]);
	async function handleSave(event) {
		event.preventDefault();
		if (!user?.id) {
			toast.error("You must be logged in.");
			return;
		}
		if (!fullName.trim()) {
			toast.error("Please enter your full name.");
			return;
		}
		setSaving(true);
		const { error } = await supabase.from("profiles").update({
			full_name: fullName.trim(),
			phone: phone.trim() || null,
			city: city.trim() || null
		}).eq("id", user.id);
		setSaving(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: ["profile", user.id] });
		toast.success("Profile updated successfully.");
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		title: "Profile",
		description: "Your Sakhi account details.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "surface-card p-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Loading your profile..."
			})
		})
	});
	if (!profile) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		title: "Profile",
		description: "Your Sakhi account details.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Profile not found"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "We couldn't find your Sakhi profile. Please sign out and sign in again, or contact support."
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: customerNav,
		eyebrow: "Account",
		title: "Profile",
		description: "Manage your Sakhi account details.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "max-w-2xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: handleSave,
				className: "surface-card space-y-6 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Personal information"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Keep your contact information up to date."
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "full-name",
							children: "Full name"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "full-name",
							value: fullName,
							onChange: (event) => setFullName(event.target.value),
							placeholder: "Enter your full name",
							maxLength: 100
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: "email",
								children: "Email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "email",
								value: profile.email ?? user?.email ?? "",
								disabled: true,
								className: "bg-muted"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: "Your login email cannot be changed from this page."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "phone",
							children: "Phone number"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "phone",
							type: "tel",
							value: phone,
							onChange: (event) => setPhone(event.target.value),
							placeholder: "Enter your phone number",
							maxLength: 20
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "city",
							children: "City"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "city",
							value: city,
							onChange: (event) => setCity(event.target.value),
							placeholder: "Enter your city",
							maxLength: 100
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "rounded-lg bg-sand p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted-foreground",
								children: ["Account type:", " "]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-medium capitalize",
								children: profile.role.replace("_", " ")
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							disabled: saving,
							children: saving ? "Saving..." : "Save changes"
						})
					})
				]
			})
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: [
		"customer",
		"care_partner",
		"admin"
	],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedProfile, {})
});
//#endregion
export { SplitComponent as component };
