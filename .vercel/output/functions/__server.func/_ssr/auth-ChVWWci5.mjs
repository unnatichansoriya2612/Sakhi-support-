import { r as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { _ as useSearch, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as Circle } from "../_libs/lucide-react.mjs";
import { a as stringType, i as objectType, t as enumType } from "../_libs/zod.mjs";
import { a as Button, c as useAuth, o as cn, s as homeForRole } from "./router-0JUlUF2v.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
import { n as RadioGroupIndicator, r as RadioGroupItem$1, t as RadioGroup$1 } from "../_libs/@radix-ui/react-radio-group+[...].mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-ChVWWci5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var RadioGroup = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroup$1, {
		className: cn("grid gap-2", className),
		...props,
		ref
	});
});
RadioGroup.displayName = RadioGroup$1.displayName;
var RadioGroupItem = import_react.forwardRef(({ className, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem$1, {
		ref,
		className: cn("aspect-square h-4 w-4 rounded-full border border-primary text-primary shadow cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupIndicator, {
			className: "flex items-center justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-3.5 w-3.5 fill-primary" })
		})
	});
});
RadioGroupItem.displayName = RadioGroupItem$1.displayName;
var signupSchema = objectType({
	full_name: stringType().trim().min(2, "Please enter your full name").max(100),
	email: stringType().trim().email("Enter a valid email address").max(255),
	phone: stringType().trim().min(7, "Enter a valid phone number").max(20).regex(/^[0-9+\-\s()]+$/, "Phone can only contain digits and + - ( )"),
	password: stringType().min(8, "Password must be at least 8 characters").max(72),
	role: enumType(["customer", "care_partner"])
});
var loginSchema = objectType({
	email: stringType().trim().email("Enter a valid email address"),
	password: stringType().min(1, "Enter your password")
});
function AuthPage() {
	const search = useSearch({ from: "/auth" });
	const navigate = useNavigate();
	const { user, role, loading } = useAuth();
	const [tab, setTab] = (0, import_react.useState)(search.mode ?? "login");
	(0, import_react.useEffect)(() => {
		if (!loading && user && role) navigate({
			to: search.redirect ?? homeForRole(role),
			replace: true
		});
	}, [
		loading,
		user,
		role,
		navigate,
		search.redirect
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "container-page flex justify-center py-16",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "w-full max-w-md",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-4xl text-primary",
							children: "सखी"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 text-2xl",
							children: "Welcome to Sakhi"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "When you're away from home, you still deserve to be cared for."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card mt-8 p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						value: tab,
						onValueChange: (v) => setTab(v),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "login",
									children: "Log in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Sign up"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "login",
								className: "pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginForm, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								className: "pt-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignupForm, { onDone: () => setTab("login") })
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: [
						"By continuing you agree to our",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/terms",
							className: "underline",
							children: "Terms"
						}),
						",",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/safety",
							className: "underline",
							children: "Safety Rules"
						}),
						" ",
						"and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/privacy",
							className: "underline",
							children: "Privacy Policy"
						}),
						"."
					]
				})
			]
		})
	});
}
function LoginForm() {
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [forgot, setForgot] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		const parsed = loginSchema.safeParse({
			email,
			password
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Check your details");
			return;
		}
		setBusy(true);
		const { error } = await supabase.auth.signInWithPassword(parsed.data);
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		toast.success("Welcome back");
	}
	async function sendReset() {
		const parsed = stringType().email().safeParse(email.trim());
		if (!parsed.success) {
			toast.error("Enter your email address first");
			return;
		}
		setBusy(true);
		const { error } = await supabase.auth.resetPasswordForEmail(parsed.data, { redirectTo: `${window.location.origin}/reset-password` });
		setBusy(false);
		if (error) toast.error(error.message);
		else toast.success("Password reset link sent. Check your email.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "login-email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "login-email",
					type: "email",
					autoComplete: "email",
					value: email,
					onChange: (e) => setEmail(e.target.value),
					required: true
				})]
			}),
			!forgot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "login-password",
					children: "Password"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "login-password",
					type: "password",
					autoComplete: "current-password",
					value: password,
					onChange: (e) => setPassword(e.target.value),
					required: true
				})]
			}) : null,
			forgot ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					className: "w-full",
					disabled: busy,
					onClick: sendReset,
					children: "Send reset link"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "ghost",
					className: "w-full",
					onClick: () => setForgot(false),
					children: "Back to log in"
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					className: "w-full",
					disabled: busy,
					children: busy ? "Signing in..." : "Log in"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "w-full text-center text-xs text-muted-foreground underline",
					onClick: () => setForgot(true),
					children: "Forgot your password?"
				})]
			})
		]
	});
}
function SignupForm({ onDone }) {
	const [form, setForm] = (0, import_react.useState)({
		full_name: "",
		email: "",
		phone: "",
		password: "",
		role: "customer"
	});
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [sent, setSent] = (0, import_react.useState)(false);
	function set(key, value) {
		setForm((prev) => ({
			...prev,
			[key]: value
		}));
	}
	async function onSubmit(e) {
		e.preventDefault();
		const parsed = signupSchema.safeParse(form);
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Check your details");
			return;
		}
		setBusy(true);
		const { data, error } = await supabase.auth.signUp({
			email: parsed.data.email,
			password: parsed.data.password,
			options: {
				emailRedirectTo: window.location.origin,
				data: {
					full_name: parsed.data.full_name,
					phone: parsed.data.phone,
					role: parsed.data.role
				}
			}
		});
		setBusy(false);
		if (error) {
			toast.error(error.message);
			return;
		}
		if (!data.session) {
			setSent(true);
			toast.success("Account created. Check your email to confirm it.");
			onDone();
			return;
		}
		toast.success("Account created");
	}
	if (sent) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-3 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
			className: "text-lg",
			children: "Check your email"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "text-sm text-muted-foreground",
			children: [
				"We sent a confirmation link to ",
				form.email,
				". Click it, then log in."
			]
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		onSubmit,
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "su-name",
					children: "Full name"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "su-name",
					value: form.full_name,
					onChange: (e) => set("full_name", e.target.value),
					maxLength: 100,
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "su-email",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "su-email",
					type: "email",
					autoComplete: "email",
					value: form.email,
					onChange: (e) => set("email", e.target.value),
					maxLength: 255,
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: "su-phone",
					children: "Phone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					id: "su-phone",
					type: "tel",
					autoComplete: "tel",
					value: form.phone,
					onChange: (e) => set("phone", e.target.value),
					maxLength: 20,
					required: true
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
						htmlFor: "su-password",
						children: "Password"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "su-password",
						type: "password",
						autoComplete: "new-password",
						value: form.password,
						onChange: (e) => set("password", e.target.value),
						minLength: 8,
						required: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "At least 8 characters."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Account type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
					value: form.role,
					onValueChange: (v) => set("role", v),
					className: "grid grid-cols-1 gap-2 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: "customer",
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Customer"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-xs text-muted-foreground",
							children: "I want to book care"
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex cursor-pointer items-start gap-3 rounded-lg border border-border p-3 text-sm has-[:checked]:border-primary has-[:checked]:bg-primary/5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
							value: "care_partner",
							className: "mt-0.5"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-semibold",
							children: "Care Partner"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 block text-xs text-muted-foreground",
							children: "I want to give care"
						})] })]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				disabled: busy,
				children: busy ? "Creating account..." : "Create account"
			})
		]
	});
}
//#endregion
export { AuthPage as component };
