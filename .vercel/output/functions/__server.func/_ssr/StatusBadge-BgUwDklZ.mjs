import "../_runtime.mjs";
import { _ as require_jsx_runtime, v as require_react } from "../_libs/@radix-ui/react-accordion+[...].mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { o as cn } from "./router-0JUlUF2v.mjs";
import { a as humanize } from "./format-C7GCbIxL.mjs";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var badgeVariants = cva("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
	variants: { variant: {
		default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
		secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
		destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
		outline: "text-foreground"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		...props
	});
}
var tone = {
	pending: "bg-warning/15 text-warning-foreground border-warning/30",
	not_started: "bg-muted text-muted-foreground border-border",
	not_submitted: "bg-muted text-muted-foreground border-border",
	in_review: "bg-warning/15 text-warning-foreground border-warning/30",
	in_progress: "bg-accent/40 text-accent-foreground border-accent",
	accepted: "bg-accent/40 text-accent-foreground border-accent",
	confirmed: "bg-accent/40 text-accent-foreground border-accent",
	approved: "bg-success/15 text-success border-success/30",
	verified: "bg-success/15 text-success border-success/30",
	completed: "bg-success/15 text-success border-success/30",
	resolved: "bg-success/15 text-success border-success/30",
	open: "bg-warning/15 text-warning-foreground border-warning/30",
	investigating: "bg-accent/40 text-accent-foreground border-accent",
	rejected: "bg-destructive/10 text-destructive border-destructive/25",
	cancelled: "bg-destructive/10 text-destructive border-destructive/25",
	dismissed: "bg-muted text-muted-foreground border-border",
	failed: "bg-destructive/10 text-destructive border-destructive/25"
};
function StatusBadge({ status, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		variant: "outline",
		className: cn("border font-medium", tone[status] ?? "bg-muted text-muted-foreground", className),
		children: humanize(status)
	});
}
//#endregion
export { StatusBadge as t };
