import { r as __toESM } from "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { a as Button } from "./router-0JUlUF2v.mjs";
import { n as RoleGate, r as adminNav, t as DashboardShell } from "./RoleGate-LM5M01cv.mjs";
import { t as Input } from "./input-CK6Py3SB.mjs";
import { t as Label } from "./label-CMlX8MRk.mjs";
import { t as Textarea } from "./textarea-DWvAtFt2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.tasks-B8WRYNFM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initialTasks = [
	{
		id: "cooking",
		name: "Cooking / Meal Preparation",
		description: "Simple meal preparation and basic kitchen assistance.",
		active: true
	},
	{
		id: "cleaning",
		name: "Light Cleaning",
		description: "Light household cleaning such as tidying rooms and basic cleaning.",
		active: true
	},
	{
		id: "errands",
		name: "Errands & Grocery Help",
		description: "Help with reasonable local errands and grocery-related tasks.",
		active: true
	},
	{
		id: "companionship",
		name: "Companionship",
		description: "Friendly conversation, sitting with the customer, and general companionship.",
		active: true
	},
	{
		id: "household",
		name: "Household Assistance",
		description: "Simple non-medical household assistance during the booked hours.",
		active: true
	},
	{
		id: "massage",
		name: "Comfort Massage",
		description: "Gentle comfort massage only. No medical or therapeutic procedures.",
		active: true
	}
];
function PageAuthenticatedAdminTasks() {
	const [tasks, setTasks] = (0, import_react.useState)(initialTasks);
	const [showForm, setShowForm] = (0, import_react.useState)(false);
	const [editingId, setEditingId] = (0, import_react.useState)(null);
	const [name, setName] = (0, import_react.useState)("");
	const [description, setDescription] = (0, import_react.useState)("");
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
	function startEditTask(task) {
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
		if (editingId) setTasks((currentTasks) => currentTasks.map((task) => task.id === editingId ? {
			...task,
			name: trimmedName,
			description: trimmedDescription
		} : task));
		else {
			const newTask = {
				id: `${Date.now()}`,
				name: trimmedName,
				description: trimmedDescription,
				active: true
			};
			setTasks((currentTasks) => [...currentTasks, newTask]);
		}
		resetForm();
	}
	function toggleTask(taskId) {
		setTasks((currentTasks) => currentTasks.map((task) => task.id === taskId ? {
			...task,
			active: !task.active
		} : task));
	}
	function deleteTask(taskId) {
		if (!window.confirm("Are you sure you want to delete this task?")) return;
		setTasks((currentTasks) => currentTasks.filter((task) => task.id !== taskId));
	}
	const activeTasks = tasks.filter((task) => task.active);
	const inactiveTasks = tasks.filter((task) => !task.active);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardShell, {
		nav: adminNav,
		eyebrow: "Admin",
		title: "Care Tasks",
		description: "Manage the catalogue of supported non-medical care tasks.",
		actions: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			type: "button",
			onClick: startAddTask,
			children: "Add task"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: "Supported Care Tasks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "These are the types of non-medical support that Sakhi Care Partners may provide during a booking."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-lg bg-sand p-4 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Important"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-muted-foreground",
								children: "Sakhi Care Partners do not provide medical treatment, injections, medication decisions, wound care, clinical procedures, or other professional medical services."
							})]
						})
					]
				}),
				showForm ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "surface-card p-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex items-start justify-between gap-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-medium",
							children: editingId ? "Edit task" : "Add new task"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted-foreground",
							children: "Add a simple description that customers can understand."
						})] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "task-name",
									children: "Task name"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									id: "task-name",
									value: name,
									onChange: (event) => setName(event.target.value),
									placeholder: "Example: Meal Preparation",
									maxLength: 100
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
									htmlFor: "task-description",
									children: "Description"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									id: "task-description",
									rows: 4,
									value: description,
									onChange: (event) => setDescription(event.target.value),
									placeholder: "Describe what this task includes.",
									maxLength: 500
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									onClick: saveTask,
									children: editingId ? "Save changes" : "Add task"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									onClick: resetForm,
									children: "Cancel"
								})]
							})
						]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4 flex items-center justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Active tasks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "Tasks currently supported by Sakhi."
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "rounded-full bg-sand px-3 py-1 text-xs",
						children: [activeTasks.length, " active"]
					})]
				}), activeTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "surface-card p-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "No active tasks."
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: activeTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskCard, {
						task,
						onEdit: () => startEditTask(task),
						onToggle: () => toggleTask(task.id),
						onDelete: () => deleteTask(task.id)
					}, task.id))
				})] }),
				inactiveTasks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-lg font-medium",
						children: "Inactive tasks"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: "These tasks are currently unavailable."
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: inactiveTasks.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskCard, {
						task,
						onEdit: () => startEditTask(task),
						onToggle: () => toggleTask(task.id),
						onDelete: () => deleteTask(task.id)
					}, task.id))
				})] }) : null
			]
		})
	});
}
function TaskCard({ task, onEdit, onToggle, onDelete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `surface-card p-6 ${!task.active ? "opacity-70" : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "text-lg font-medium",
						children: task.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: `rounded-full px-2.5 py-1 text-xs ${task.active ? "bg-sand" : "border border-border text-muted-foreground"}`,
						children: task.active ? "Active" : "Inactive"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: task.description
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: onEdit,
						children: "Edit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: onToggle,
						children: task.active ? "Deactivate" : "Activate"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						size: "sm",
						variant: "outline",
						onClick: onDelete,
						children: "Delete"
					})
				]
			})]
		})
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleGate, {
	allow: ["admin"],
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageAuthenticatedAdminTasks, {})
});
//#endregion
export { SplitComponent as component };
