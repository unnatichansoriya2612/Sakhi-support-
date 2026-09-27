import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { DashboardShell, adminNav } from "@/components/site/DashboardShell";
import { RoleGate } from "@/components/site/RoleGate";
import { StatusBadge } from "@/components/site/StatusBadge";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/_authenticated/admin/complaints")({
  head: () => ({
    meta: [
      { title: "Complaints — Sakhi" },
      { name: "description", content: "Safety and service complaints." },
      { property: "og:title", content: "Complaints — Sakhi" },
      { property: "og:description", content: "Safety and service complaints." },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminComplaints />
    </RoleGate>
  ),
});

function PageAuthenticatedAdminComplaints() {
  const queryClient = useQueryClient();

  const {
    data: complaints,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["admin", "complaints"],

    queryFn: async () => {
      const { data, error } = await supabase
        .from("complaints")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;

      return data ?? [];
    },
  });

  async function updateComplaint(
    complaintId: string,
    status: string,
    adminNotes: string,
  ) {
    const { error } = await supabase
      .from("complaints")
      .update({
        status,
        admin_notes: adminNotes.trim() || null,
      })
      .eq("id", complaintId);

    if (error) {
      toast.error(error.message);
      return;
    }

    await queryClient.invalidateQueries({
      queryKey: ["admin", "complaints"],
    });

    toast.success("Complaint updated.");
  }

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Complaints"
      description="Review and manage safety and service complaints."
    >
      {isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading complaints...
        </p>
      ) : error ? (
        <div className="surface-card p-6">
          <h2 className="text-lg font-medium">
            Could not load complaints
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "Something went wrong while loading complaints."}
          </p>
        </div>
      ) : complaints.length === 0 ? (
        <div className="surface-card p-8 text-center">
          <h2 className="text-lg font-medium">
            No complaints yet
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            New safety or service complaints will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {complaints.map((complaint) => (
            <ComplaintCard
              key={complaint.id}
              complaint={complaint}
              onUpdate={updateComplaint}
            />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}

function ComplaintCard({
  complaint,
  onUpdate,
}: {
  complaint: any;
  onUpdate: (
    id: string,
    status: string,
    adminNotes: string,
  ) => Promise<void>;
}) {
  const [adminNotes, setAdminNotes] = useState(
    complaint.admin_notes ?? "",
  );

  const status = complaint.status ?? "open";

  return (
    <div className="surface-card p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs text-muted-foreground">
            Complaint ID
          </p>

          <p className="mt-1 break-all text-sm font-medium">
            {complaint.id}
          </p>
        </div>

        <StatusBadge status={status} />
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <InfoItem
          label="Booking ID"
          value={complaint.booking_id ?? "—"}
        />

        <InfoItem
          label="Created"
          value={
            complaint.created_at
              ? new Date(complaint.created_at).toLocaleString()
              : "—"
          }
        />

        <InfoItem
          label="Complaint type"
          value={complaint.category ?? complaint.type ?? "—"}
        />

        <InfoItem
          label="Reported by"
          value={
            complaint.reported_by ??
            complaint.customer_id ??
            complaint.profile_id ??
            "—"
          }
        />
      </div>

      <div className="mt-6">
        <p className="text-sm font-medium">
          Complaint
        </p>

        <p className="mt-2 whitespace-pre-wrap text-sm text-muted-foreground">
          {complaint.description ??
            complaint.message ??
            complaint.details ??
            "No description provided."}
        </p>
      </div>

      <div className="mt-6 space-y-2">
        <Label htmlFor={`admin-notes-${complaint.id}`}>
          Admin notes
        </Label>

        <Textarea
          id={`admin-notes-${complaint.id}`}
          rows={4}
          value={adminNotes}
          onChange={(event) =>
            setAdminNotes(event.target.value)
          }
          placeholder="Add investigation notes or a message for the user."
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {status !== "investigating" && (
          <Button
            variant="outline"
            onClick={() =>
              onUpdate(
                complaint.id,
                "investigating",
                adminNotes,
              )
            }
          >
            Mark investigating
          </Button>
        )}

        {status !== "resolved" && (
          <Button
            onClick={() =>
              onUpdate(
                complaint.id,
                "resolved",
                adminNotes,
              )
            }
          >
            Resolve
          </Button>
        )}

        {status !== "dismissed" && (
          <Button
            variant="outline"
            onClick={() =>
              onUpdate(
                complaint.id,
                "dismissed",
                adminNotes,
              )
            }
          >
            Dismiss
          </Button>
        )}
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