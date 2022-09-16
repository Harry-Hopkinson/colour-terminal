# colour-terminal

A NPM Package that brings Color to your Terminal.

## Usage

```bash
npm install --save-dev colour-terminal
yarn add --dev colour-terminal
```

```js
import { red, cyan } from "colour-terminal";

console.log(red(`Error: something failed in ${cyan("file.js")}.`));
```

Strip colors from a string:

```js
import { red, stripColors } from "colour-terminal";

console.log(stripColors(red("foo")));
// Logs 'foo'
```
