export const formatDateTime = (iso) => {
  if (!iso) return "No date available";

  const date = new Date(iso);
  if (isNaN(date)) return "No date available";

  const datePart = date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const timePart = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
  });

  return ` ${datePart} | ${timePart}`;
};
