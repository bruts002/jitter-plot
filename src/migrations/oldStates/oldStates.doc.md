# Old States

## Purpose
> The states here are for testing the migrations as the Redux store version is updated. 

## How
To test it, edit the `reHydrateStore` function in `src/index.js` to use an old state instead of the saved state in local storage.

It should look something like:
```js
import v0State from './migrations/oldStates/v0State';
const reHydrateStore = () => {
    return migrate(v0State);
};
```
