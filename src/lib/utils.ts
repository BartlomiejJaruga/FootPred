/**
 * Sorts an array of strings alphabetically using English locale rules.
 * @param {string[]} list - The array of strings to be sorted.
 * @returns {string[]} A new sorted array (the original array remains mutated).
 * @example
 * const teams = ['Poland', 'England', 'Germany'];
 * const sorted = sortListAlphabetically(teams);
 * // Result: ['England', 'Germany', 'Poland']
 */
export function sortListAlphabetically(list: string[]): string[] {
  return [...list].sort((a, b) =>
    a.localeCompare(b, 'en', { sensitivity: 'base' })
  );
}
