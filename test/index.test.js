const test = require("node:test");
const assert = require("node:assert/strict");
const idchunk = require("../src/index.js");

test("idchunk - default parameters", () => {
  const id = idchunk();
  assert.equal(typeof id, "string");
  assert.equal(id.length, 10);
  assert.match(id, /^[a-zA-Z0-9_-]{10}$/);
});

test("idchunk - custom length", () => {
  assert.equal(idchunk(0).length, 0);
  assert.equal(idchunk(1).length, 1);
  assert.equal(idchunk(16).length, 16);
  assert.equal(idchunk(64).length, 64);
  assert.equal(idchunk(128).length, 128);
});

test("idchunk - custom alphabet", () => {
  const alphabet = "ABC";
  const id = idchunk(20, alphabet);
  assert.equal(id.length, 20);
  for (const char of id) {
    assert.ok(alphabet.includes(char), `Expected character '${char}' to be in '${alphabet}'`);
  }
});

test("idchunk - throws on invalid customValues", () => {
  assert.throws(() => idchunk(10, ""), {
    message: "customValues must be a non-empty string",
  });
  assert.throws(() => idchunk(10, null), {
    message: "customValues must be a non-empty string",
  });
  assert.throws(() => idchunk(10, 123), {
    message: "customValues must be a non-empty string",
  });
});

test("idchunk.numeric preset", () => {
  const id = idchunk.numeric();
  assert.equal(id.length, 6);
  assert.match(id, /^\d{6}$/);

  const id8 = idchunk.numeric(8);
  assert.equal(id8.length, 8);
  assert.match(id8, /^\d{8}$/);
});

test("idchunk.alphanumeric preset", () => {
  const id = idchunk.alphanumeric(12);
  assert.equal(id.length, 12);
  assert.match(id, /^[a-zA-Z0-9]{12}$/);
});

test("idchunk.urlSafe preset", () => {
  const id = idchunk.urlSafe(15);
  assert.equal(id.length, 15);
  assert.match(id, /^[a-zA-Z0-9_-]{15}$/);
});

test("idchunk.hex preset", () => {
  const id = idchunk.hex(16);
  assert.equal(id.length, 16);
  assert.match(id, /^[0-9a-f]{16}$/);
});

test("idchunk.custom factory", () => {
  const generateOTP = idchunk.custom("0123456789", 6);
  const otp = generateOTP();
  assert.equal(otp.length, 6);
  assert.match(otp, /^\d{6}$/);

  const customLengthOtp = generateOTP(4);
  assert.equal(customLengthOtp.length, 4);
  assert.match(customLengthOtp, /^\d{4}$/);

  assert.throws(() => idchunk.custom(""), {
    message: "alphabet must be a non-empty string",
  });
});

test("idchunk.batch generation", () => {
  const count = 50;
  const batch = idchunk.batch(count, 12);
  assert.equal(batch.length, count);

  const uniqueSet = new Set(batch);
  assert.equal(uniqueSet.size, count, "All generated IDs in batch must be unique");

  for (const id of batch) {
    assert.equal(id.length, 12);
    assert.match(id, /^[a-zA-Z0-9_-]{12}$/);
  }
});

test("idchunk.alphabets dictionary", () => {
  assert.ok(idchunk.alphabets.urlSafe);
  assert.ok(idchunk.alphabets.numeric);
  assert.ok(idchunk.alphabets.alphanumeric);
  assert.ok(idchunk.alphabets.hex);
  assert.ok(idchunk.alphabets.lowercase);
  assert.ok(idchunk.alphabets.uppercase);
});