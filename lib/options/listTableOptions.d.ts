import * as Type from "../types";
declare type options = {
    withColumns?: boolean;
    withPrimaryKey?: boolean;
};
declare class listTableOptions implements Type.listTableOptions {
    withPrimaryKey?: boolean;
    withColumns?: boolean;
    constructor(options: options);
}
export = listTableOptions;
