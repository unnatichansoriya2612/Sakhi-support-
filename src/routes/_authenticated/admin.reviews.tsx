import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { supabase } from "@/lib/supabase";
import { StatusBadge } from "@/components/site/StatusBadge";

export const Route = createFileRoute("/_authenticated/admin/reviews")({
  head: () => ({
    meta: [
      { title: "Reviews — Sakhi" },
      {
        name: "description",
        content: "Customer reviews of Care Partners.",
      },
      { property: "og:title", content: "Reviews — Sakhi" },
      {
        property: "og:description",
        content: "Customer reviews of Care Partners.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminReviews />
    </RoleGate>
  ),
});

function PageAuthenticatedAdminReviews() {
  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "reviews"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Reviews"
      description="Customer reviews of Care Partners."
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading reviews...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load reviews
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading reviews."}
          </p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="surface-card p-8 text-center">
          <h2 className="text-lg font-medium">
            No reviews yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Customer reviews will appear here after completed
            bookings are reviewed.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}

function ReviewCard({
  review,
}: {
  review: any;
}) {
  return (
    <div className="surface-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Review ID
          </p>

          <p className="mt-1 break-all text-sm font-medium">
            {review.id}
          </p>
        </div>

        {review.status ? (
          <StatusBadge status={review.status} />
        ) : null}
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <InfoItem
          label="Rating"
          value={
            review.rating !== null &&
            review.rating !== undefined
              ? `${review.rating} / 5`
              : "—"
          }
        />

        <InfoItem
          label="Customer"
          value={
            review.customer_id ??
            review.profile_id ??
            review.user_id ??
            "—"
          }
        />

        <InfoItem
          label="Care Partner"
          value={
            review.care_partner_id ??
            "—"
          }
        />

        <InfoItem
          label="Booking"
          value={review.booking_id ?? "—"}
        />

        <InfoItem
          label="Created"
          value={
            review.created_at
              ? new Date(
                  review.created_at,
                ).toLocaleString()
              : "—"
          }
        />
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium">
          Review
        </p>

        <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
          {review.comment ??
            review.review_text ??
            review.body ??
            review.content ??
            "No written review."}
        </p>
      </div>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">
        {label}
      </p>

      <p className="mt-1 break-words text-sm">
        {value}
      </p>
    </div>
  );
}