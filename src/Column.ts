
//定义列类
const fs = require("fs-extra")
const path =require("path")
//load 
let java: object;
fs.readJson("../json/java.json", (err: Error, obj: object) => {
  if(!err) java=obj
})
class Column{
  /**column name */
  col_name: string;
  /** the data type with acute info */
  col_type: string | null;
  /** the data type without any acute info */
  data_type: string |null;
  /** java_type */
  java_type: string |null;
  /** column comment */
  col_comment: string | null;
  isPrimary: boolean;
  constructor() {
    this.col_name = "";
    this.java_type = null;
    this.data_type = null;
    this.col_type = null;
    this.col_comment = "";
    this.isPrimary = false;
  }

}
export= Column