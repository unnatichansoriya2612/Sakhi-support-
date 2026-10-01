import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { c as MapPin, h as CalendarDays, r as Star } from "../_libs/lucide-react.mjs";
import { a as Button, r as Route$19 } from "./router-0JUlUF2v.mjs";
import { t as Section } from "./Section-Cjglc_Pw.mjs";
import { t as PlaceholderImage } from "./PlaceholderImage-CcwEu3st.mjs";
import { i as formatTime, n as formatCurrency, o as todayISO, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/care-partners._id-CRI-qnyD.js
var import_jsx_runtime = require_jsx_runtime();
function PartnerProfile() {
	const { id } = Route$19.useParams();
	const { data: partner, isLoading } = useQuery({
		queryKey: ["care-partner", id],
		queryFn: async () => {
			const { data, error } = await supabase.from("care_partners").select("*, profiles!care_partners_profile_id_fkey(id, full_name, avatar_url, city)").eq("id", id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	const { data: tasks } = useQuery({
		queryKey: ["care-partner-tasks", id],
		queryFn: async () => {
			const { data } = await supabase.from("care_partner_tasks").select("care_task_id, care_tasks(id, name, description, is_active)").eq("care_partner_id", id);
			return (data ?? []).map((row) => row.care_tasks).filter(Boolean);
		}
	});
	const { data: slots } = useQuery({
		queryKey: ["availability", id],
		queryFn: async () => {
			const { data } = await supabase.from("availability").select("*").eq("care_partner_id", id).eq("is_available", true).gte("date", todayISO()).order("date").order("start_time");
			return data ?? [];
		}
	});
	const { data: reviews } = useQuery({
		queryKey: ["reviews", id],
		queryFn: async () => {
			const { data } = await supabase.from("reviews").select("*, profiles!reviews_customer_id_fkey(full_name)").eq("care_partner_id", id).order("created_at", { ascending: false });
			return data ?? [];
		}
	});
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted-foreground",
		children: "Loading profile..."
	}) });
	if (!partner) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Section, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-2xl",
			children: "Care Partner not found"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-sm text-muted-foreground",
			children: "This profile may not be approved yet, or the link is incorrect."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/care-partners",
				children: "Back to all Care Partners"
			})
		})
	] });
	const avg = reviews && reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Section, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-10 lg:grid-cols-[2fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/care-partners",
				className: "text-xs text-muted-foreground underline",
				children: "← All Care Partners"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-3xl",
					children: partner.profiles?.full_name || "Care Partner"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 flex items-center gap-1 text-sm text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }), partner.service_area || partner.profiles?.city || "Service area on request"]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.verification_status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: partner.training_status })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-sm leading-relaxed text-muted-foreground",
				children: partner.bio || "This Care Partner has not added a bio yet."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 sm:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Experience"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 font-display text-xl",
							children: [partner.experience_years, " years"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Languages"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm",
							children: partner.languages
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "surface-card p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-wide text-muted-foreground",
							children: "Rating"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 flex items-center gap-1 font-display text-xl",
							children: avg ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: "size-4 fill-current text-warning" }), avg.toFixed(1)] }) : "New"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xl",
				children: "Supported tasks"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "All of these are included in her booked time. Nothing here is priced separately."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: (tasks ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "She has not selected specific tasks yet — she can still help with any reasonable non-medical support during your booking."
				}) : (tasks ?? []).map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full border border-border bg-card px-4 py-2 text-sm",
					children: task.name
				}, task.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xl",
				children: "Upcoming availability"
			}),
			(slots ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "No published availability right now. You can still send a booking request for a time that suits you."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 grid gap-2 sm:grid-cols-2",
				children: (slots ?? []).map((slot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface-card flex items-center gap-3 p-4 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "size-4 text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						formatDate(slot.date),
						" · ",
						formatTime(slot.start_time),
						" – ",
						formatTime(slot.end_time)
					] })]
				}, slot.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-12 text-xl",
				children: "Reviews"
			}),
			(reviews ?? []).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: "No reviews yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-4 space-y-3",
				children: (reviews ?? []).map((review) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "surface-card p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex",
							children: Array.from({ length: 5 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: i < review.rating ? "size-4 fill-current text-warning" : "size-4 text-border" }, i))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: review.profiles?.full_name ?? "Customer"
						})]
					}), review.comment ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: review.comment
					}) : null]
				}, review.id))
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "lg:sticky lg:top-24 lg:self-start",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlaceholderImage, {
				name: "care-partner",
				alt: "Care Partner portrait",
				ratio: "square"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "surface-card mt-4 p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-wide text-muted-foreground",
						children: "Hourly rate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 font-display text-3xl",
						children: [formatCurrency(partner.hourly_rate), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-base font-normal text-muted-foreground",
							children: "/hour"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "You book her time. Every supported task above is included."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						className: "mt-5 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/book",
							search: { partner: partner.id },
							children: "Book this Care Partner"
						})
					})
				]
			})]
		})]
	}) });
}
//#endregion
export { PartnerProfile as component };
