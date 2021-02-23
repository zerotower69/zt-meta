import { Client, Column, listColumnsConfig, listDBConfig, Table, listTablesConfig, Ztmeta, ZtMetaError } from '../types/index';
declare class ZtMeta implements Ztmeta {
    _client: Client;
    listDatabases(config?: listDBConfig, callback?: (err: ZtMetaError, dbs?: string[], sql?: string, info?: string) => void): void;
    showVersion(callback?: (err: ZtMetaError, version?: string | null, sql?: string, info?: string) => void): void;
    listTables(database: string, config?: listTablesConfig, callback?: (err: ZtMetaError, tables?: Table[], sql?: string, info?: string) => void): void;
    listColumns(database: string, table: string, config: listColumnsConfig, callback: (err: ZtMetaError, columns?: Column[], sql?: string, info?: string) => void): void;
    findPrimaryKey(database: string, table: string, callback: (err: ZtMetaError, priKey?: string | null, sql?: string, info?: string) => void): void;
    constructor(client: Client);
}
export = ZtMeta;
//# sourceMappingURL=index.d.ts.map