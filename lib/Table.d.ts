import * as Type from '../types';
declare class Table implements Type.Table {
    constructor();
    columns: Type.Column[];
    table_name: string | null;
    table_type: string | null;
    table_rows: string | null;
    version: string | null;
    create_time: string | null;
    update_time: string | null;
    table_comment: string | null;
    primary_key: Type.Column | null;
}
export = Table;
