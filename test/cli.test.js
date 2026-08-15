const test = require("node:test");
const assert = require("node:assert/strict");
const { execFileSync } = require("node:child_process");
const path = require("node:path");

const binPath = path.resolve(__dirname, "../bin/idchunk.js");

function runCLI(args = []) {
  return execFileSync(process.execPath, [binPath, ...args], {
    encoding: "utf8",
  }).trim();
}

test("CLI - default output", () => {
  const output = runCLI();
  assert.equal(output.length, 10);
  assert.match(output, /^[a-zA-Z0-9_-]{10}$/);
});

test("CLI - custom length with -l and positional", () => {
  const output1 = runCLI(["-l", "16"]);
  assert.equal(output1.length, 16);

  const output2 = runCLI(["20"]);
  assert.equal(output2.length, 20);
});

test("CLI - numeric OTP preset with -n", () => {
  const output = runCLI(["-n", "-l", "6"]);
  assert.equal(output.length, 6);
  assert.match(output, /^\d{6}$/);
});

test("CLI - alphanumeric with -a", () => {
  const output = runCLI(["-a", "-l", "12"]);
  assert.equal(output.length, 12);
  assert.match(output, /^[a-zA-Z0-9]{12}$/);
});

test("CLI - hex preset with -x", () => {
  const output = runCLI(["-x", "-l", "8"]);
  assert.equal(output.length, 8);
  assert.match(output, /^[0-9a-f]{8}$/);
});

test("CLI - custom alphabet with -c", () => {
  const output = runCLI(["-c", "ABC", "-l", "10"]);
  assert.equal(output.length, 10);
  assert.match(output, /^[ABC]{10}$/);
});

test("CLI - batch generation with -b", () => {
  const output = runCLI(["-b", "5", "-l", "8"]);
  const lines = output.split("\n").map((l) => l.trim()).filter(Boolean);
  assert.equal(lines.length, 5);
  const set = new Set(lines);
  assert.equal(set.size, 5);
});

test("CLI - help and version flags", () => {
  const helpOutput = runCLI(["--help"]);
  assert.ok(helpOutput.includes("Usage:"));
  assert.ok(helpOutput.includes("npx idchunk"));

  const versionOutput = runCLI(["--version"]);
  assert.match(versionOutput, /^\d+\.\d+\.\d+/);
});
