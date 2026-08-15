/**
 * idchunk — Tiny, Fast & Customizable ID Generator
 * TypeScript Declaration File
 */

export interface Alphabets {
  urlSafe: string;
  alphanumeric: string;
  numeric: string;
  hex: string;
  lowercase: string;
  uppercase: string;
}

export type CustomGenerator = (length?: number) => string;

/**
 * Generate a random ID string using secure random bytes and uniform character mapping.
 *
 * @param length Length of the generated ID (default: 10)
 * @param customValues Allowed character set (default: 64-char URL safe alphabet)
 * @returns Generated ID string
 *
 * @example
 * ```ts
 * import idchunk from 'idchunk';
 * const id = idchunk(); // "aZ8_-kL2pQ"
 * const customId = idchunk(8, 'ABC123'); // "1A23BCAB"
 * ```
 */
export declare function idchunk(length?: number, customValues?: string): string;

export declare namespace idchunk {
  /**
   * Generates a numeric-only ID (e.g. OTPs or PINs).
   * @param length Length of the numeric ID (default: 6)
   */
  export function numeric(length?: number): string;

  /**
   * Generates an alphanumeric ID (letters and numbers).
   * @param length Length of the ID (default: 10)
   */
  export function alphanumeric(length?: number): string;

  /**
   * Generates a URL-safe ID containing `[a-zA-Z0-9_-]`.
   * @param length Length of the ID (default: 10)
   */
  export function urlSafe(length?: number): string;

  /**
   * Generates a hexadecimal ID `[0-9a-f]`.
   * @param length Length of the ID (default: 8)
   */
  export function hex(length?: number): string;

  /**
   * Creates a reusable generator function configured with a custom alphabet.
   * @param alphabet String of allowed characters
   * @param defaultLength Default length for generated IDs (default: 10)
   * @returns A custom generator function
   */
  export function custom(alphabet: string, defaultLength?: number): CustomGenerator;

  /**
   * Generates an array of unique random IDs.
   * @param count Number of unique IDs to generate
   * @param length Length of each ID (default: 10)
   * @param customValues Allowed character set (default: urlSafe)
   * @returns Array of unique ID strings
   */
  export function batch(count: number, length?: number, customValues?: string): string[];

  /**
   * Standard predefined alphabet strings.
   */
  export const alphabets: Alphabets;
}

export declare const numeric: typeof idchunk.numeric;
export declare const alphanumeric: typeof idchunk.alphanumeric;
export declare const urlSafe: typeof idchunk.urlSafe;
export declare const hex: typeof idchunk.hex;
export declare const custom: typeof idchunk.custom;
export declare const batch: typeof idchunk.batch;
export declare const alphabets: Alphabets;

export default idchunk;
