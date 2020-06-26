import { Pool } from "pg";

const config = {
  user: process.env.DATABASE_USER,
  host: process.env.DATABASE_URL,
  database: process.env.DATABASE_NAME,
  // password: "",
  port: 5432,
};

export const pool = new Pool(config);
/* 
export const createTable = (table: string) => {
  const query = `CREATE TABLE ${table} ( ...column )`;

  return pool.query(query);
}; */

export const deleteItem = (table: string, id: any) => {
  const query = `
    delete from ${table}
    where id = ${id}
  `;

  return pool.query(query);
};

export const addRow = (table: string, cols: string[], values: any[]) => {
  const colStr = cols.join();
  const valuesStr = values.reduce((prev, cur, index) => {
    const curValue = typeof cur === "string" ? `'${cur}'` : cur;
    return prev + (index > 0 ? "," : "") + curValue;
  }, "");
  const query = `
    insert into ${table}(${colStr})
    values(${valuesStr})
  `;

  return pool.query(query);
};

export const updateRow = (table: string, id: any, fields: string[], values: any[]) => {
  const updateStr = fields.map((field, index) => {
    const val = values[index] || "";
    const valStr = typeof val === "string" ? `'${val}'` : val;
    return `${field} = ${valStr}`;
  });
  const query = `
    UPDATE ${table}
    SET ${updateStr.join()}
    WHERE id = ${id}
  `;

  console.log("UPDATE Q ", query);

  return pool.query(query);
};

export const getRows = (table: string, fields: string[]) => {
  const fieldStr = fields.join();
  const query = `
    SELECT ${fieldStr} FROM ${table}
  `;

  return pool.query(query);
};
