"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Layout_1 = __importDefault(require("components/Layout/Layout"));
var Home_1 = __importDefault(require("pages/Home/Home"));
var PageNotFound_1 = __importDefault(require("pages/PageNotFound/PageNotFound"));
var react_1 = __importDefault(require("react"));
var react_router_dom_1 = require("react-router-dom");
var Routes = function () { return (<react_router_dom_1.HashRouter>
    <Layout_1.default>
      <react_router_dom_1.Switch>
        <react_router_dom_1.Route component={Home_1.default} exact path="/"/>
        <react_router_dom_1.Route component={PageNotFound_1.default}/>
      </react_router_dom_1.Switch>
    </Layout_1.default>
  </react_router_dom_1.HashRouter>); };
exports.default = Routes;
