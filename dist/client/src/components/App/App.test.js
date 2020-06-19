"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("@testing-library/react");
var react_2 = __importDefault(require("react"));
var react_redux_1 = require("react-redux");
var redux_mock_store_1 = __importDefault(require("redux-mock-store"));
var App_1 = __importDefault(require("./App"));
var mockStore = redux_mock_store_1.default();
test('counter text is in document', function () {
    var getByText = react_1.render(<react_redux_1.Provider store={mockStore({ counter: 0 })}>
      <App_1.default />
    </react_redux_1.Provider>).getByText;
    var text = getByText(/Counter: 0/i);
    expect(text).toBeInTheDocument();
});
