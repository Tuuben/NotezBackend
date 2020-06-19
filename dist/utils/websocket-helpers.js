"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAcceptValue = void 0;
var crypto_1 = __importDefault(require("crypto"));
exports.generateAcceptValue = function (acceptKey) {
    return crypto_1.default
        .createHash("sha1")
        .update(acceptKey + "258EAFA5-E914–47DA-95CA-C5AB0DC85B11")
        .digest("base64");
};
