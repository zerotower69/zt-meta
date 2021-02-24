import * as Type from "./types";
declare class Column implements Type.Column {
    col_name: string;
    /** the data type with acute info */
    col_type: string | null;
    /** the data type without any acute info */
    data_type: string | null;
    /** java_type */
    java_type: string | null;
    /** column comment */
    col_comment: string | null;
    isPrimary: boolean;
    constructor();
}
export default Column;
