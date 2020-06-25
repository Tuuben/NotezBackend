require("dotenv").config();
import express from "express";
//import { connectToDb } from "./utils/db";
import { initWebSocket } from "./utils/ws";
import "./utils/db";

const app = express();
const port = process.env.PORT || 8000;

const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const ws = initWebSocket(server);
