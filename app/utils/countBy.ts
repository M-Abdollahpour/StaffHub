export const countBy = <T>(
  items: T[],
  getKey: (item: T) => string | undefined,
) => {
  const counts: Record<string, number> = {};
  items.forEach((item) => {
    const key = getKey(item);
    if (key) counts[key] = (counts[key] ?? 0) + 1;
  });
  return counts;
};
