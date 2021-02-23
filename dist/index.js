"use strict";
/// <reference types="../types" />
const mysql = require("mysql");
//定义辅助类函数
class ZtMeta {
    constructor(client) {
        this._client = client;
    }
    listDatabases(config, callback) {
        throw new Error('Method not implemented.');
    }
    showVersion(callback) {
        throw new Error('Method not implemented.');
    }
    listTables(database, config, callback) {
        throw new Error('Method not implemented.');
    }
    listColumns(database, table, config, callback) {
        throw new Error('Method not implemented.');
    }
    findPrimaryKey(database, table, callback) {
        throw new Error('Method not implemented.');
    }
}
/** sqls */
const SQL = {
    SHOWDB: "SHOW DATABASES",
    VERSION: "select version()",
    LIST_TABLES: "select table_name,table_type,table_rows,create_time,update_time,table_comment from information_schema.tables where table_schema= ?",
    LIST_COLUMNS: "select column_name,is_nullable,data_type,column_type,column_key,column_comment,column_default from information_schema.columns where table_schema= ? and table_name= ?",
    FIND_PRIMARY: 'select column_name,is_nullable,data_type,column_type,column_comment,column_default from columns where table_schema= ? and table_name= ? and column_key="PRI"',
};
module.exports = ZtMeta;
