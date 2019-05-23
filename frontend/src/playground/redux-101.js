import { createStore } from "redux";

// Action generators - functions that return action objects - to then be used in store.dispatch calls.

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    // Can use object deconstruction to set defaults for both function argument and any objects passsed in.
    // Set default of argument to empty object (if not defined, will throw an error when accessing inrcrementBy)
    type: "INCREMENT",
    incrementBy: incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: "DECREMENT",
    decrementBy: decrementBy
});

const setCount = ({ count }) => ({
    type: "SET",
    count: count
});

const resetCount = () => ({
    type: "RESET"
});

// Reducers
// 1.  Reducers are pure functions (output is determined only by input)
// 2.  NEVER change state or action.  Just return a new object with new state.

const countReducer = (state = { count: 0 }, action) => {
    // countReducer takes a function with two arguments - state and action.
    // State is the default state object.  Action is an object with type defined - defines what happened.  The function is a reducer which describes how app state changes.
    switch (
        action.type // Switch statement to handle action types.
    ) {
        case "INCREMENT":
            return {
                count: state.count + action.incrementBy
            };
        case "DECREMENT":
            return {
                count: state.count - action.decrementBy
            };
        case "SET":
            return {
                count: action.count
            };
        case "RESET":
            return {
                count: 0 // Reset count to 0
            };
        default:
            return state; // Default for switch - do nothing
    }
};

const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
}); // function inside store.subscribe gets called automatically whenever the state changes.

// Actions - options that are dispatched to the store to change the state.
// Actions being dispatched to increment, reset, and decrement the count.
// Type is required as an object for all dispatch calls.  All other keys are optional to create dynamic dispatch calls.

// store.dispatch({
//     type: 'INCREMENT',
//     incrementBy: 5
// });

// store.dispatch({
//     type: 'INCREMENT'
// });

// unsubscribe(); // Stops the subscription.

// store.dispatch({
//     type: 'RESET'
// });

// store.dispatch({
//     type: 'DECREMENT',
//     decrementBy: 10
// });

// store.dispatch({
//     type: 'DECREMENT'
// });

// store.dispatch({
//     type: 'SET',
//     count: 101
// })

// Simplified action generator function calls

store.dispatch(incrementCount({ incrementBy: 5 }));
store.dispatch(incrementCount());
store.dispatch(resetCount());
store.dispatch(decrementCount({ decrementBy: 10 }));
store.dispatch(decrementCount());
store.dispatch(setCount({ count: 101 }));
