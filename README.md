# Execute command with well-formatted output

## Installation

```sh
npm install --save @sweetalert2/execute
```

## Usage

```js
const execute = require('@sweetalert2/execute')

await execute(`git add .`, { skipLogging: true })
```
