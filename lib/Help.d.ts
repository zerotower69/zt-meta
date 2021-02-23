import { Client, listTablesConfig } from "./types";
import Table from './Table';
import Column from './Column';
declare class Help {
    static getTable(client: Client, database: string, config: listTablesConfig): Promise<Table[]>;
    static getVersion(client: Client): Promise<any>;
    static getColumns(client: Client, database: string, table: string, withPrimaryKey?: boolean): Promise<Column[]>;
    static getDbs(client: Client, withSystemDBs?: boolean): Promise<string[]>;
    static getprimaryKey(): void;
}
export default Help;
