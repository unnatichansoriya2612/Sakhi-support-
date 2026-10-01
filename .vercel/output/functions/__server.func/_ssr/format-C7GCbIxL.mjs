//#region node_modules/.nitro/vite/services/ssr/assets/format-C7GCbIxL.js
function formatCurrency(amount, currency = "INR") {
	const value = typeof amount === "string" ? Number(amount) : amount;
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency,
		maximumFractionDigits: 0
	}).format(Number.isFinite(value) ? value : 0);
}
function formatDate(date) {
	return (/* @__PURE__ */ new Date(date + (date.length === 10 ? "T00:00:00" : ""))).toLocaleDateString("en-IN", {
		weekday: "short",
		day: "numeric",
		month: "short",
		year: "numeric"
	});
}
function formatTime(time) {
	const [h, m] = time.split(":");
	const hour = Number(h);
	const suffix = hour >= 12 ? "PM" : "AM";
	return `${hour % 12 === 0 ? 12 : hour % 12}:${m} ${suffix}`;
}
function humanize(value) {
	return value.split("_").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" ");
}
function addHoursToTime(start, hours) {
	const [h, m] = start.split(":").map(Number);
	const total = h * 60 + m + Math.round(hours * 60);
	const endH = Math.floor(total / 60);
	const endM = total % 60;
	if (endH >= 24) return "23:59";
	return `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`;
}
function todayISO() {
	return (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
}
//#endregion
export { humanize as a, formatTime as i, formatCurrency as n, todayISO as o, formatDate as r, addHoursToTime as t };
