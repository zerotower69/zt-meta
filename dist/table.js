"use strict";
/// <reference types="../types" />
class TableImpl {
    constructor() {
        this.table_name = null;
        this.table_type = null;
        this.table_rows = null;
        this.version = null;
        this.create_time = null;
        this.update_time = null;
        this.table_comment = null;
        this.primary_key = null;
        this.columns = [];
    }
}
module.exports = TableImpl;
