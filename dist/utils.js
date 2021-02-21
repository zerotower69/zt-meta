"use strict";
class Utils {
    static computeJavaType(column_type, data_type) {
        if (data_type === "int")
            return "Integer";
        else if (data_type === "char" || data_type === "varchar" || data_type == "long")
            return "String";
        else if (data_type === "tinyint") {
            if (column_type === "tinyint(1)")
                return "boolean";
            else
                return "Byte";
        }
        else if (data_type === "numeric" || data_type === "decimal" || data_type === "number")
            return "BigDecimal";
        else if (data_type === "bit")
            return "boolean";
        else if (data_type === "smallint")
            return "short";
        else if (data_type === "bigint")
            return "long";
        else if (data_type === "real")
            return "float";
        else if (data_type === "double")
            return "double";
        else if (data_type === "date")
            return "Date";
        else if (data_type === "time")
            return "time";
        else if (data_type === "timestamp" || data_type === "datetime")
            return "Timestamp";
        else if (data_type === "clob")
            return "Clob";
        else if (data_type === "blob")
            return "Blob";
        else
            return "";
    }
}
module.exports = Utils;
