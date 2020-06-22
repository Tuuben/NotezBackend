"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import { connectToDb } from "./utils/db";
var ws_1 = require("./utils/ws");
var db_1 = require("./utils/db");
require("dotenv").config();
var app = express_1.default();
var port = 8000;
var server = app.listen(port, function () { return console.log("Example app listening at http://localhost:" + port); });
db_1.connectToDb();
var ws = ws_1.initWebSocket(server);
