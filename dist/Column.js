"use strict";
//定义列类
const fs = require("fs-extra");
const path = require("path");
//load 
let java;
fs.readJson("../json/java.json", (err, obj) => {
    if (!err)
        java = obj;
});
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
module.exports = Column;
