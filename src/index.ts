const mysql = require("mysql")
import Client from './Client';
import Table from './Table';
import Column from './Column';
import Utils from './utils';
import SQL from './sql'
import { AnyARecord } from 'node:dns';
import { error } from 'node:console';
// 定义返回的结果集
interface Result {

}

class ZtMeta {
  private _connection;
  private _client: Client;
  constructor(client: Client) {
    this._client = client;
    this._connection = mysql.createConnection(this._client);
  }
  /** list all databases while connection is connecting */
  listDatabases(): Promise<Result> {
    return new Promise((resolve, reject) => {
      this._connection.connect((err: unknown) => {
        if (err) {
          reject(err);
        }
      })
      this._connection.query(SQL.SHOWDB, (err: unknown, results: object) => {
        if (err) {
          reject(err);
        }
        else {
          resolve((results))
        }
      })
      this._connection.end()
    })
  }
  /** show versions of database */
  showVersion(): Promise<String> {
    return new Promise((resolve, reject) => {
      this._connection.connect((err: unknown) => {
        if (err) {
          reject(err);
        }
      })
      this._connection.query(SQL.VERSION, (err: unknown, results: any) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(results[0]["version()"])
        }
      })
      this._connection.end()
    })
  }
  /** list all tables of database */
  listTables(database: string): Promise<Table[]> {
    return new Promise((resolve, reject) => {
      //1. connect
      this._connection.connect((err: Error) => {
        if (err) {
          reject(err)
        }
      })
      let tables: Table[] = [];
      //2.find tables
      this._connection.query(SQL.LIST_TABLES, [database], (err: Error, results: any, fields: any) => {
        if (err) reject(err);
        else {
          //print results
          // console.log(results);
          results.forEach((rt: any, index: number) => {
            let table = new Table()
            table.table_name = rt.TABLE_NAME;
            table.table_type = rt.TABLE_TYPE;
            table.table_rows = rt.TABLE_ROWS;
            table.create_time = rt.CREATE_TIME;
            table.update_time = rt.UPDATE_TIME;
            table.table_comment = rt.TABLE_COMMENT;
            tables.push(table);
          })
          // console.log(tables)
          resolve(tables);
        }
      })
      //4 close
      this._connection.end((err: Error) => {
        if (err) reject(err);
      })
    })
  }
  /**list all columns of table */
  listColumns(database: string, table: string | Table, withPrimaryKey: boolean = true): Promise<Column[]> {
    return new Promise((resolve, reject) => {
      //1.connect
      this._connection.connect((err: Error) => {
        if (err) reject(err);
      })
      //2.query
      let table_name: string;
      let tl: Table;
      if ((typeof table) === "string") {
        table_name = (table as string);
        tl = new Table();
      }
      else {
        table_name = ((table as Table).table_name as string);
        tl = (table as Table);
      }
      this._connection.query(SQL.LIST_COLUMNS, [database, table_name], (err: Error, results: any, fields: any) => {
        if (err) reject(err);
        else {
          let cols: Column[] = [];
          // console.log(results);
          results.forEach((rt: any) => {
            let col = new Column();
            col.col_name = rt.COLUMN_NAME;
            col.col_type = rt.COLUMN_TYPE;
            col.data_type = rt.DATA_TYPE;
            col.col_comment = rt.COLUMN_COMMENT;
            col.java_type = Utils.computeJavaType(rt.COLUMN_TYPE, rt.DATA_TYPE);
            if (rt.COLUMN_KEY === 'PRI') {
              col.isPrimary = true;
              if (withPrimaryKey) cols.push(col);
            }
            else cols.push(col);
          })
          resolve(cols);
        }
      })
      //3.close connection
      this._connection.end((err: Error) => {
        reject(err);
      })
    })
  }
  /** find primary key of table*/
  findPrimaryKey(database: string, table_name: string): Promise<string|null> {
    return new Promise((resolve, reject) => {
      //1.connect the connnection
      if(database==undefined||table_name==undefined) reject(new Error("less params of function!"))
      this._connection.connect((err: Error) => {
        if (err) reject(err);
      })
      //2.query and set data
      this._connection.query(SQL.FIND_PRIMARY, [database, table_name], (err: Error, results: any, fields: any) => {
        if (err) { reject(err) }
        else {
          // console.log(results);
          let primary_key:string|null = null;
          results.forEach((rt: any) => {
            if (rt.CONSTRAINT_NAME === "PRIMARY") {
              primary_key = rt.COLUMN_NAME;
            }
          })
          resolve(primary_key);
        }
      })
      this._connection.end((err: Error) => {
        if (err) reject(err);
      });
    })
  }
}
export =ZtMeta