"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const mysql = require("mysql");
const Table_1 = __importDefault(require("./Table"));
const Column_1 = __importDefault(require("./Column"));
const utils_1 = __importDefault(require("./utils"));
const sql_1 = __importDefault(require("./sql"));
class ZtMeta {
    constructor(client) {
        this._client = client;
        this._connection = mysql.createConnection(this._client);
    }
    /** list all databases while connection is connecting */
    listDatabases() {
        return new Promise((resolve, reject) => {
            this._connection.connect((err) => {
                if (err) {
                    reject(err);
                }
            });
            this._connection.query(sql_1.default.SHOWDB, (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve((results));
                }
            });
            this._connection.end();
        });
    }
    /** show versions of database */
    showVersion() {
        return new Promise((resolve, reject) => {
            this._connection.connect((err) => {
                if (err) {
                    reject(err);
                }
            });
            this._connection.query(sql_1.default.VERSION, (err, results) => {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(results[0]["version()"]);
                }
            });
            this._connection.end();
        });
    }
    /** list all tables of database */
    listTables(database) {
        return new Promise((resolve, reject) => {
            //1. connect
            this._connection.connect((err) => {
                if (err) {
                    reject(err);
                }
            });
            let tables = [];
            //2.find tables
            this._connection.query(sql_1.default.LIST_TABLES, [database], (err, results, fields) => {
                if (err)
                    reject(err);
                else {
                    //print results
                    // console.log(results);
                    results.forEach((rt, index) => {
                        let table = new Table_1.default();
                        table.table_name = rt.TABLE_NAME;
                        table.table_type = rt.TABLE_TYPE;
                        table.table_rows = rt.TABLE_ROWS;
                        table.create_time = rt.CREATE_TIME;
                        table.update_time = rt.UPDATE_TIME;
                        table.table_comment = rt.TABLE_COMMENT;
                        tables.push(table);
                    });
                    // console.log(tables)
                    resolve(tables);
                }
            });
            //4 close
            this._connection.end((err) => {
                if (err)
                    reject(err);
            });
        });
    }
    /**list all columns of table */
    listColumns(database, table, withPrimaryKey = true) {
        return new Promise((resolve, reject) => {
            //1.connect
            this._connection.connect((err) => {
                if (err)
                    reject(err);
            });
            //2.query
            let table_name;
            let tl;
            if ((typeof table) === "string") {
                table_name = table;
                tl = new Table_1.default();
            }
            else {
                table_name = table.table_name;
                tl = table;
            }
            this._connection.query(sql_1.default.LIST_COLUMNS, [database, table_name], (err, results, fields) => {
                if (err)
                    reject(err);
                else {
                    let cols = [];
                    // console.log(results);
                    results.forEach((rt) => {
                        let col = new Column_1.default();
                        col.col_name = rt.COLUMN_NAME;
                        col.col_type = rt.COLUMN_TYPE;
                        col.data_type = rt.DATA_TYPE;
                        col.col_comment = rt.COLUMN_COMMENT;
                        col.java_type = utils_1.default.computeJavaType(rt.COLUMN_TYPE, rt.DATA_TYPE);
                        if (rt.COLUMN_KEY === 'PRI') {
                            col.isPrimary = true;
                            if (withPrimaryKey)
                                cols.push(col);
                        }
                        else
                            cols.push(col);
                    });
                    resolve(cols);
                }
            });
            //3.close connection
            this._connection.end((err) => {
                reject(err);
            });
        });
    }
    /** find primary key of table*/
    findPrimaryKey(database, table_name) {
        return new Promise((resolve, reject) => {
            //1.connect the connnection
            if (database == undefined || table_name == undefined)
                reject(new Error("less params of function!"));
            this._connection.connect((err) => {
                if (err)
                    reject(err);
            });
            //2.query and set data
            this._connection.query(sql_1.default.FIND_PRIMARY, [database, table_name], (err, results, fields) => {
                if (err) {
                    reject(err);
                }
                else {
                    // console.log(results);
                    let primary_key = null;
                    results.forEach((rt) => {
                        if (rt.CONSTRAINT_NAME === "PRIMARY") {
                            primary_key = rt.COLUMN_NAME;
                        }
                    });
                    resolve(primary_key);
                }
            });
            this._connection.end((err) => {
                if (err)
                    reject(err);
            });
        });
    }
}
module.exports = ZtMeta;
