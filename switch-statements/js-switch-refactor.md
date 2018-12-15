# Refactoring Javascript Switch statements with Object Literals

## Why are Switch Statements so useful in Javascript

Switch statements are a useful control-flow abstraction for scenarios in which the state of a single variable is used to determine how the program should branch to handle the given case.  Node and Web Browers lean heavily on event-driven programming models (EventEmitters, DOM EventListeners, Websockets, etc.)– in all these examples the state of an event may determine what code your program executes.  Therefore, there are many opportunities to use `switch`.  Here is a simple example of how one might use a switch in an event handler:

```
document.addEventListener('keydown', (event) => {
    switch (event.keyCode) {
        case 32:
            // imagine some complex stuff happens here
            console.log('space');
            break;
        case 8:
            console.log('backspace');
            break;
        case 13:
            console.log('enter');
            break;
    }
});
```

## Criticism of `switch`
One [might argue](https://javascript.info/switch) that `switch` is "a more descriptive way of comparing a value with multiple variants".  True, the switch _explicitly_ compares 1 expression against multiple cases.  Despite this additional context, `switch` still comes at the cost of undue cognitive overhead and poor signal-to-noise ratio.

### cognitive overhead
#### no curly brackets
In Javascript, curly brackets are required for multi-line blocks of code in `if` statements.  It's widely considered [bad practice](https://stackoverflow.com/questions/2125066/is-it-a-bad-practice-to-use-an-if-statement-without-curly-braces) to omit optional brackets in 1-line if statements:
```
// good
if (false) {
    doThis();
    doThat();
}

// broken
if (false) 
    doThis();
    // is not conditionally executed– not within the if block
    doThat();
 ```

In `switch`, the conditional block need not be wrapped in curly brackets:

```
// this works
switch (event.keyCode) {
    case 32:
        doThis();
        doThat();
        break;
```
The omission of curly brackets in a multi-line conditional is an irregularity of Javascript's lexical grammar that requires a specific, nonuniversal understanding of conditional blocks within `switch`.

#### No required curly brackets = confusing scoping

The scoping of `case` blocks in switch is confusing.  Curly brackets are not _required_ in multi-line conditional blocks in `switch`, but the scope of a nested block might break without them.  Here is a Redux example from [Elliot Himmelfarb's article](https://medium.com/@e_himmelfarb/use-curly-braces-with-es6-let-and-const-in-switch-blocks-react-redux-reducers-c0b01b37d748):


```
import * as types from '../constants/actionTypeConstraints';

// broken
export default (state = initialState, action) => {
    case types.ACTION_TYPES:
        const newState = Object.assign({}, state, { key: action.key });
        return newState;
    case types.ACTION_TWO:
        const newState = Object.assign({}, state, { key: action.key });
        return newState;
    default:
        return state;
}
```

Because the multi-line `case` block has the same multi-line properties of a `{}` wrapped `if` statement, one might erroneously believe that it has the same scoping properties.  This _is not_ the case.  The snippet above produces this syntax error:

```
SyntaxError: Identifier 'newState' has already been declared
```

One must wrap the case blocks in curly brackets:

```
import * as types from '../constants/actionTypeConstraints';

export default (state = initialState, action) => {
    case types.ACTION_TYPES: {
        const newState = Object.assign({}, state, { key: action.key });
        return newState;
    }
    case types.ACTION_TWO: {
        const newState = Object.assign({}, state, { key: action.key });
        return newState;
    }
    default:
        return state;
}
```

### signal-to-noise ratio
### `switch` munges concerns