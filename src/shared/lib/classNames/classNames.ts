export const classNames = (
  classes: string,
  mods: Record<string, boolean> = {},
  additionalClasses: string[] = []
): string =>
  [
    classes,
    ...Object.entries(mods)
      .filter(([_, value]) => Boolean(value))
      .map(([classes]) => classes),
    ...additionalClasses.filter(Boolean),
  ].join(' ');
