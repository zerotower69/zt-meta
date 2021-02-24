import * as Type from '../types';
declare class ClientOptions implements Type.ClientOptions {
    /**
       * The MySQL user to authenticate as
       */
    user?: string;
    /**
     * The password of that MySQL user
     */
    password?: string;
    /**
     * Name of the database to use for this connection
     */
    database?: string;
    /**
     * The charset for the connection. This is called "collation" in the SQL-level of MySQL (like utf8_general_ci).
     * If a SQL-level charset is specified (like utf8mb4) then the default collation for that charset is used.
     * (Default: 'UTF8_GENERAL_CI')
     */
    charset?: string;
    /**
     * Number of milliseconds
     */
    timeout?: number;
    construtor(): void;
}
export = ClientOptions;
