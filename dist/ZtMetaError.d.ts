import { ZtMetaError } from './../types';
declare class ZtMetaErrorImpl implements ZtMetaError {
    code: string;
    errno: number;
    sqlStateMarker?: string | undefined;
    sqlState?: string | undefined;
    fieldCount?: number | undefined;
    stack?: string | undefined;
    fatal: boolean;
    sql?: string | undefined;
    sqlMessage?: string | undefined;
    name: string;
    message: string;
    constructor(message: string, code?: string, sql?: string);
}
export = ZtMetaErrorImpl;
//# sourceMappingURL=ZtmetaError.d.ts.map