/**
 * Combine class names; falsy values are omitted.
 */
export function cn(
  ...classes: Array<string | undefined | false | null>
): string {
  return classes.filter(Boolean).join(' ');
}
