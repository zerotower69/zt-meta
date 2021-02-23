/// <reference types="../types" />

const mysql = require("mysql")
import Utils from './utils';
import { Client, Column, listColumnsConfig, listDBConfig, Table, listTablesConfig, Ztmeta, ZtMetaError } from '../types/index';
//定义辅助类函数

class ZtMeta implements Ztmeta {
  _client: Client;
  listDatabases(config?: listDBConfig, callback?: (err: ZtMetaError, dbs?: string[], sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  showVersion(callback?: (err: ZtMetaError, version?: string | null, sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  listTables(database: string, config?: listTablesConfig, callback?: (err: ZtMetaError, tables?: Table[], sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  listColumns(database: string, table: string, config: listColumnsConfig, callback: (err: ZtMetaError, columns?: Column[], sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  findPrimaryKey(database: string, table: string, callback: (err: ZtMetaError, priKey?: string | null, sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  constructor(client: Client) {
    this._client = client;
  }
}
/** sqls */
const SQL = {
  SHOWDB: "SHOW DATABASES",
  VERSION: "select version()",
  LIST_TABLES: "select table_name,table_type,table_rows,create_time,update_time,table_comment from information_schema.tables where table_schema= ?",
  LIST_COLUMNS: "select column_name,is_nullable,data_type,column_type,column_key,column_comment,column_default from information_schema.columns where table_schema= ? and table_name= ?",
  FIND_PRIMARY:'select column_name,is_nullable,data_type,column_type,column_comment,column_default from columns where table_schema= ? and table_name= ? and column_key="PRI"',
}

export =ZtMeta