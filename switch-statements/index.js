// BEFORE

// register handler
document.addEventListener('keydown', (event) => {
    // define cases
    // define control-flow
    // execute control-flow
    switch (event.keyCode) {
        case 32:
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

// AFTER

// define cases
const handlers = {
    32: () => console.log('space'),
    13: () => console.log('enter'),
    8: () => console.log('backspace')
};

// register handler
document.addEventListener('keydown', (event) => {
    // execute control-flow
    check(handlers, event, event.keyCode);
});

// define control flow
function check(handlers, event) {
    for (const key in handlers) {
        if (key === event.keyCode) {
            handlers[key](event);
        }
    }
}

function check(handlers, event) {
    const key = event.keyCode;
    const handler = handlers[key];
    if (handler) handlers[key](event);
}

/**
 * @param {string} left 
 * @param {string} right 
 * @returns {boolean}
 * Uses a 'for...of' iterator
 */
function isAnagram(left, right) {
    const result = right.split('');

    for (const char of left) {
        const found = result.indexOf(char);
        if (found < 0) return false;
        result.splice(found, 1);
    }

    return result.length === 0;
}

console.log(isAnagram('cat!', '!tac'));