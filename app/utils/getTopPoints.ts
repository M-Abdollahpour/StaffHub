export const getTopPoints = (counts: Record<string, number>) => {
  const keys = Object.keys(counts);
  const max = Math.max(0, ...Object.values(counts));
  const tops = keys.filter((key) => counts[key] === max);
  if (keys.length > 1 && tops.length === keys.length) return [];

  return tops.map((key) => ({
    x: key,
    y: counts[key],
    seriesIndex: 0,
    label: {
      borderColor: "#775DD0",
      offsetY: 0,
      style: { color: "#fff", background: "#775DD0" },
      text: "Most hire",
    },
  }));
};
