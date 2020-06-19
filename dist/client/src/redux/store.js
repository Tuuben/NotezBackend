"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var redux_devtools_extension_1 = require("redux-devtools-extension");
var redux_thunk_1 = __importDefault(require("redux-thunk"));
var counter_1 = __importDefault(require("./counter/counter"));
var rootReducer = redux_1.combineReducers({ counter: counter_1.default });
var middleware = [redux_thunk_1.default];
exports.default = redux_1.createStore(rootReducer, redux_devtools_extension_1.composeWithDevTools(redux_1.applyMiddleware.apply(void 0, middleware)));
