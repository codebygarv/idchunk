/**
 * idchunk Performance Benchmark Suite
 */

import idchunk, { numeric, alphanumeric, hex, custom, batch } from "../src/index.mjs";

function benchmark(name, fn, iterations = 200_000) {
  // Warmup
  for (let i = 0; i < 5_000; i++) fn();

  const start = performance.now();
  for (let i = 0; i < iterations; i++) {
    fn();
  }
  const end = performance.now();
  const durationMs = end - start;
  const opsPerSec = Math.round((iterations / durationMs) * 1000);

  console.log(
    `  • ${name.padEnd(35)}: ${opsPerSec.toLocaleString().padStart(12)} ops/sec (${(durationMs / iterations * 1000).toFixed(2)} µs/op)`
  );
  return opsPerSec;
}

console.log("\n⚡ idchunk Performance Benchmark Suite\n" + "=".repeat(60));

benchmark("idchunk() [default, length=10]", () => idchunk());
benchmark("idchunk(16) [URL-safe, length=16]", () => idchunk(16));
benchmark("idchunk.numeric(6) [OTP]", () => numeric(6));
benchmark("idchunk.alphanumeric(12)", () => alphanumeric(12));
benchmark("idchunk.hex(16)", () => hex(16));

const customGen = custom("0123456789ABCDEF", 8);
benchmark("idchunk.custom() factory [8 hex]", () => customGen());

benchmark("idchunk.batch(10, 8)", () => batch(10, 8), 20_000);

console.log("=".repeat(60) + "\n");
