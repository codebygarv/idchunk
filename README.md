# ⚡ idchunk — Tiny, Fast & Customizable ID Generator

<table width="100%">
  <tr>
    <td>
      <a href="https://www.npmjs.com/package/idchunk">
        <img src="https://img.shields.io/npm/v/idchunk.svg" alt="npm version"/>
      </a>
      <a href="https://www.npmjs.com/package/idchunk">
        <img src="https://img.shields.io/npm/dt/idchunk.svg" alt="downloads"/>
      </a>
      <a href="https://github.com/garvthakral/idchunk/blob/main/LICENSE">
        <img src="https://img.shields.io/npm/l/idchunk.svg" alt="license"/>
      </a>
    </td>
    <td>
      <a href="https://idchunk.netlify.app/">
        <img src="https://i.pinimg.com/736x/d0/68/64/d06864b8b20b18921e465d401fa605e4.jpg" alt="idchunk barcode" width="60"/>
      </a>
    </td>
  </tr>
</table>

> Generate short, secure, and customizable IDs for your applications in **milliseconds**.

---

## ✨ Features
- **Tiny:** Zero dependencies, minimal footprint.
- **Secure & Fast:** Uses Node.js [`crypto`](https://nodejs.org/api/crypto.html).
- **Customizable:** Choose length *and* your own character set.
- **Reliable:** Collision-resistant random IDs.

---

## 📦 Installation

```bash
npm install idchunk
```

---

## Usage

By default, `idchunk()` generates a random ID of length **10**:

```js
const idchunk = require("idchunk");

console.log(idchunk()); 
// Example: "aZ8_-kL2pQ"
```

You can specify a custom length:

```js
console.log(idchunk(16)); 
// Example: "bQ9pL2_-aZ8kL2pQ"
```

Custom character set:

```js
const customValues = "ABC123";
console.log(idchunk(8, customValues)); 
// Example: "1A23BCAB"
```



---

## API

### `idchunk(length?: number, customValues?: string): string`

- `length` (optional) → Length of the ID (default: 10).

- `customValues` (optional) → String of allowed characters (default: a-zA-Z0-9_-).

- Returns: Random string ID.
---

## How It Works

- Uses Node.js [`crypto`](https://nodejs.org/api/crypto.html) for secure random number generation.
- Character set: `a-z`, `A-Z`, `0-9`, `_`, `-`.

---

## 📄 License

MIT © [Garv Thakral](https://github.com/codebygarv)

---

## Documentation

Read full documentation here : [**Read Docs**](https://idchunk.netlify.app/)