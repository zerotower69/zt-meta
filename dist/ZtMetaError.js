"use strict";
/// <reference types="../types" />
class ZtMetaErrorImpl {
    constructor(message, code, sql) {
        this.message = message;
        this.fatal = false;
        this.name = "ztmeta_error";
        this.code = (code === undefined) ? 'undefined the code' : code;
        this.errno = 2021;
        this.sql = sql;
    }
}
module.exports = ZtMetaErrorImpl;
