# Toggle Democracy
[![npm version](https://img.shields.io/npm/v/toggle-democracy.svg?style=flat-square)](https://www.npmjs.com/package/toggle-democracy)


The totally useless package that grants you a React hook for converting a list of options to a democracy through pairs of options. Give the hook an initial state of options and receive the combinations of pairs running up for leadership, alongside the currently chosen leader and an api function to update chosen status between pairs of options.

```js
npm install toggle-democracy
```

## Usage
```js
import React from 'react';
import useToggleDemocracy from 'toggle-democracy';

const ExampleComponent = () => {
    const options = ['Foo', 'Bar', 'Baz'];
    const [state, api] = useToggleDemocracy(options);
    return (
        <div>Use your imagination!</div>
    )
}
```

## Documentation
| State | Description |
|:---|:---|
| `state.pairs`     | Object of objects, where each value is a pair object with props `id`, `firstValue`, `secondValue` and `selected`. |
| `state.leader`    | The currently selected leader among all options. |
| `api.updatePair`  | Function to update chosen status for a pair, called as `updatePair(id, selected)` |