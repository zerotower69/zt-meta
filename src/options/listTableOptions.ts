import * as Type from "../types"

type options={
    withColumns?:boolean,
    withPrimaryKey?:boolean
}
class listTableOptions implements  Type.listTableOptions {
    withPrimaryKey?: boolean;
    withColumns?: boolean;

    constructor(options: options) {
        if (options.withColumns === undefined) {
            this.withColumns = false;
        }
        if (options.withPrimaryKey === undefined) {
            this.withPrimaryKey = true;
        }
    }
}

export =listTableOptions