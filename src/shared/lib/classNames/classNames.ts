export const classNames = (
  classes: string,
  mods: Record<string, boolean | undefined> = {},
  additionalClasses: (string | undefined)[] = [],
): string =>
  [
    classes,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([classes]) => classes),
    ...additionalClasses.filter(Boolean),
  ].join(" ");
