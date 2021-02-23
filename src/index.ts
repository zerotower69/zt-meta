import { Client, Column, listColumnsConfig, listDBConfig, Table, listTablesConfig, Ztmeta, SqlError } from './types';
import helps from './Help'
import { resolve } from 'node:path';
//定义辅助类函数

class ZtMeta implements Ztmeta {
  _client: Client;
  listDatabases(config?: listDBConfig, callback?: (err: SqlError, dbs?: string[], sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  showVersion(callback?: (err: SqlError|null, version?: string | null, sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  listTables(database: string, config: listTablesConfig | {}, callback: (err: SqlError|null, tables?: Table[]|null, sql?: string|null, info?: string) => void): void {
    if (config === {}) {
      config = {
        withColumns: false,
        withPrimaryKey: false
      }
    };
    const bb = async () => {
      try {
        let tables: Table[] = await helps.getTable(this._client, database, config);
        for (let i = 0; i < tables.length; i++){
          if ((config as listTablesConfig).withColumns) tables[i].columns = await helps.getColumns(this._client, database, tables[i].table_name as string, false);
        }
        callback(null, tables, null, "ok");
      }
      catch (err) {
        callback(err, null, (err as SqlError).sql, "failed");
      }
    }
    let aa = bb().then().catch();
  }
  listColumns(database: string, table: string, config: listColumnsConfig | {}, callback: (err: SqlError | null, columns?: Column[] | null, sql?: string, info?: string) => void): void {
    if (config === undefined || config === {}) {
      config = {
        withPrimaryKey: true
      }
    }
    helps.getColumns(this._client, database, table, (config as listColumnsConfig).withPrimaryKey)
      .then(res => {
        callback(null, res, undefined, 'ok');
      })
      .catch((err: SqlError) => {
        callback(err, null, err.sql, 'failed!');
      })
  }
  findPrimaryKey(database: string, table: string, callback: (err: SqlError, priKey?: string | null, sql?: string, info?: string) => void): void {
    throw new Error('Method not implemented.');
  }
  constructor(client: Client) {
    this._client = client;
  }
}
export = ZtMeta