import express from "express";
//import { connectToDb } from "./utils/db";
import { initWebSocket } from "./utils/ws";
import { connectToDb } from "./utils/db";

require("dotenv").config();

const app = express();
const port = 8000;

const server = app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

connectToDb();

const ws = initWebSocket(server);
