"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRows = exports.updateRow = exports.addRow = exports.deleteItem = exports.pool = void 0;
var pg_1 = require("pg");
var config = {
    user: process.env.DATABASE_USER,
    host: process.env.DATABASE_URL,
    database: process.env.DATABASE_NAME,
    // password: "",
    port: 5432,
};
var productionConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
};
exports.pool = new pg_1.Pool(process.env.PRODUCTION === "true" ? productionConfig : config);
/*
export const createTable = (table: string) => {
  const query = `CREATE TABLE ${table} ( ...column )`;

  return pool.query(query);
}; */
exports.deleteItem = function (table, id) {
    var query = "\n    delete from " + table + "\n    where id = '" + id + "'\n  ";
    console.log(query);
    return exports.pool.query(query);
};
exports.addRow = function (table, cols, values) {
    var colStr = cols.join();
    var valuesStr = values.reduce(function (prev, cur, index) {
        var curValue = typeof cur === "string" ? "'" + cur + "'" : cur;
        return prev + (index > 0 ? "," : "") + curValue;
    }, "");
    var query = "\n    insert into " + table + "(" + colStr + ")\n    values(" + valuesStr + ")\n  ";
    console.log("ADDED NEW", query);
    return exports.pool.query(query);
};
exports.updateRow = function (table, id, fields, values) {
    var updateStr = fields.map(function (field, index) {
        var val = values[index] || "";
        var valStr = typeof val === "string" ? "'" + val + "'" : val;
        return field + " = " + valStr;
    });
    var query = "\n    UPDATE " + table + "\n    SET " + updateStr.join() + "\n    WHERE id = '" + id + "'\n  ";
    console.log("UPDATE Q ", query);
    return exports.pool.query(query);
};
exports.getRows = function (table, fields) {
    var fieldStr = fields.join();
    var query = "\n    SELECT " + fieldStr + " FROM " + table + "\n  ";
    return exports.pool.query(query);
};
