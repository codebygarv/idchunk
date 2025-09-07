let nodeCrypto;
try {
  nodeCrypto = require("crypto");
} catch {
  nodeCrypto = null;
}

const DEFAULT_VALUES =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

function getRandomInt(max) {
  if (nodeCrypto) {
    if (typeof nodeCrypto.randomInt === "function") {
      return nodeCrypto.randomInt(0, max);
    }
    if (typeof nodeCrypto.randomBytes === "function") {
      return nodeCrypto.randomBytes(1)[0] % max;
    }
  }

  if (typeof globalThis.crypto !== "undefined" && globalThis.crypto.getRandomValues) {
    const arr = new Uint32Array(1);
    globalThis.crypto.getRandomValues(arr);
    return arr[0] % max;
  }

  return Math.floor(Math.random() * max);
}

function idchunk(length = 10, customValues = DEFAULT_VALUES) {
  if (typeof customValues !== "string" || customValues.length === 0) {
    throw new Error("customValues must be a non-empty string");
  }

  let result = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(customValues.length);
    result += customValues[randomIndex];
  }
  return result;
}

module.exports = idchunk;
