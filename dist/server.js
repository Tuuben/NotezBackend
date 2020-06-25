"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
var express_1 = __importDefault(require("express"));
//import { connectToDb } from "./utils/db";
var ws_1 = require("./utils/ws");
require("./utils/db");
var app = express_1.default();
var port = process.env.PORT || 8000;
var server = app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
var ws = ws_1.initWebSocket(server);
