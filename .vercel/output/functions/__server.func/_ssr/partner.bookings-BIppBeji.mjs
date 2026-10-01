import { t as supabase } from "./client-CyWs3CWb.mjs";
import { _ as require_jsx_runtime } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { r as useQueryClient, t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as Button, c as useAuth } from "./router-0JUlUF2v.mjs";
import { a as partnerNav, n as RoleGate, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { i as formatTime, n as formatCurrency, r as formatDate } from "./format-C7GCbIxL.mjs";
import { t as StatusBadge } from "./StatusBadge-BgUwDklZ.mjs";
import { t as EmptyState } from "./EmptyState-RW6scyNZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/partner.bookings-BIppBeji.js
var import_jsx_runtime = require_jsx_runtime();
function PartnerBookingsPage() {
	const { user } = useAuth();
	const queryClient = useQueryClient();
	const { data: bookings = [], isLoading, error } = useQuery({
		queryKey: [
			"bookings",
			"partner",
			user?.id
		],
		enabled: Boolean(user?.id),
		queryFn: async () => {
			if (!user?.id) return [];
			const { data: partner, error: partnerError } = await supabase.from("care_partners").select("id").eq("profile_id", user.id).maybeSingle();
			if (partnerError) throw partnerError;
			if (!partner) throw new Error("Care Partner profile was not found.");
			const { data, error: bookingsError } = await supabase.from("bookings").select(`
          id,
          date,
          start_time,
          end_time,
          duration_hours,
          hourly_rate,
          total_amount,
          address,
          instructions,
          status,
          customer_id,
          profiles!bookings_customer_id_fkey(
            full_name,
            phone
          )
        `).eq("care_partner_id", partner.id).order("date", { ascending: true }).order("start_time", { ascending: true });
			if (bookingsError) throw bookingsError;
			return data ?? [];
		}
	});
	async function updateStatus(bookingId, status) {
		if (!(status === "rejected" ? window.confirm("Are you sure you want to reject this booking request?") : true)) return;
		const { error } = await supabase.from("bookings").update({ status }).eq("id", bookingId);
		if (error) {
			toast.error(error.message);
			return;
		}
		await queryClient.invalidateQueries({ queryKey: [
			"bookings",
			"partner",
			user?.id
		] });
		await queryClient.invalidateQueries({ queryKey: ["bookings"] });
		toast.success(status === "accepted" ? "Booking accepted." : status === "rejected" ? "Booking rejected." : status === "in_progress" ? "Booking marked as in progress." : "Booking completed.");
	}
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Partner Bookings",
		description: "Requests and confirmed visits.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: "Loading bookings..."
		})
	});
	if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		title: "Partner Bookings",
		description: "Requests and confirmed visits.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "surface-card p-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-lg font-medium",
				children: "Could not load bookings"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted-foreground",
				children: error instanceof Error ? error.message : "Something went wrong."
			})]
		})
	});
	const pending = bookings.filter((booking) => booking.status === "pending");
	const upcoming = bookings.filter((booking) => [
		"accepted",
		"confirmed",
		"in_progress"
	].includes(booking.status));
	const completed = bookings.filter((booking) => [
		"completed",
		"rejected",
		"cancelled"
	].includes(booking.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: partnerNav,
		eyebrow: "Care Partner",
		title: "Partner Bookings",
		description: "Review requests and manage your Sakhi visits.",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSection, {
					title: "New requests",
					description: "Bookings waiting for your response.",
					bookings: pending,
					emptyTitle: "No new requests",
					emptyDescription: "New booking requests will appear here.",
					onStatusChange: updateStatus
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSection, {
					title: "Upcoming visits",
					description: "Bookings you have accepted or that are in progress.",
					bookings: upcoming,
					emptyTitle: "No upcoming visits",
					emptyDescription: "Accepted bookings will appear here.",
					onStatusChange: updateStatus
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingSection, {
					title: "Past bookings",
					description: "Completed, rejected and cancelled bookings.",
					bookings: completed,
					emptyTitle: "No past bookings",
					emptyDescription: "Your completed bookings will appear here.",
					onStatusChange: updateStatus
				})
			]
		})
	});
}
function BookingSection({ title, description, bookings, emptyTitle, emptyDescription, onStatusChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "text-xl font-medium",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted-foreground",
			children: description
		})]
	}), bookings.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
		title: emptyTitle,
		description: emptyDescription
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-4",
		children: bookings.map((booking) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookingCard, {
			booking,
			onStatusChange
		}, booking.id))
	})] });
}
function BookingCard({ booking, onStatusChange }) {
	const customerName = booking.profiles?.full_name || "Customer";
	const customerPhone = booking.profiles?.phone;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "surface-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: customerName
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { status: booking.status })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						formatDate(booking.date),
						" · ",
						formatTime(booking.start_time),
						" –",
						" ",
						formatTime(booking.end_time)
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-right",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-xl",
						children: formatCurrency(booking.total_amount)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [Number(booking.duration_hours), " hours"]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-4 border-t border-border pt-5 md:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: "Visit address"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: booking.address
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: "Customer phone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: customerPhone || "Not provided"
				})] })]
			}),
			booking.instructions ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-lg bg-sand p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-wide text-muted-foreground",
					children: "Customer instructions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: booking.instructions
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [
					booking.status === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void onStatusChange(booking.id, "accepted"),
						children: "Accept booking"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						onClick: () => void onStatusChange(booking.id, "rejected"),
						children: "Reject"
					})] }) : null,
					["accepted", "confirmed"].includes(booking.status) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void onStatusChange(booking.id, "in_progress"),
						children: "Start visit"
					}) : null,
					booking.status === "in_progress" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						onClick: () => void onStatusChange(booking.id, "completed"),
						children: "Mark completed"
					}) : null
				]
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["care_partner"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PartnerBookingsPage, {})
});
//#endregion
export { SplitComponent as component };
