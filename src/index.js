/**
 * idchunk — Tiny, Fast & Customizable ID Generator
 * Zero dependencies, cross-platform (Node.js, Browsers, Bun, Deno, Workers)
 * Author: Garv Thakral <https://github.com/codebygarv>
 * License: MIT
 */

let nodeCrypto;
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  nodeCrypto = require("crypto");
} catch {
  nodeCrypto = null;
}

const ALPHABETS = {
  urlSafe: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-",
  alphanumeric: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numeric: "0123456789",
  hex: "0123456789abcdef",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
};

const DEFAULT_VALUES = ALPHABETS.urlSafe;

/**
 * Fills a Uint8Array with cryptographically secure random bytes
 * @param {Uint8Array} buffer
 * @returns {Uint8Array}
 */
function fillRandomBytes(buffer) {
  if (typeof globalThis.crypto !== "undefined" && typeof globalThis.crypto.getRandomValues === "function") {
    return globalThis.crypto.getRandomValues(buffer);
  }
  if (nodeCrypto && typeof nodeCrypto.randomFillSync === "function") {
    return nodeCrypto.randomFillSync(buffer);
  }
  if (nodeCrypto && typeof nodeCrypto.randomBytes === "function") {
    const bytes = nodeCrypto.randomBytes(buffer.length);
    buffer.set(bytes);
    return buffer;
  }
  // Universal fallback if crypto unavailable
  for (let i = 0; i < buffer.length; i++) {
    buffer[i] = Math.floor(Math.random() * 256);
  }
  return buffer;
}

/**
 * Generate a random ID string using secure random bytes and uniform character mapping
 * @param {number} [length=10] - Length of the generated ID
 * @param {string} [customValues=DEFAULT_VALUES] - Allowed character set
 * @returns {string} Generated ID
 */
function idchunk(length = 10, customValues = DEFAULT_VALUES) {
  if (typeof customValues !== "string" || customValues.length === 0) {
    throw new Error("customValues must be a non-empty string");
  }

  const targetLength = Math.max(0, Math.floor(Number(length) || 0));
  if (targetLength === 0) return "";

  const alphabetLength = customValues.length;

  // Fast-path optimization: Default 64-char alphabet (256 % 64 === 0, perfect uniform distribution with zero bias)
  if (alphabetLength === 64 && customValues === DEFAULT_VALUES) {
    const bytes = new Uint8Array(targetLength);
    fillRandomBytes(bytes);
    let result = "";
    for (let i = 0; i < targetLength; i++) {
      result += customValues[bytes[i] & 63];
    }
    return result;
  }

  // Fast-path: Power of 2 alphabets (16 hex, 32, etc.)
  if ((alphabetLength & (alphabetLength - 1)) === 0 && alphabetLength <= 256) {
    const mask = alphabetLength - 1;
    const bytes = new Uint8Array(targetLength);
    fillRandomBytes(bytes);
    let result = "";
    for (let i = 0; i < targetLength; i++) {
      result += customValues[bytes[i] & mask];
    }
    return result;
  }

  // General path with rejection sampling to eliminate modulo bias
  const limit = 256 - (256 % alphabetLength);
  let result = "";
  let bufferSize = Math.ceil(targetLength * 1.5);
  let bytes = new Uint8Array(bufferSize);
  fillRandomBytes(bytes);
  let byteIndex = 0;

  while (result.length < targetLength) {
    if (byteIndex >= bytes.length) {
      fillRandomBytes(bytes);
      byteIndex = 0;
    }
    const byte = bytes[byteIndex++];
    if (byte < limit) {
      result += customValues[byte % alphabetLength];
    }
  }

  return result;
}

// Preset helpers
idchunk.numeric = (length = 6) => idchunk(length, ALPHABETS.numeric);
idchunk.alphanumeric = (length = 10) => idchunk(length, ALPHABETS.alphanumeric);
idchunk.urlSafe = (length = 10) => idchunk(length, ALPHABETS.urlSafe);
idchunk.hex = (length = 8) => idchunk(length, ALPHABETS.hex);

/**
 * Creates a reusable custom ID generator function with a fixed alphabet and optional default length
 * @param {string} alphabet - Allowed characters
 * @param {number} [defaultLength=10] - Default length
 * @returns {(length?: number) => string}
 */
idchunk.custom = function (alphabet, defaultLength = 10) {
  if (typeof alphabet !== "string" || alphabet.length === 0) {
    throw new Error("alphabet must be a non-empty string");
  }
  return (length = defaultLength) => idchunk(length, alphabet);
};

/**
 * Generate a batch of unique random IDs
 * @param {number} count - Number of IDs to generate
 * @param {number} [length=10] - Length of each ID
 * @param {string} [customValues=DEFAULT_VALUES] - Allowed characters
 * @returns {string[]} Array of unique IDs
 */
idchunk.batch = function (count, length = 10, customValues = DEFAULT_VALUES) {
  const total = Math.max(0, Math.floor(Number(count) || 0));
  const set = new Set();
  let attempts = 0;
  const maxAttempts = total * 10;

  while (set.size < total && attempts < maxAttempts) {
    set.add(idchunk(length, customValues));
    attempts++;
  }

  return Array.from(set);
};

idchunk.alphabets = ALPHABETS;

module.exports = idchunk;
