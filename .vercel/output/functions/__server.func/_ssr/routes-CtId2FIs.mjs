import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { a as ShieldCheck, d as Clock, g as CalendarCheck, i as Sparkles, l as HeartHandshake, n as UserCheck, o as MessageCircleHeart } from "../_libs/lucide-react.mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as SectionHeading, t as Section } from "./Section-Cjglc_Pw.mjs";
import { t as PlaceholderImage } from "./PlaceholderImage-CcwEu3st.mjs";
import { n as formatCurrency } from "./format-C7GCbIxL.mjs";
import { i as AccordionTrigger, n as AccordionContent, r as AccordionItem, t as Accordion } from "./accordion-IjtAajii.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-CtId2FIs.js
var import_jsx_runtime = require_jsx_runtime();
var faqs = [
	{
		q: "Am I booking a service or a person?",
		a: "You book a person for a block of time. During those hours your Care Partner can help with any reasonable, safe, non-medical task you need — there is no separate price per task."
	},
	{
		q: "Is Sakhi a medical service?",
		a: "No. Sakhi is strictly non-medical. Care Partners never diagnose, prescribe, treat or perform any medical procedure."
	},
	{
		q: "Who are the Care Partners?",
		a: "Verified, trained women. Every Care Partner is reviewed by our team, completes safety training and is approved before she can receive a single booking."
	},
	{
		q: "How is the price calculated?",
		a: "Hourly rate × number of hours. You always see the full total before you confirm."
	},
	{
		q: "Can a Care Partner refuse a task?",
		a: "Yes, always. Care Partners can decline anything unsafe, inappropriate, medical or outside their training."
	}
];
function Home() {
	const { data: settings } = useQuery({
		queryKey: ["platform-settings"],
		queryFn: async () => {
			const { data } = await supabase.from("platform_settings").select("*").eq("id", 1).maybeSingle();
			return data;
		}
	});
	const { data: tasks } = useQuery({
		queryKey: ["care-tasks", "active"],
		queryFn: async () => {
			const { data } = await supabase.from("care_tasks").select("*").eq("is_active", true).order("created_at");
			return data ?? [];
		}
	});
	const rate = settings?.default_hourly_rate ?? 250;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "warm-gradient",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container-page grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-semibold uppercase tracking-[0.24em] text-clay",
						children: "Women-to-women care"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-6xl leading-none text-primary sm:text-7xl",
						children: "सखी"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-2xl font-semibold tracking-[0.14em] text-foreground",
						children: "SAKHI"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-xl font-display text-2xl leading-snug text-foreground sm:text-3xl",
						children: "\"When you're away from home, you still deserve to be cared for.\""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-xl text-muted-foreground",
						children: "Book one trained female Care Partner for the hours you need. She helps with cooking, tea, light household work, errands, comfort and company — all within your booked time."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/book",
								children: "Book Care"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "lg",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/become-a-care-partner",
								children: "Become a Care Partner"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-6 text-sm text-muted-foreground",
						children: [
							"Time-based pricing from",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-semibold text-foreground",
								children: [formatCurrency(rate), "/hour"]
							}),
							" · No per-task charges"
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
					name: "hero",
					alt: "A Care Partner sharing a warm moment with a customer at home",
					ratio: "portrait",
					className: "shadow-lift"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "The problem",
			title: "Living away from family is hard on the days you feel low.",
			description: "A fever, a long work week, period pain, recovery after travel, or simply a heavy day. There is no one to make hot tea, cook something simple, fold the laundry, or just sit beside you."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-10 grid gap-6 md:grid-cols-3",
			children: [
				{
					icon: Clock,
					title: "Help is priced by task, not by need",
					body: "Most services make you choose a package. Real life doesn't work in packages."
				},
				{
					icon: ShieldCheck,
					title: "Safety is a real worry",
					body: "Letting a stranger into your home is a decision, not a transaction."
				},
				{
					icon: HeartHandshake,
					title: "Nobody offers plain comfort",
					body: "Company, warmth and a steady presence are not something you can order online."
				}
			].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-6 text-primary" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mt-4 text-lg",
						children: item.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: item.body
					})
				]
			}, item.title))
		})] }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			muted: true,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "How it works",
					title: "One booking. One Care Partner. Your time.",
					center: true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-12 grid gap-6 md:grid-cols-4",
					children: [
						{
							icon: UserCheck,
							title: "Choose your Sakhi",
							body: "Browse approved, verified Care Partners near you."
						},
						{
							icon: CalendarCheck,
							title: "Pick date & hours",
							body: "Select a date, a start time and how many hours you need."
						},
						{
							icon: Sparkles,
							title: "Confirm & pay by time",
							body: "Hourly rate × hours. The total is shown before you confirm."
						},
						{
							icon: MessageCircleHeart,
							title: "Ask as you go",
							body: "Within those hours, request any reasonable non-medical help."
						}
					].map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-6",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-display text-3xl text-accent-foreground/70",
								children: ["0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "mt-3 size-5 text-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-3 text-base font-semibold",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: step.body
							})
						]
					}, step.title))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/how-it-works",
							children: "See the full flow"
						})
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Care tasks",
					title: "Everything below is included in her time.",
					description: "These are capabilities, not products. There is no separate price for cooking, comfort massage or errands — you are paying for your Care Partner's time."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: (tasks ?? []).map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "rounded-full border border-border bg-card px-4 py-2 text-sm",
						children: task.name
					}, task.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/what-we-offer",
						children: "What we offer"
					})
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
					name: "cooking",
					alt: "Simple home-style cooking",
					ratio: "square"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
					name: "companionship",
					alt: "Companionship and conversation",
					ratio: "square"
				})]
			})]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, {
			muted: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
				eyebrow: "Why Sakhi",
				title: "Built for trust, not for volume.",
				center: true
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-6 md:grid-cols-3",
				children: [
					{
						title: "Women only, always",
						body: "Every Care Partner and every booking is women-to-women. That is the whole point."
					},
					{
						title: "Trained and verified",
						body: "Identity verification and safety training are completed before approval."
					},
					{
						title: "Honest, time-based pricing",
						body: "One hourly rate. No hidden add-ons, no per-task upselling."
					},
					{
						title: "Flexible within the hour",
						body: "Change your mind mid-booking. Ask for tea instead of laundry. It's your time."
					},
					{
						title: "Clear boundaries",
						body: "Strictly non-medical. Nothing unsafe, intimate or illegal — ever."
					},
					{
						title: "Accountable",
						body: "Reviews, complaints and admin oversight on every booking."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: item.body
					})]
				}, item.title))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-2 lg:items-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
				name: "safety",
				alt: "Safety and verification at Sakhi",
				ratio: "wide"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Safety & trust",
					title: "You should never have to wonder who is at your door."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-6 space-y-3 text-sm text-muted-foreground",
					children: [
						"Identity and background verification before approval.",
						"Mandatory safety and conduct training.",
						"Strictly non-medical support — no diagnosis, medicines or procedures.",
						"Massage is only ever gentle, comfort-oriented hand or leg massage.",
						"Care Partners may refuse any unsafe or inappropriate request.",
						"Every booking can be reported and reviewed."
					].map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mt-0.5 size-4 shrink-0 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: line })]
					}, line))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8",
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/safety",
						children: "Read our safety rules"
					})
				})
			] })]
		}) }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, {
			muted: true,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card grid gap-8 p-8 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Work with us",
					title: "Become a Care Partner",
					description: "Earn on your own schedule, in your own area, with training and support behind you. Set your availability, accept only the bookings that work for you."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-8",
					size: "lg",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/become-a-care-partner",
						children: "Apply to join"
					})
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
					name: "care-partner",
					alt: "A Sakhi Care Partner",
					ratio: "square"
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
			eyebrow: "FAQ",
			title: "Questions people ask us first",
			center: true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto mt-10 max-w-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Accordion, {
				type: "single",
				collapsible: true,
				children: faqs.map((faq) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AccordionItem, {
					value: faq.q,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionTrigger, {
						className: "text-left",
						children: faq.q
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccordionContent, {
						className: "text-muted-foreground",
						children: faq.a
					})]
				}, faq.q))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-8 text-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/faq",
						children: "All questions"
					})
				})
			})]
		})] })
	] });
}
//#endregion
export { Home as component };
