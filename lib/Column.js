"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Column {
    constructor() {
        this.col_name = "";
        this.java_type = null;
        this.data_type = null;
        this.col_type = null;
        this.col_comment = "";
        this.isPrimary = false;
    }
}
exports.default = Column;
