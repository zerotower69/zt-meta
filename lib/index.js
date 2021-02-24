"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Help_1 = __importDefault(require("./Help"));
//定义辅助类函数
class ZtMeta {
    constructor(client) {
        this._client = client;
    }
    listTables(database, options, callback) {
        if (options.withColumns === undefined) {
            options.withColumns = false;
        }
        if (options.withPrimaryKey === undefined) {
            options.withPrimaryKey = false;
        }
        const bb = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let tables = yield Help_1.default.getTable(this._client, database);
                // console.log("now print the options",options,(options as listTableOptions).withColumns);
                for (let i = 0; i < tables.length; i++) {
                    if (options.withColumns)
                        tables[i].columns = yield Help_1.default.getColumns(this._client, database, tables[i].table_name, false);
                    if (options.withPrimaryKey)
                        tables[i].primary_key = yield Help_1.default.getprimaryKey(this._client, database, tables[i].table_name);
                }
                callback(null, tables, null, "ok");
            }
            catch (err) {
                callback(err, null, err.sql, "failed");
            }
        });
        let aa = bb().then().catch();
    }
    listColumns(database, table, options, callback) {
        if (options === undefined || options === {}) {
            options = {
                withPrimaryKey: true
            };
        }
        Help_1.default.getColumns(this._client, database, table, options.withPrimaryKey)
            .then(res => {
            callback(null, res, undefined, 'ok');
        })
            .catch((err) => {
            callback(err, null, err.sql, 'failed!');
        });
    }
    findPrimaryKey(database, table, callback) {
        Help_1.default.getprimaryKey(this._client, database, table)
            .then(res => {
            callback(null, res, null, "ok");
        })
            .catch((err) => {
            callback(err, null, err.sql, "failed");
        });
    }
    /***/
    listDatabases(config, callback) {
        if (config === {}) {
            config = {
                withSystemDataBases: true
            };
        }
        Help_1.default.getDbs(this._client, config.withSystemDataBases)
            .then(res => {
            callback(null, res, "ok");
        })
            .catch((err) => {
            callback(err, null, "failed");
        });
    }
    showVersion(callback) {
        Help_1.default.getVersion(this._client)
            .then(res => {
            callback(null, res, 'ok');
        })
            .catch((err) => {
            callback(err, null, "failed");
        });
    }
}
module.exports = ZtMeta;
