#!/usr/bin/env node

const idchunk = require("../src/index.js");
const pkg = require("../package.json");

const args = process.argv.slice(2);

function printHelp() {
  console.log(`
⚡ idchunk v${pkg.version} — Tiny, Fast & Customizable ID Generator

Usage:
  npx idchunk [options]
  idchunk [options]

Options:
  -l, --length <number>   Length of the generated ID (default: 10)
  -n, --numeric           Generate numeric-only ID (e.g. OTP / PIN)
  -a, --alpha             Generate alphanumeric ID [a-zA-Z0-9]
  -x, --hex               Generate hexadecimal ID [0-9a-f]
  -c, --custom <string>   Generate ID using custom alphabet characters
  -b, --batch <number>    Number of unique IDs to generate (default: 1)
  -v, --version           Show version number
  -h, --help              Show this help message

Examples:
  npx idchunk                     # Standard 10-char ID: aZ8_-kL2pQ
  npx idchunk -l 16               # 16-char ID: bQ9pL2_-aZ8kL2pQ
  npx idchunk -n -l 6             # 6-digit OTP: 492810
  npx idchunk -x -l 8             # 8-char Hex: 3f8a12bc
  npx idchunk -c "ABC123" -l 8    # Custom: 1A23BCAB
  npx idchunk -b 5                # 5 unique IDs
`);
}

function parseArgs(args) {
  const options = {
    length: undefined,
    type: "default",
    custom: undefined,
    batch: 1,
  };

  for (let i = 0; i < args.length; i++) {
    const arg = args[i];

    if (arg === "-h" || arg === "--help") {
      printHelp();
      process.exit(0);
    }

    if (arg === "-v" || arg === "--version") {
      console.log(pkg.version);
      process.exit(0);
    }

    if (arg === "-l" || arg === "--length") {
      const val = parseInt(args[++i], 10);
      if (isNaN(val) || val < 0) {
        console.error("Error: --length must be a positive number.");
        process.exit(1);
      }
      options.length = val;
      continue;
    }

    if (arg === "-n" || arg === "--numeric" || arg === "--num") {
      options.type = "numeric";
      continue;
    }

    if (arg === "-a" || arg === "--alpha" || arg === "--alphanumeric") {
      options.type = "alphanumeric";
      continue;
    }

    if (arg === "-x" || arg === "--hex") {
      options.type = "hex";
      continue;
    }

    if (arg === "-c" || arg === "--custom") {
      const val = args[++i];
      if (!val || typeof val !== "string" || val.length === 0) {
        console.error("Error: --custom requires a non-empty character string.");
        process.exit(1);
      }
      options.type = "custom";
      options.custom = val;
      continue;
    }

    if (arg === "-b" || arg === "--batch") {
      const val = parseInt(args[++i], 10);
      if (isNaN(val) || val <= 0) {
        console.error("Error: --batch must be a positive integer.");
        process.exit(1);
      }
      options.batch = val;
      continue;
    }

    // Positional argument for length (e.g. `npx idchunk 16`)
    if (/^\d+$/.test(arg) && options.length === undefined) {
      options.length = parseInt(arg, 10);
      continue;
    }

    console.error(`Unknown option: ${arg}\nRun 'idchunk --help' for usage.`);
    process.exit(1);
  }

  return options;
}

function run() {
  const options = parseArgs(args);

  let generator;
  if (options.type === "numeric") {
    const len = options.length ?? 6;
    generator = () => idchunk.numeric(len);
  } else if (options.type === "alphanumeric") {
    const len = options.length ?? 10;
    generator = () => idchunk.alphanumeric(len);
  } else if (options.type === "hex") {
    const len = options.length ?? 8;
    generator = () => idchunk.hex(len);
  } else if (options.type === "custom") {
    const len = options.length ?? 10;
    generator = () => idchunk(len, options.custom);
  } else {
    const len = options.length ?? 10;
    generator = () => idchunk(len);
  }

  if (options.batch > 1) {
    const set = new Set();
    let attempts = 0;
    const maxAttempts = options.batch * 10;
    while (set.size < options.batch && attempts < maxAttempts) {
      set.add(generator());
      attempts++;
    }
    for (const id of set) {
      console.log(id);
    }
  } else {
    console.log(generator());
  }
}

run();
