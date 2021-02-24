"use strict";
class listTableOptions {
    constructor(options) {
        if (options.withColumns === undefined) {
            this.withColumns = false;
        }
        if (options.withPrimaryKey === undefined) {
            this.withPrimaryKey = true;
        }
    }
}
module.exports = listTableOptions;
