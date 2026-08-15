# ⚡ idchunk — Tiny, Fast & Customizable ID Generator

[![npm version](https://img.shields.io/npm/v/idchunk.svg)](https://www.npmjs.com/package/idchunk)
[![npm downloads](https://img.shields.io/npm/dt/idchunk.svg)](https://www.npmjs.com/package/idchunk)
[![license](https://img.shields.io/npm/l/idchunk.svg)](https://github.com/codebygarv/idchunk/blob/main/LICENSE)
[![types](https://img.shields.io/badge/types-TypeScript-blue.svg)](https://github.com/codebygarv/idchunk)

> A lightweight, zero-dependency, and cryptographically uniform ID generator for Node.js, Browsers, Bun, Deno, and Edge Workers.

---

## ✨ Features

- **⚡ Blazing Fast:** Pre-allocated buffer generation with zero overhead.
- **🔒 Cryptographically Secure:** Zero modulo bias using rejection sampling and hardware crypto (`crypto.getRandomValues` / `node:crypto`).
- **📦 Zero Dependencies & Dual Module:** Full support for both **ESM** (`import`) and **CommonJS** (`require`).
- **🔷 TypeScript First:** Full type definitions included out of the box.
- **🎨 Built-in Presets:** Quick helpers for `numeric` (OTPs), `alphanumeric`, `hex`, `urlSafe`, and `batch` generation.
- **🛠️ Fully Customizable:** Define your own alphabet or create reusable custom ID generators.

---

## 📦 Installation

```bash
npm install idchunk
```

---

## 🚀 Quick Start

### ES Modules (import)
```javascript
import idchunk, { numeric, alphanumeric, hex, custom, batch } from "idchunk";

// Standard 10-character URL-safe ID
console.log(idchunk()); 
// e.g. "aZ8_-kL2pQ"

// Custom length
console.log(idchunk(16)); 
// e.g. "bQ9pL2_-aZ8kL2pQ"

// Numeric OTP (default length: 6)
console.log(numeric()); 
// e.g. "492810"

// Alphanumeric ID
console.log(alphanumeric(12)); 
// e.g. "9kLm2XpQ8vAz"

// Hexadecimal ID
console.log(hex(8)); 
// e.g. "f3a1b02e"
```

### CommonJS (require)
```javascript
const idchunk = require("idchunk");

console.log(idchunk());
console.log(idchunk.numeric(6));
console.log(idchunk.alphanumeric(12));
console.log(idchunk.hex(8));
```

---

## 🎯 Advanced Usage

### Custom Alphabet
Pass a custom string of allowed characters:

```javascript
const id = idchunk(8, "ABC123");
console.log(id); // e.g. "1A23BCAB"
```

### Reusable Custom Generator (`idchunk.custom`)
Create a pre-configured ID generator with your own alphabet and default size:

```javascript
const generatePin = idchunk.custom("0123456789", 4);

console.log(generatePin());  // "4819"
console.log(generatePin(6)); // "928371"
```

### Batch Unique Generation (`idchunk.batch`)
Generate multiple guaranteed unique IDs in a single call:

```javascript
const ids = idchunk.batch(5, 8);
console.log(ids);
// [ "k8LmP0qz", "X9vAqB1c", "Mn23_-Lp", "Pq90VbXc", "Zw82LoPq" ]
```

---

## 📖 API Reference

| Method | Parameters | Return Type | Description |
| :--- | :--- | :--- | :--- |
| `idchunk(length?, alphabet?)` | `length?: number` (default: 10)<br>`alphabet?: string` | `string` | Generates a random ID. |
| `idchunk.numeric(length?)` | `length?: number` (default: 6) | `string` | Generates numbers-only ID (e.g. OTPs). |
| `idchunk.alphanumeric(length?)` | `length?: number` (default: 10) | `string` | Generates alphanumeric `[a-zA-Z0-9]` ID. |
| `idchunk.urlSafe(length?)` | `length?: number` (default: 10) | `string` | Generates URL-safe `[a-zA-Z0-9_-]` ID. |
| `idchunk.hex(length?)` | `length?: number` (default: 8) | `string` | Generates hexadecimal `[0-9a-f]` ID. |
| `idchunk.custom(alphabet, length?)`| `alphabet: string`<br>`length?: number` (default: 10) | `(length?) => string` | Returns a reusable custom generator function. |
| `idchunk.batch(count, length?, alphabet?)` | `count: number`<br>`length?: number`<br>`alphabet?: string` | `string[]` | Returns an array of unique random IDs. |

---

## 🧪 Testing

Run the automated test suite:

```bash
npm test
```

---

## 📄 License

[MIT](LICENSE) © [Garv Thakral](https://github.com/codebygarv)