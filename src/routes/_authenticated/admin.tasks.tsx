import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
  DashboardShell,
  adminNav,
} from "@/components/site/DashboardShell";

import { RoleGate } from "@/components/site/RoleGate";

export const Route = createFileRoute("/_authenticated/admin/tasks")({
  head: () => ({
    meta: [
      { title: "Care Tasks — Sakhi" },
      {
        name: "description",
        content: "Manage the catalogue of supported Sakhi care tasks.",
      },
      {
        property: "og:title",
        content: "Care Tasks — Sakhi",
      },
      {
        property: "og:description",
        content: "Manage the catalogue of supported Sakhi care tasks.",
      },
    ],
  }),

  component: () => (
    <RoleGate allow={["admin"]}>
      <PageAuthenticatedAdminTasks />
    </RoleGate>
  ),
});

type CareTask = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};

const initialTasks: CareTask[] = [
  {
    id: "cooking",
    name: "Cooking / Meal Preparation",
    description:
      "Simple meal preparation and basic kitchen assistance.",
    active: true,
  },
  {
    id: "cleaning",
    name: "Light Cleaning",
    description:
      "Light household cleaning such as tidying rooms and basic cleaning.",
    active: true,
  },
  {
    id: "errands",
    name: "Errands & Grocery Help",
    description:
      "Help with reasonable local errands and grocery-related tasks.",
    active: true,
  },
  {
    id: "companionship",
    name: "Companionship",
    description:
      "Friendly conversation, sitting with the customer, and general companionship.",
    active: true,
  },
  {
    id: "household",
    name: "Household Assistance",
    description:
      "Simple non-medical household assistance during the booked hours.",
    active: true,
  },
  {
    id: "massage",
    name: "Comfort Massage",
    description:
      "Gentle comfort massage only. No medical or therapeutic procedures.",
    active: true,
  },
];

function PageAuthenticatedAdminTasks() {
  const [tasks, setTasks] = useState<CareTask[]>(initialTasks);

  const [showForm, setShowForm] = useState(false);

  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function resetForm() {
    setName("");
    setDescription("");
    setEditingId(null);
    setShowForm(false);
  }

  function startAddTask() {
    setName("");
    setDescription("");
    setEditingId(null);
    setShowForm(true);
  }

  function startEditTask(task: CareTask) {
    setEditingId(task.id);
    setName(task.name);
    setDescription(task.description);
    setShowForm(true);
  }

  function saveTask() {
    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (!trimmedName) {
      window.alert("Please enter a task name.");
      return;
    }

    if (!trimmedDescription) {
      window.alert("Please enter a task description.");
      return;
    }

    if (editingId) {
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === editingId
            ? {
                ...task,
                name: trimmedName,
                description: trimmedDescription,
              }
            : task,
        ),
      );
    } else {
      const newTask: CareTask = {
        id: `${Date.now()}`,
        name: trimmedName,
        description: trimmedDescription,
        active: true,
      };

      setTasks((currentTasks) => [...currentTasks, newTask]);
    }

    resetForm();
  }

  function toggleTask(taskId: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              active: !task.active,
            }
          : task,
      ),
    );
  }

  function deleteTask(taskId: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?",
    );

    if (!confirmed) {
      return;
    }

    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId),
    );
  }

  const activeTasks = tasks.filter((task) => task.active);
  const inactiveTasks = tasks.filter((task) => !task.active);

  return (
    <DashboardShell
      nav={adminNav}
      eyebrow="Admin"
      title="Care Tasks"
      description="Manage the catalogue of supported non-medical care tasks."
      actions={
        <Button type="button" onClick={startAddTask}>
          Add task
        </Button>
      }
    >
      <div className="space-y-6">
        {/* INFORMATION */}
        <div className="surface-card p-5">
          <h2 className="text-lg font-medium">
            Supported Care Tasks
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            These are the types of non-medical support that Sakhi Care
            Partners may provide during a booking.
          </p>

          <div className="mt-4 rounded-lg bg-sand p-4 text-sm">
            <p className="font-medium">
              Important
            </p>

            <p className="mt-1 text-muted-foreground">
              Sakhi Care Partners do not provide medical treatment,
              injections, medication decisions, wound care, clinical
              procedures, or other professional medical services.
            </p>
          </div>
        </div>

        {/* ADD / EDIT FORM */}
        {showForm ? (
          <div className="surface-card p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-medium">
                  {editingId ? "Edit task" : "Add new task"}
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                  Add a simple description that customers can understand.
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="task-name">
                  Task name
                </Label>

                <Input
                  id="task-name"
                  value={name}
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                  placeholder="Example: Meal Preparation"
                  maxLength={100}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="task-description">
                  Description
                </Label>

                <Textarea
                  id="task-description"
                  rows={4}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="Describe what this task includes."
                  maxLength={500}
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <Button
                  type="button"
                  onClick={saveTask}
                >
                  {editingId ? "Save changes" : "Add task"}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={resetForm}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : null}

        {/* ACTIVE TASKS */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-medium">
                Active tasks
              </h2>

              <p className="text-sm text-muted-foreground">
                Tasks currently supported by Sakhi.
              </p>
            </div>

            <span className="rounded-full bg-sand px-3 py-1 text-xs">
              {activeTasks.length} active
            </span>
          </div>

          {activeTasks.length === 0 ? (
            <div className="surface-card p-6">
              <p className="text-sm text-muted-foreground">
                No active tasks.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => startEditTask(task)}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </div>
          )}
        </div>

        {/* INACTIVE TASKS */}
        {inactiveTasks.length > 0 ? (
          <div>
            <div className="mb-4">
              <h2 className="text-lg font-medium">
                Inactive tasks
              </h2>

              <p className="text-sm text-muted-foreground">
                These tasks are currently unavailable.
              </p>
            </div>

            <div className="space-y-4">
              {inactiveTasks.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={() => startEditTask(task)}
                  onToggle={() => toggleTask(task.id)}
                  onDelete={() => deleteTask(task.id)}
                />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </DashboardShell>
  );
}

function TaskCard({
  task,
  onEdit,
  onToggle,
  onDelete,
}: {
  task: CareTask;
  onEdit: () => void;
  onToggle: () => void;
  onDelete: () => void;
}) {
  return (
    <div
      className={`surface-card p-6 ${
        !task.active ? "opacity-70" : ""
      }`}
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-medium">
              {task.name}
            </h3>

            <span
              className={`rounded-full px-2.5 py-1 text-xs ${
                task.active
                  ? "bg-sand"
                  : "border border-border text-muted-foreground"
              }`}
            >
              {task.active ? "Active" : "Inactive"}
            </span>
          </div>

          <p className="mt-2 text-sm text-muted-foreground">
            {task.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onEdit}
          >
            Edit
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onToggle}
          >
            {task.active ? "Deactivate" : "Activate"}
          </Button>

          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}