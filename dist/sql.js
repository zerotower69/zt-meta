"use strict";
let sql = {
    SHOWDB: "SHOW DATABASES",
    VERSION: "select version()",
    LIST_TABLES: "select table_name,table_type,table_rows,create_time,update_time,table_comment from information_schema.tables where table_schema= ?",
    LIST_COLUMNS: "select column_name,is_nullable,data_type,column_type,column_key,column_comment,column_default from information_schema.columns where table_schema= ? and table_name= ?",
    FIND_PRIMARY: "select constraint_name,column_name from information_schema.key_column_usage where table_schema= ? and table_name= ?",
};
module.exports = sql;
