import Client from './Client';
import Table from './Table';
import Column from './Column';
interface Result {
}
declare class ZtMeta {
    private _connection;
    private _client;
    constructor(client: Client);
    /** list all databases while connection is connecting */
    listDatabases(): Promise<Result>;
    /** show versions of database */
    showVersion(): Promise<String>;
    /** list all tables of database */
    listTables(database: string): Promise<Table[]>;
    /**list all columns of table */
    listColumns(database: string, table: string | Table, withPrimaryKey?: boolean): Promise<Column[]>;
    /** find primary key of table*/
    findPrimaryKey(database: string, table_name: string): Promise<string | null>;
}
export = ZtMeta;
//# sourceMappingURL=index.d.ts.map