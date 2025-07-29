# ⚡ idchunk — A Tiny, Fast & Customizable ID Generator

[![npm version](https://img.shields.io/npm/v/idchunk.svg)](https://www.npmjs.com/package/idchunk)
[![downloads](https://img.shields.io/npm/dt/idchunk.svg)](https://www.npmjs.com/package/idchunk)
[![license](https://img.shields.io/npm/l/idchunk.svg)](https://github.com/garvthakral/idchunk/blob/main/LICENSE)

> Generate short, unique, and customizable IDs for your applications in milliseconds.

---

## Installation & Usage

```bash
npm install idchunk
```

By default the random generate id length is 10 

```
const idchunk = require("idchunk");

console.log(idchunk());
```

And you can pass the value as the arguement to the idchunk(length) in number to generate the id 
