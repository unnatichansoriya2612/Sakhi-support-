import { r as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime, m as Slot, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { A as redirect, c as HeadContent, d as Outlet, f as lazyRouteComponent, g as useNavigate, h as Link, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider, r as useQueryClient } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { _ as Bell, s as Menu, t as X } from "../_libs/lucide-react.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { a as stringType, i as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-0JUlUF2v.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
var AuthContext = (0, import_react.createContext)({
	session: null,
	user: null,
	profile: null,
	role: null,
	loading: true,
	refreshProfile: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [profile, setProfile] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	async function loadProfile(userId) {
		const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
		setProfile(data ?? null);
	}
	(0, import_react.useEffect)(() => {
		let active = true;
		const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			if (!active) return;
			setSession(nextSession);
			if (nextSession?.user) setTimeout(() => {
				loadProfile(nextSession.user.id);
			}, 0);
			else setProfile(null);
		});
		supabase.auth.getSession().then(async ({ data }) => {
			if (!active) return;
			setSession(data.session);
			if (data.session?.user) await loadProfile(data.session.user.id);
			setLoading(false);
		});
		return () => {
			active = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		session,
		user: session?.user ?? null,
		profile,
		role: profile?.role ?? null,
		loading,
		refreshProfile: async () => {
			if (session?.user) await loadProfile(session.user.id);
		}
	}), [
		session,
		profile,
		loading
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
function homeForRole(role) {
	if (role === "admin") return "/admin";
	if (role === "care_partner") return "/partner";
	return "/dashboard";
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var publicLinks = [
	{
		to: "/how-it-works",
		label: "How It Works"
	},
	{
		to: "/what-we-offer",
		label: "What We Offer"
	},
	{
		to: "/care-partners",
		label: "Care Partners"
	},
	{
		to: "/safety",
		label: "Safety & Trust"
	},
	{
		to: "/about",
		label: "About"
	},
	{
		to: "/faq",
		label: "FAQ"
	}
];
function Header() {
	const { user, profile, role } = useAuth();
	const [open, setOpen] = (0, import_react.useState)(false);
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	async function signOut() {
		await queryClient.cancelQueries();
		queryClient.clear();
		await supabase.auth.signOut();
		navigate({
			to: "/",
			replace: true
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page flex h-16 items-center justify-between gap-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl leading-none text-primary",
						children: "सखी"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tracking-[0.22em] text-muted-foreground",
						children: "SAKHI"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-6 lg:flex",
					children: publicLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: link.to,
						className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
						activeProps: { className: "text-sm text-foreground font-semibold" },
						children: link.label
					}, link.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "hidden items-center gap-2 lg:flex",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							size: "icon",
							"aria-label": "Notifications",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/notifications",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: homeForRole(role),
								children: profile?.full_name?.split(" ")[0] || "Dashboard"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							onClick: signOut,
							children: "Sign out"
						})
					] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "ghost",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Log in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							children: "Book Care"
						})
					})] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "lg:hidden",
					"aria-label": "Toggle menu",
					onClick: () => setOpen((v) => !v),
					children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border bg-background lg:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex flex-col gap-1 py-4",
				children: [publicLinks.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					onClick: () => setOpen(false),
					className: "rounded-md px-2 py-2 text-sm text-muted-foreground hover:bg-muted",
					children: link.label
				}, link.to)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-2",
					children: user ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: homeForRole(role),
							children: "Dashboard"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						onClick: signOut,
						children: "Sign out"
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Log in"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						onClick: () => setOpen(false),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							children: "Book Care"
						})
					})] })
				})]
			})
		}) : null]
	});
}
var columns = [
	{
		title: "Sakhi",
		links: [
			{
				to: "/about",
				label: "About"
			},
			{
				to: "/how-it-works",
				label: "How It Works"
			},
			{
				to: "/what-we-offer",
				label: "What We Offer"
			},
			{
				to: "/faq",
				label: "FAQ"
			}
		]
	},
	{
		title: "Care Partners",
		links: [
			{
				to: "/become-a-care-partner",
				label: "Become a Care Partner"
			},
			{
				to: "/care-partners",
				label: "Browse Care Partners"
			},
			{
				to: "/safety",
				label: "Safety & Trust"
			}
		]
	},
	{
		title: "Policies",
		links: [
			{
				to: "/terms",
				label: "Terms & Conditions"
			},
			{
				to: "/privacy",
				label: "Privacy Policy"
			},
			{
				to: "/cancellation",
				label: "Cancellation & Refund Policy"
			}
		]
	}
];
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "mt-24 border-t border-border bg-sand",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "container-page grid gap-10 py-14 md:grid-cols-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-baseline gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-2xl text-primary",
						children: "सखी"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-sm font-semibold tracking-[0.22em] text-muted-foreground",
						children: "SAKHI"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-xs text-sm text-muted-foreground",
					children: "When you're away from home, you still deserve to be cared for."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-xs text-muted-foreground",
					children: "Sakhi provides non-medical care and companionship only."
				})
			] }), columns.map((column) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "text-sm font-semibold",
				children: column.title
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-2",
				children: column.links.map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: link.to,
					className: "text-sm text-muted-foreground transition-colors hover:text-foreground",
					children: link.label
				}) }, link.to))
			})] }, column.title))]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border/70",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"© ",
					(/* @__PURE__ */ new Date()).getFullYear(),
					" Sakhi. All rights reserved."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Women-to-women care, built on trust." })]
			})
		})]
	});
}
var styles_default = "/assets/styles-b5hClSe8.css";
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	const stack = error instanceof Error ? error.stack : void 0;
	window.__lovableReportRuntimeError?.({
		message,
		...stack !== void 0 && { stack },
		filename: window.location.pathname
	});
}
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$38 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "Sakhi — Trusted Women-to-Women Care, By the Hour" },
			{
				name: "description",
				content: "Book a trained female Care Partner for the time you need. Non-medical help, comfort and companionship when you are away from home."
			},
			{
				name: "author",
				content: "Sakhi"
			},
			{
				property: "og:title",
				content: "Sakhi — Trusted Women-to-Women Care"
			},
			{
				property: "og:description",
				content: "Book one trained Care Partner for a block of time. Flexible, safe, non-medical support."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "twitter:site",
				content: "@Lovable"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Karla:wght@400;500;600;700&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$38.useRouteContext();
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		const { data: sub } = supabase.auth.onAuthStateChange((event) => {
			if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
			router.invalidate();
			if (event !== "SIGNED_OUT") queryClient.invalidateQueries();
		});
		return () => sub.subscription.unsubscribe();
	}, [router, queryClient]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex min-h-screen flex-col",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			richColors: true,
			position: "top-center"
		})] })
	});
}
var $$splitComponentImporter$37 = () => import("./routes-CtId2FIs.mjs");
var Route$37 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "Sakhi — Book a Trusted Care Partner by the Hour" },
		{
			name: "description",
			content: "Sakhi is a women-to-women care platform. Book one trained female Care Partner for the time you need — cooking, comfort, errands and companionship."
		},
		{
			property: "og:title",
			content: "Sakhi — Book a Trusted Care Partner by the Hour"
		},
		{
			property: "og:description",
			content: "One booking. One Care Partner. Flexible, safe, non-medical support for the time you need."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$37, "component")
});
var $$splitComponentImporter$36 = () => import("./route-Di7iQBCH.mjs");
var Route$36 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$36, "component")
});
var $$splitComponentImporter$35 = () => import("./about-USkplkYd.mjs");
var Route$35 = createFileRoute("/about")({
	head: () => ({ meta: [
		{ title: "About Sakhi — Women-to-Women Care" },
		{
			name: "description",
			content: "Sakhi exists so that women living away from home still have someone to turn to on the hard days. Learn about our mission, values and model."
		},
		{
			property: "og:title",
			content: "About Sakhi"
		},
		{
			property: "og:description",
			content: "Why we built a women-to-women, time-based care platform."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$35, "component")
});
var $$splitComponentImporter$34 = () => import("./auth-ChVWWci5.mjs");
var searchSchema$1 = objectType({
	mode: enumType(["login", "signup"]).optional(),
	redirect: stringType().optional()
});
var Route$34 = createFileRoute("/auth")({
	validateSearch: searchSchema$1,
	head: () => ({ meta: [
		{ title: "Log in or Sign up — Sakhi" },
		{
			name: "description",
			content: "Access your Sakhi account to book a Care Partner, manage bookings, or work as a Care Partner."
		},
		{
			property: "og:title",
			content: "Log in or Sign up — Sakhi"
		},
		{
			property: "og:description",
			content: "Sign in to Sakhi to book care or manage your Care Partner account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$34, "component")
});
var $$splitComponentImporter$33 = () => import("./become-a-care-partner-D1fCOVu_.mjs");
var Route$33 = createFileRoute("/become-a-care-partner")({
	head: () => ({ meta: [
		{ title: "Become a Care Partner — Sakhi" },
		{
			name: "description",
			content: "Join Sakhi as a trained Care Partner. Set your own availability, accept the bookings you want, and earn by the hour with training and support behind you."
		},
		{
			property: "og:title",
			content: "Become a Care Partner — Sakhi"
		},
		{
			property: "og:description",
			content: "Work on your own schedule, in your own area, with training and support."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$33, "component")
});
var $$splitComponentImporter$32 = () => import("./cancellation-CG7sh8Hs.mjs");
var Route$32 = createFileRoute("/cancellation")({
	head: () => ({ meta: [
		{ title: "Cancellation & Refund Policy — Sakhi" },
		{
			name: "description",
			content: "When you can cancel a Sakhi booking, what it costs, how refunds work, and what happens if a Care Partner cancels or a booking ends early."
		},
		{
			property: "og:title",
			content: "Cancellation & Refund Policy — Sakhi"
		},
		{
			property: "og:description",
			content: "Cancellation windows, charges and refunds for Sakhi bookings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$32, "component")
});
var $$splitComponentImporter$31 = () => import("./faq-B1PodieR.mjs");
var Route$31 = createFileRoute("/faq")({
	head: () => ({ meta: [
		{ title: "FAQ — Sakhi" },
		{
			name: "description",
			content: "Answers about Sakhi bookings, time-based pricing, Care Partner verification, safety boundaries, cancellations and reviews."
		},
		{
			property: "og:title",
			content: "Frequently Asked Questions — Sakhi"
		},
		{
			property: "og:description",
			content: "Everything about bookings, pricing, safety and cancellations."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$31, "component")
});
var $$splitComponentImporter$30 = () => import("./how-it-works-Bxaaxqmv.mjs");
var Route$30 = createFileRoute("/how-it-works")({
	head: () => ({ meta: [
		{ title: "How It Works — Sakhi" },
		{
			name: "description",
			content: "Book one trained Care Partner for a block of time on Sakhi. Choose your Sakhi, pick date and hours, confirm the total, and ask for what you need."
		},
		{
			property: "og:title",
			content: "How It Works — Sakhi"
		},
		{
			property: "og:description",
			content: "One booking, one Care Partner, time-based pricing. Here is the full flow."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$30, "component")
});
var $$splitComponentImporter$29 = () => import("./privacy-CIATkcnQ.mjs");
var Route$29 = createFileRoute("/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Policy — Sakhi" },
		{
			name: "description",
			content: "What personal data Sakhi collects, why we collect it, who can see it, how long we keep it and the rights you have over it."
		},
		{
			property: "og:title",
			content: "Privacy Policy — Sakhi"
		},
		{
			property: "og:description",
			content: "How Sakhi collects, uses and protects your personal data."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$29, "component")
});
var $$splitComponentImporter$28 = () => import("./reset-password-Z0mliXW1.mjs");
var Route$28 = createFileRoute("/reset-password")({
	head: () => ({ meta: [
		{ title: "Reset Your Password — Sakhi" },
		{
			name: "description",
			content: "Choose a new password for your Sakhi account."
		},
		{
			property: "og:title",
			content: "Reset Your Password — Sakhi"
		},
		{
			property: "og:description",
			content: "Set a new password for your Sakhi account."
		},
		{
			name: "robots",
			content: "noindex"
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$28, "component")
});
var $$splitComponentImporter$27 = () => import("./safety-TI870Rbd.mjs");
var Route$27 = createFileRoute("/safety")({
	head: () => ({ meta: [
		{ title: "Safety & Trust — Sakhi" },
		{
			name: "description",
			content: "How Sakhi keeps both customers and Care Partners safe: verification, training, strict non-medical boundaries and the right to refuse unsafe tasks."
		},
		{
			property: "og:title",
			content: "Safety & Trust — Sakhi"
		},
		{
			property: "og:description",
			content: "Verification, training and strict non-medical boundaries on every booking."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$27, "component")
});
var $$splitComponentImporter$26 = () => import("./terms-CjeFdjkW.mjs");
var Route$26 = createFileRoute("/terms")({
	head: () => ({ meta: [
		{ title: "Terms & Conditions — Sakhi" },
		{
			name: "description",
			content: "The terms that govern the use of Sakhi, including booking rules, time-based pricing, prohibited requests and account termination."
		},
		{
			property: "og:title",
			content: "Terms & Conditions — Sakhi"
		},
		{
			property: "og:description",
			content: "Rules for using the Sakhi women-to-women care platform."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$26, "component")
});
var $$splitComponentImporter$25 = () => import("./what-we-offer-CrxYaSC6.mjs");
var Route$25 = createFileRoute("/what-we-offer")({
	head: () => ({ meta: [
		{ title: "What We Offer — Sakhi" },
		{
			name: "description",
			content: "Cooking, tea, light household help, errands, hot water, gentle comfort massage and companionship — all included in your Care Partner's booked time."
		},
		{
			property: "og:title",
			content: "What We Offer — Sakhi"
		},
		{
			property: "og:description",
			content: "Capabilities included in your Care Partner's time — never priced separately."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$25, "component")
});
var $$splitComponentImporter$24 = () => import("./book-Cweb5wmN.mjs");
var searchSchema = objectType({ partner: stringType().optional() });
var Route$24 = createFileRoute("/_authenticated/book")({
	validateSearch: searchSchema,
	head: () => ({ meta: [
		{ title: "Book a Care Partner — Sakhi" },
		{
			name: "description",
			content: "Book a trained Sakhi Care Partner by the hour for non-medical support at home."
		},
		{
			property: "og:title",
			content: "Book a Care Partner — Sakhi"
		},
		{
			property: "og:description",
			content: "Pick a date, a start time and how many hours you need."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$24, "component")
});
var $$splitComponentImporter$23 = () => import("./dashboard-THimVx1-.mjs");
var Route$23 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "Customer Dashboard — Sakhi" },
		{
			name: "description",
			content: "Track your upcoming Sakhi bookings, hours booked and total spend."
		},
		{
			property: "og:title",
			content: "Customer Dashboard — Sakhi"
		},
		{
			property: "og:description",
			content: "Your bookings and care history at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./notifications-BqfEdwT8.mjs");
var Route$22 = createFileRoute("/_authenticated/notifications")({
	head: () => ({ meta: [
		{ title: "Notifications — Sakhi" },
		{
			name: "description",
			content: "Updates about your Sakhi bookings and account."
		},
		{
			property: "og:title",
			content: "Notifications — Sakhi"
		},
		{
			property: "og:description",
			content: "Updates about your Sakhi bookings and account."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$22, "component")
});
var $$splitComponentImporter$21 = () => import("./profile-BcdKnAUo.mjs");
var Route$21 = createFileRoute("/_authenticated/profile")({
	head: () => ({ meta: [
		{ title: "Profile — Sakhi" },
		{
			name: "description",
			content: "Your Sakhi account details."
		},
		{
			property: "og:title",
			content: "Profile — Sakhi"
		},
		{
			property: "og:description",
			content: "Your Sakhi account details."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./care-partners.index-CiXMMDoF.mjs");
var Route$20 = createFileRoute("/care-partners/")({
	head: () => ({ meta: [
		{ title: "Browse Approved Care Partners — Sakhi" },
		{
			name: "description",
			content: "Meet Sakhi's verified, trained Care Partners. See their experience, languages, service area, supported tasks and hourly rate before you book."
		},
		{
			property: "og:title",
			content: "Browse Approved Care Partners — Sakhi"
		},
		{
			property: "og:description",
			content: "Verified, trained women available to support you by the hour."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./care-partners._id-CRI-qnyD.mjs");
var Route$19 = createFileRoute("/care-partners/$id")({
	head: () => ({ meta: [
		{ title: "Care Partner Profile — Sakhi" },
		{
			name: "description",
			content: "See this Sakhi Care Partner's experience, supported tasks, availability, reviews and hourly rate."
		},
		{
			property: "og:title",
			content: "Care Partner Profile — Sakhi"
		},
		{
			property: "og:description",
			content: "Experience, supported tasks, availability and reviews."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./admin.index-DoYiXmzl.mjs");
var Route$18 = createFileRoute("/_authenticated/admin/")({
	head: () => ({ meta: [
		{ title: "Admin Dashboard — Sakhi" },
		{
			name: "description",
			content: "Platform overview for the Sakhi team."
		},
		{
			property: "og:title",
			content: "Admin Dashboard — Sakhi"
		},
		{
			property: "og:description",
			content: "Platform overview for the Sakhi team."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./admin.applications-Cv0JXmjc.mjs");
var Route$17 = createFileRoute("/_authenticated/admin/applications")({
	head: () => ({ meta: [
		{ title: "Applications — Sakhi" },
		{
			name: "description",
			content: "Care Partner applications awaiting review."
		},
		{
			property: "og:title",
			content: "Applications — Sakhi"
		},
		{
			property: "og:description",
			content: "Care Partner applications awaiting review."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./admin.bookings-D0YUnNeR.mjs");
var Route$16 = createFileRoute("/_authenticated/admin/bookings")({
	head: () => ({ meta: [
		{ title: "Bookings — Sakhi" },
		{
			name: "description",
			content: "All bookings on the platform."
		},
		{
			property: "og:title",
			content: "Bookings — Sakhi"
		},
		{
			property: "og:description",
			content: "All bookings on the platform."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./admin.care-partners-DsbCHeoD.mjs");
var Route$15 = createFileRoute("/_authenticated/admin/care-partners")({
	head: () => ({ meta: [
		{ title: "Care Partners — Sakhi" },
		{
			name: "description",
			content: "Manage Sakhi Care Partners."
		},
		{
			property: "og:title",
			content: "Care Partners — Sakhi"
		},
		{
			property: "og:description",
			content: "Manage Sakhi Care Partners."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./admin.complaints-BSjRcGFU.mjs");
var Route$14 = createFileRoute("/_authenticated/admin/complaints")({
	head: () => ({ meta: [
		{ title: "Complaints — Sakhi" },
		{
			name: "description",
			content: "Safety and service complaints."
		},
		{
			property: "og:title",
			content: "Complaints — Sakhi"
		},
		{
			property: "og:description",
			content: "Safety and service complaints."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./admin.pricing-C34GsZQc.mjs");
var Route$13 = createFileRoute("/_authenticated/admin/pricing")({
	head: () => ({ meta: [
		{ title: "Pricing — Sakhi" },
		{
			name: "description",
			content: "Platform default hourly rate."
		},
		{
			property: "og:title",
			content: "Pricing — Sakhi"
		},
		{
			property: "og:description",
			content: "Platform default hourly rate."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./admin.reviews-BvX6duP-.mjs");
var Route$12 = createFileRoute("/_authenticated/admin/reviews")({
	head: () => ({ meta: [
		{ title: "Reviews — Sakhi" },
		{
			name: "description",
			content: "Customer reviews of Care Partners."
		},
		{
			property: "og:title",
			content: "Reviews — Sakhi"
		},
		{
			property: "og:description",
			content: "Customer reviews of Care Partners."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./admin.tasks-B8WRYNFM.mjs");
var Route$11 = createFileRoute("/_authenticated/admin/tasks")({
	head: () => ({ meta: [
		{ title: "Care Tasks — Sakhi" },
		{
			name: "description",
			content: "Manage the catalogue of supported Sakhi care tasks."
		},
		{
			property: "og:title",
			content: "Care Tasks — Sakhi"
		},
		{
			property: "og:description",
			content: "Manage the catalogue of supported Sakhi care tasks."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.training-CVb4b0wM.mjs");
var Route$10 = createFileRoute("/_authenticated/admin/training")({
	head: () => ({ meta: [
		{ title: "Training — Sakhi" },
		{
			name: "description",
			content: "Training records across Care Partners."
		},
		{
			property: "og:title",
			content: "Training — Sakhi"
		},
		{
			property: "og:description",
			content: "Training records across Care Partners."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin.users-BlrfdcWl.mjs");
var Route$9 = createFileRoute("/_authenticated/admin/users")({
	head: () => ({ meta: [
		{ title: "Users — Sakhi" },
		{
			name: "description",
			content: "All Sakhi accounts."
		},
		{
			property: "og:title",
			content: "Users — Sakhi"
		},
		{
			property: "og:description",
			content: "All Sakhi accounts."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./admin.verification-Bm020Hee.mjs");
var Route$8 = createFileRoute("/_authenticated/admin/verification")({
	head: () => ({ meta: [
		{ title: "Verification — Sakhi" },
		{
			name: "description",
			content: "Identity and background verification records."
		},
		{
			property: "og:title",
			content: "Verification — Sakhi"
		},
		{
			property: "og:description",
			content: "Identity and background verification records."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./bookings.index-DLtnFTUd.mjs");
var Route$7 = createFileRoute("/_authenticated/bookings/")({
	head: () => ({ meta: [
		{ title: "My Bookings — Sakhi" },
		{
			name: "description",
			content: "Every Sakhi booking you have made, with status, hours and totals."
		},
		{
			property: "og:title",
			content: "My Bookings — Sakhi"
		},
		{
			property: "og:description",
			content: "Past and upcoming Care Partner visits."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./bookings._id-D3uSoshe.mjs");
var Route$6 = createFileRoute("/_authenticated/bookings/$id")({
	head: () => ({ meta: [
		{ title: "Booking Details — Sakhi" },
		{
			name: "description",
			content: "View and manage a single Sakhi Care Partner booking."
		},
		{
			property: "og:title",
			content: "Booking Details — Sakhi"
		},
		{
			property: "og:description",
			content: "Time, address, status and total for this visit."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./partner.index-DM4eWTBe.mjs");
var Route$5 = createFileRoute("/_authenticated/partner/")({
	head: () => ({ meta: [
		{ title: "Care Partner Dashboard — Sakhi" },
		{
			name: "description",
			content: "Your upcoming visits, hours and earnings."
		},
		{
			property: "og:title",
			content: "Care Partner Dashboard — Sakhi"
		},
		{
			property: "og:description",
			content: "Your upcoming visits, hours and earnings."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./partner.application-D9FDfPZw.mjs");
var Route$4 = createFileRoute("/_authenticated/partner/application")({
	head: () => ({ meta: [
		{ title: "Application — Sakhi" },
		{
			name: "description",
			content: "Your onboarding application status."
		},
		{
			property: "og:title",
			content: "Application — Sakhi"
		},
		{
			property: "og:description",
			content: "Complete your Care Partner application and track your status."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./partner.availability-QgN3CMif.mjs");
var Route$3 = createFileRoute("/_authenticated/partner/availability")({
	head: () => ({ meta: [
		{ title: "Availability — Sakhi" },
		{
			name: "description",
			content: "Publish the hours you can work."
		},
		{
			property: "og:title",
			content: "Availability — Sakhi"
		},
		{
			property: "og:description",
			content: "Publish the hours you can work."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./partner.bookings-BIppBeji.mjs");
var Route$2 = createFileRoute("/_authenticated/partner/bookings")({
	head: () => ({ meta: [
		{ title: "Partner Bookings — Sakhi" },
		{
			name: "description",
			content: "Requests and confirmed visits."
		},
		{
			property: "og:title",
			content: "Partner Bookings — Sakhi"
		},
		{
			property: "og:description",
			content: "Requests and confirmed visits."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./partner.earnings-B7kb3wPe.mjs");
var Route$1 = createFileRoute("/_authenticated/partner/earnings")({
	head: () => ({ meta: [
		{ title: "Earnings — Sakhi" },
		{
			name: "description",
			content: "Hours worked and amounts earned."
		},
		{
			property: "og:title",
			content: "Earnings — Sakhi"
		},
		{
			property: "og:description",
			content: "Hours worked and amounts earned."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./partner.training-DzKFSW2P.mjs");
var Route = createFileRoute("/_authenticated/partner/training")({
	head: () => ({ meta: [
		{ title: "Training — Sakhi" },
		{
			name: "description",
			content: "Your Sakhi training records."
		},
		{
			property: "og:title",
			content: "Training — Sakhi"
		},
		{
			property: "og:description",
			content: "Your Sakhi training records."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$37.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$38
});
var AuthenticatedRouteRoute = Route$36.update({
	id: "/_authenticated",
	getParentRoute: () => Route$38
});
var AboutRoute = Route$35.update({
	id: "/about",
	path: "/about",
	getParentRoute: () => Route$38
});
var AuthRoute = Route$34.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$38
});
var BecomeACarePartnerRoute = Route$33.update({
	id: "/become-a-care-partner",
	path: "/become-a-care-partner",
	getParentRoute: () => Route$38
});
var CancellationRoute = Route$32.update({
	id: "/cancellation",
	path: "/cancellation",
	getParentRoute: () => Route$38
});
var FaqRoute = Route$31.update({
	id: "/faq",
	path: "/faq",
	getParentRoute: () => Route$38
});
var HowItWorksRoute = Route$30.update({
	id: "/how-it-works",
	path: "/how-it-works",
	getParentRoute: () => Route$38
});
var PrivacyRoute = Route$29.update({
	id: "/privacy",
	path: "/privacy",
	getParentRoute: () => Route$38
});
var ResetPasswordRoute = Route$28.update({
	id: "/reset-password",
	path: "/reset-password",
	getParentRoute: () => Route$38
});
var SafetyRoute = Route$27.update({
	id: "/safety",
	path: "/safety",
	getParentRoute: () => Route$38
});
var TermsRoute = Route$26.update({
	id: "/terms",
	path: "/terms",
	getParentRoute: () => Route$38
});
var WhatWeOfferRoute = Route$25.update({
	id: "/what-we-offer",
	path: "/what-we-offer",
	getParentRoute: () => Route$38
});
var AuthenticatedBookRoute = Route$24.update({
	id: "/book",
	path: "/book",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedDashboardRoute = Route$23.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedNotificationsRoute = Route$22.update({
	id: "/notifications",
	path: "/notifications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedProfileRoute = Route$21.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => AuthenticatedRouteRoute
});
var CarePartnersIndexRoute = Route$20.update({
	id: "/care-partners/",
	path: "/care-partners/",
	getParentRoute: () => Route$38
});
var CarePartnersIdRoute = Route$19.update({
	id: "/care-partners/$id",
	path: "/care-partners/$id",
	getParentRoute: () => Route$38
});
var AuthenticatedAdminIndexRoute = Route$18.update({
	id: "/admin/",
	path: "/admin/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminApplicationsRoute = Route$17.update({
	id: "/admin/applications",
	path: "/admin/applications",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminBookingsRoute = Route$16.update({
	id: "/admin/bookings",
	path: "/admin/bookings",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminCarePartnersRoute = Route$15.update({
	id: "/admin/care-partners",
	path: "/admin/care-partners",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminComplaintsRoute = Route$14.update({
	id: "/admin/complaints",
	path: "/admin/complaints",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminPricingRoute = Route$13.update({
	id: "/admin/pricing",
	path: "/admin/pricing",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminReviewsRoute = Route$12.update({
	id: "/admin/reviews",
	path: "/admin/reviews",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminTasksRoute = Route$11.update({
	id: "/admin/tasks",
	path: "/admin/tasks",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminTrainingRoute = Route$10.update({
	id: "/admin/training",
	path: "/admin/training",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminUsersRoute = Route$9.update({
	id: "/admin/users",
	path: "/admin/users",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedAdminVerificationRoute = Route$8.update({
	id: "/admin/verification",
	path: "/admin/verification",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBookingsIndexRoute = Route$7.update({
	id: "/bookings/",
	path: "/bookings/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedBookingsIdRoute = Route$6.update({
	id: "/bookings/$id",
	path: "/bookings/$id",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedPartnerIndexRoute = Route$5.update({
	id: "/partner/",
	path: "/partner/",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedRouteRouteChildren = {
	AuthenticatedBookRoute,
	AuthenticatedDashboardRoute,
	AuthenticatedNotificationsRoute,
	AuthenticatedProfileRoute,
	AuthenticatedAdminApplicationsRoute,
	AuthenticatedAdminBookingsRoute,
	AuthenticatedAdminCarePartnersRoute,
	AuthenticatedAdminComplaintsRoute,
	AuthenticatedAdminPricingRoute,
	AuthenticatedAdminReviewsRoute,
	AuthenticatedAdminTasksRoute,
	AuthenticatedAdminTrainingRoute,
	AuthenticatedAdminUsersRoute,
	AuthenticatedAdminVerificationRoute,
	AuthenticatedBookingsIdRoute,
	AuthenticatedPartnerApplicationRoute: Route$4.update({
		id: "/partner/application",
		path: "/partner/application",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPartnerAvailabilityRoute: Route$3.update({
		id: "/partner/availability",
		path: "/partner/availability",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPartnerBookingsRoute: Route$2.update({
		id: "/partner/bookings",
		path: "/partner/bookings",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPartnerEarningsRoute: Route$1.update({
		id: "/partner/earnings",
		path: "/partner/earnings",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedPartnerTrainingRoute: Route.update({
		id: "/partner/training",
		path: "/partner/training",
		getParentRoute: () => AuthenticatedRouteRoute
	}),
	AuthenticatedAdminIndexRoute,
	AuthenticatedBookingsIndexRoute,
	AuthenticatedPartnerIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AboutRoute,
	AuthRoute,
	BecomeACarePartnerRoute,
	CancellationRoute,
	FaqRoute,
	HowItWorksRoute,
	PrivacyRoute,
	ResetPasswordRoute,
	SafetyRoute,
	TermsRoute,
	WhatWeOfferRoute,
	CarePartnersIdRoute,
	CarePartnersIndexRoute
};
var routeTree = Route$38._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { Button as a, useAuth as c, Route$24 as i, Route$6 as n, cn as o, Route$19 as r, homeForRole as s, router_exports as t };
