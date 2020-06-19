"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.incrementCount = exports.decrementCount = exports.INCREMENT = exports.DECREMENT = void 0;
exports.DECREMENT = 'DECREMENT ';
exports.INCREMENT = 'INCREMENT';
exports.decrementCount = function () { return function (dispatch, getState) {
    dispatch({
        counter: getState().counter - 1,
        type: exports.DECREMENT,
    });
}; };
exports.incrementCount = function () { return function (dispatch, getState) {
    dispatch({
        counter: getState().counter + 1,
        type: exports.INCREMENT,
    });
}; };
exports.default = (function (state, action) {
    if (state === void 0) { state = 0; }
    switch (action.type) {
        case exports.DECREMENT:
        case exports.INCREMENT:
            return action.counter;
        default:
            return state;
    }
});
