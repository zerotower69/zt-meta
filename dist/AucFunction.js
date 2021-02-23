"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Table_1 = __importDefault(require("./Table"));
const mysql = require("mysql");
/// <reference types="../types/"/>
class AxuFunction {
    static getTable(database, config) {
        return new Promise((resolve, reject) => {
            let table = new Table_1.default();
        });
    }
}
