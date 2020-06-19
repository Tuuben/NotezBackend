"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Routes_1 = __importDefault(require("components/Routes/Routes"));
var react_1 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var store_1 = __importDefault(require("redux/store"));
var App = function () { return (<react_redux_1.Provider store={store_1.default}>
    <Routes_1.default />
  </react_redux_1.Provider>); };
exports.default = App;
