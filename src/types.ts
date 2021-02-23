import { MysqlError, ConnectionOptions,Connection } from 'mysql';


export interface Client extends ConnectionOptions {
}

export interface Column {
  /**column name */
  col_name: string;
  /** the data type with acute info */
  col_type: string | null;
  /** the data type without any acute info */
  data_type: string | null;
  /** java_type */
  java_type: string | null;
  /** column comment */
  col_comment: string | null;
  /** the column is primary key or not */
  isPrimary: boolean;
}
export interface SqlError extends MysqlError{

}

export interface RowDataPacket{
  RowDataPacket(packet: any, parser: any, connection: Connection): void;
}
/** the table entity */
export interface Table {
  /** table name of table */
  table_name: string | null;
  /** table time of table */
  table_type: string | null;
  /** table rows of table */
  table_rows: string | null;
  /** table versio of table */
  version: string | null;
  /** the time of the table is created */
  create_time: string | null;
  /** the time of the table is updated */
  update_time: string | null;
  /** the comment of table */
  table_comment: string | null;
  /** the primary keu of table */
  primary_key: Column | null;
  /** the column of table  */
  columns: Column[];
}
/** the function listDatabases config  */
export interface listDBConfig {
  /** list all dbs contains system databases or not */
  withSystemDataBases: boolean;
}

/** list tables config */
export interface listTablesConfig {
  /** list tables with all columns add to it or not? */
  withColumns?: boolean;
  /** show table with its primary key or not? */
  withPrimaryKey?: boolean;
}

export interface listColumnsConfig {
  /**show column with primary key of not  */
  withPrimaryKey: boolean;
}

export interface Helps{
   getTable(client: Client, database: string):Promise<Table[]>
}
export interface Ztmeta {
  _client: Client;
  /**
   * list all databases
   * @param {listDBConfig} config 
   * @param {(err:SqlError,data?:string[],sql?:string,info?:string)=>void} callback 
   */
  listDatabases(config?: listDBConfig, callback?: (err: SqlError|null, dbs?: string[], sql?: string, info?: string) => void): void;
  /**
   *  view your MySQL version
   * @param callback 
   */
  showVersion(callback: (err: SqlError|null, version?: string | null, sql?: string, info?: string) => void): void;
  /**
   * list all tables when specify the database
   * @param database 
   * @param config 
   * @param callback 
   */
  listTables(database: string, config: listTablesConfig|{}, callback: (err: SqlError|null, tables?: Table[]|null, sql?: string|null, info?: string) => void): void;
  /**
   * list all columns when specify the table
   * @param {String} database trhe database name
   * @param {String} table  the table name
   * @param {listColumnConfig} config 
   * @param callback 
   */
  listColumns(database: string, table: string, config?: listColumnsConfig | {}, callback?: (err: SqlError|null, columns?: Column[]|null, sql?: string, info?: string) => void): void;
  /**
   * find  one primary key of table
   * @param database 
   * @param table 
   * @param callback 
   */
  findPrimaryKey(database: string, table: string, callback: (err: SqlError|null, priKey?: string | null, sql?: string, info?: string) => void): void;
}