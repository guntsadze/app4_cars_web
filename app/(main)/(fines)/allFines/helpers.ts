export const getStatusStyles = (status: string) => {
  const s = status?.toLowerCase();
  console.log("🚀 ~ getStatusStyles ~ s:", s);

  if (s === "გადახდილი" || s === "გადახდილია") {
    return "bg-green-500/10 hover:bg-green-500/20 text-green-700 dark:text-green-400 border-l-4 border-l-green-500";
  }

  if (s === "გადაუხდელი" || s === "გადაუხდელია") {
    return "bg-red-500/10 hover:bg-red-500/20 text-red-700 dark:text-red-400 border-l-4 border-l-red-500";
  }

  if (s === "ვადაგადაცილებული" || s === "ვადაგადაცილებულია") {
    return "bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-400 border-l-4 border-l-amber-500";
  }

  return "hover:bg-muted/50";
};
