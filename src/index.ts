import { Client, Column, listColumnsConfig, listDBConfig, Table, Ztmeta, SqlError } from './types';
import helps from './Help'
import { resolve } from 'node:path';
import listTableOptions from "./options/listTableOptions";
//定义辅助类函数
class ZtMeta implements Ztmeta {
  _client: Client;
  listTables(database: string, options: listTableOptions | {}, callback: (err: SqlError|null, tables?: Table[]|null, sql?: string|null, info?: string) => void): void {
    if( (options as listTableOptions).withColumns===undefined){
      (options as listTableOptions).withColumns=false
    }
    if( (options as listTableOptions).withPrimaryKey===undefined){
      (options as listTableOptions).withPrimaryKey=false
    }
    const bb = async () => {
      try {
        let tables: Table[] = await helps.getTable(this._client, database);
        // console.log("now print the options",options,(options as listTableOptions).withColumns);
        for (let i = 0; i < tables.length; i++){
          if ((options as listTableOptions).withColumns) tables[i].columns = await helps.getColumns(this._client, database,
            tables[i].table_name as string, false);
          if ((options as listTableOptions).withPrimaryKey) tables[i].primary_key = await helps.getprimaryKey(this._client,
            database, tables[i].table_name as string);
        }
        callback(null, tables, null, "ok");
      }
      catch (err) {
        callback(err, null, (err as SqlError).sql, "failed");
      }
    }
    let aa = bb().then().catch();
  }
  listColumns(database: string, table: string, options: listColumnsConfig | {}, callback: (err: SqlError | null, columns?: Column[] | null, sql?: string, info?: string) => void): void {
    if (options === undefined || options === {}) {
      options = {
        withPrimaryKey: true
      }
    }
    helps.getColumns(this._client, database, table, (options as listColumnsConfig).withPrimaryKey)
      .then(res => {
        callback(null, res, undefined, 'ok');
      })
      .catch((err: SqlError) => {
        callback(err, null, err.sql, 'failed!');
      })
  }
  findPrimaryKey(database: string, table: string, callback: (err: SqlError|null, priKey?: Column | null, sql?: string|null, info?: string) => void): void {
    helps.getprimaryKey(this._client, database, table)
      .then(res => {
        callback(null, res, null, "ok");
      })
      .catch((err:SqlError) => {
        callback(err, null, err.sql, "failed");
    })
  }
  constructor(client: Client) {
    this._client = client;
  }
  /***/
  listDatabases(config: listDBConfig | {}, callback: (err: (SqlError | null), dbs?: (string[] | null), info?: string) => void): void {
  if(config==={}){
    (config as listDBConfig)={
      withSystemDataBases:true
    }
  }
  helps.getDbs(this._client,(config as listDBConfig).withSystemDataBases)
      .then(res=>{
        callback(null,res,"ok");
      })
      .catch((err:SqlError)=>{
        callback(err,null,"failed");
      })
  }
  showVersion(callback: (err: (SqlError | null), version?: (string | null), info?: string) => void): void {
  helps.getVersion(this._client)
      .then(res=>{
        callback(null,res,'ok');
      })
      .catch((err:SqlError)=>{
        callback(err,null,"failed");
      })
  }
}
export = ZtMeta