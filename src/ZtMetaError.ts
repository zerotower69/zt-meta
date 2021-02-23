import { ZtMetaError } from './../types';
/// <reference types="../types" />

class ZtMetaErrorImpl implements ZtMetaError {
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
  constructor(message: string,code?:string,sql?:string) {
    this.message = message;
    this.fatal = false;
    this.name = "ztmeta_error";
    this.code = (code === undefined)? 'undefined the code' : code;
    this.errno = 2021;
    this.sql = sql;
  }
}
export=ZtMetaErrorImpl