import { Client, Column, listColumnsConfig, listDBConfig, Table, Ztmeta, SqlError } from './types';
import listTableOptions from "./options/listTableOptions";
declare class ZtMeta implements Ztmeta {
    _client: Client;
    listTables(database: string, options: listTableOptions | {}, callback: (err: SqlError | null, tables?: Table[] | null, sql?: string | null, info?: string) => void): void;
    listColumns(database: string, table: string, options: listColumnsConfig | {}, callback: (err: SqlError | null, columns?: Column[] | null, sql?: string, info?: string) => void): void;
    findPrimaryKey(database: string, table: string, callback: (err: SqlError | null, priKey?: Column | null, sql?: string | null, info?: string) => void): void;
    constructor(client: Client);
    /***/
    listDatabases(config: listDBConfig | {}, callback: (err: (SqlError | null), dbs?: (string[] | null), info?: string) => void): void;
    showVersion(callback: (err: (SqlError | null), version?: (string | null), info?: string) => void): void;
}
export = ZtMeta;
