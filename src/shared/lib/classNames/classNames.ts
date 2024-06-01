export const classNames = (
  classes: string,
  mods?: Record<string, boolean>,
  additionalClasses?: string[]
): string => {
  return [
    classes,
    Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([classes]) => classes),
    ...additionalClasses,
  ].join(" ");
};
