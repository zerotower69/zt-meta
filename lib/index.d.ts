import { Client, Column, listColumnsConfig, listDBConfig, Table, listTablesConfig, Ztmeta, SqlError } from './types';
declare class ZtMeta implements Ztmeta {
    _client: Client;
    listDatabases(config?: listDBConfig, callback?: (err: SqlError, dbs?: string[], sql?: string, info?: string) => void): void;
    showVersion(callback?: (err: SqlError | null, version?: string | null, sql?: string, info?: string) => void): void;
    listTables(database: string, config: listTablesConfig | {}, callback: (err: SqlError | null, tables?: Table[] | null, sql?: string | null, info?: string) => void): void;
    listColumns(database: string, table: string, config: listColumnsConfig | {}, callback: (err: SqlError | null, columns?: Column[] | null, sql?: string, info?: string) => void): void;
    findPrimaryKey(database: string, table: string, callback: (err: SqlError, priKey?: string | null, sql?: string, info?: string) => void): void;
    constructor(client: Client);
}
export = ZtMeta;
