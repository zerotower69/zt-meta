
import Client from './Client';
declare class ZtMeta {
    private _connection;
    private _client;
    constructor(client: Client);
    listDatabases(): Promise<unknown>;
}
export = ZtMeta;
//# sourceMappingURL=index.d.ts.map