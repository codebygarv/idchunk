const crypto = require("crypto");

const DEFAULT_VALUES = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";

function idchunk(length = 10, customValues = DEFAULT_VALUES) {
    if (typeof customValues !== "string" || customValues.length === 0) {
        throw new Error("customValues must be a non-empty string");
    }
    let result = "";
    for (let i = 0; i < length; i++) {
        result += customValues[crypto.randomInt(0, customValues.length)];
    }
    return result;
}

module.exports = idchunk;