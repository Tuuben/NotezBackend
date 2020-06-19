"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_redux_1 = require("react-redux");
var counter_1 = require("redux/counter/counter");
exports.default = (function () {
    var counter = react_redux_1.useSelector(function (state) { return state.counter; });
    var dispatch = react_redux_1.useDispatch();
    var handleDecrementClick = function () {
        dispatch(counter_1.decrementCount());
    };
    var handleIncrementClick = function () {
        dispatch(counter_1.incrementCount());
    };
    return { counter: counter, handleDecrementClick: handleDecrementClick, handleIncrementClick: handleIncrementClick };
});
