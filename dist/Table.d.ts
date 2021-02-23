import { Column, Table } from '../types';
declare class TableImpl implements Table {
    constructor();
    table_name: string | null;
    table_type: string | null;
    table_rows: string | null;
    version: string | null;
    create_time: string | null;
    update_time: string | null;
    table_comment: string | null;
    primary_key: Column | null;
    columns: Column[];
}
export = TableImpl;
//# sourceMappingURL=Table.d.ts.map