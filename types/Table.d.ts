import Column from './Column';
declare class Table {
    table_name: string | null;
    table_type: string | null;
    table_rows: string | null;
    version: string | null;
    create_time: string | null;
    update_time: string | null;
    table_comment: string | null;
    primary_key: Column | null;
    columns: Column[];
    constructor();
}
export default Table;
//# sourceMappingURL=Table.d.ts.map