"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = __importDefault(require("./Table"));
const Column_1 = __importDefault(require("./Column"));
const MySQL = require("mysql");
// console.log(MySQL);
function computeJavaType(data_type, column_type) {
    if (data_type === "int")
        return "Integer";
    else if (data_type === "char" || data_type === "varchar" || data_type == "long")
        return "String";
    else if (data_type === "tinyint") {
        if (column_type === "tinyint(1)")
            return "boolean";
        else
            return "Byte";
    }
    else if (data_type === "numeric" || data_type === "decimal" || data_type === "number")
        return "BigDecimal";
    else if (data_type === "bit")
        return "boolean";
    else if (data_type === "smallint")
        return "short";
    else if (data_type === "bigint")
        return "long";
    else if (data_type === "real")
        return "float";
    else if (data_type === "double")
        return "double";
    else if (data_type === "date")
        return "Date";
    else if (data_type === "time")
        return "time";
    else if (data_type === "timestamp" || data_type === "datetime")
        return "Timestamp";
    else if (data_type === "clob")
        return "Clob";
    else if (data_type === "blob")
        return "Blob";
    else
        return "";
}
class Help {
    static getTable(client, database, config) {
        return new Promise((resolve, reject) => {
            let tables = [];
            let connection = MySQL.createConnection(client);
            connection.connect((err) => {
                if (err)
                    reject(err);
            });
            connection.query("use information_schema", (err) => {
                if (err)
                    reject(err);
            });
            //2. query
            connection.query(SQL.LIST_TABLES, [database], (err, rts) => {
                connection.destroy();
                if (err)
                    reject(err);
                else {
                    //seal data
                    rts.forEach((rt) => {
                        let table = new Table_1.default();
                        table.table_name = rt.TABLE_NAME;
                        table.table_rows = rt.TABLE_ROWS;
                        table.table_type = rt.TABLE_TYPE;
                        table.create_time = rt.CREATE_TIME;
                        table.update_time = rt.UPDATE_TIME;
                        table.version = rt.TABLE_VERSION;
                        tables.push(table);
                    });
                    resolve(tables);
                }
            });
        });
    }
    static getVersion(client) {
        return new Promise((resolve, reject) => {
            let connection = MySQL.createConnection(client);
            connection.connect((err) => {
                if (err)
                    reject(err);
            });
            connection.query(SQL.VERSION, (err, rts) => {
                //TODO: you must remem this connection
                connection.destroy(); //remember destroy the connection
                if (err)
                    reject(err);
                else
                    resolve(rts[0]["version()"]);
            });
        });
    }
    static getColumns(client, database, table, withPrimaryKey = true) {
        return new Promise((resolve, reject) => {
            let connection = MySQL.createConnection(client);
            connection.connect((err) => {
                if (err)
                    reject(err);
            });
            //chnange to information_schema
            let columns = [];
            connection.query("use information_schema", (err) => {
                if (err)
                    reject(err);
            });
            connection.query(SQL.LIST_COLUMNS, [database, table], (err, rts) => {
                connection.destroy();
                if (err)
                    reject(err);
                else {
                    rts.forEach((rt) => {
                        let column = new Column_1.default();
                        column.col_name = rt.COLUMN_NAME;
                        column.col_type = rt.COLUMN_TYPE;
                        column.col_comment = rt.COLUMN_COMMENT;
                        column.data_type = rt.DATA_TYPE;
                        column.java_type = computeJavaType(rt.DATA_TYPE, rt.COLUMN_TYPE);
                        let key = rt.COLUMN_KEY;
                        if (key === "PRI") {
                            column.isPrimary = true;
                            if (withPrimaryKey) {
                                columns.push(column);
                            }
                        }
                        else {
                            columns.push(column);
                        }
                    });
                    //end each
                    resolve(columns);
                }
            });
        });
    }
    static getDbs(client, withSystemDBs = false) {
        return new Promise((resolve, reject) => {
            let connection = MySQL.createConnection(client);
            connection.connect((err) => {
                if (err)
                    reject(err);
            });
            let databases = [];
            connection.query(SQL.SHOWDB, (err, rts) => {
                connection.destroy();
                if (err)
                    reject(err);
                else {
                    let excludes = ["sys", "mysql", "information_schema", "performance_schema"];
                    rts.forEach((rt) => {
                        if (excludes.includes(rt.Database)) {
                            if (withSystemDBs)
                                databases.push(rt.Database);
                        }
                        else {
                            databases.push(rt.Database);
                        }
                    });
                    resolve(databases);
                }
            });
        });
    }
    static getprimaryKey() {
    }
}
const SQL = {
    SHOWDB: "SHOW DATABASES",
    VERSION: "select version()",
    LIST_TABLES: "select table_name,table_type,table_rows,create_time,update_time,table_comment from tables where table_schema= ?",
    LIST_COLUMNS: "select column_name,is_nullable,data_type,column_type,column_key,column_comment,column_default from columns where table_schema= ? and table_name= ?",
    FIND_PRIMARY: 'select column_name,is_nullable,data_type,column_type,column_comment,column_default from columns where table_schema= ? and table_name= ? and column_key="PRI"',
};
exports.default = Help;
