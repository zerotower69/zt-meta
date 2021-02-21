const fs = require('fs-extra')
const path = require('path')

const utils =require("../dist/src/utils")
fs.readJson("../json/java.json", (err, json) => {
    if (err) console.log(err)
    else {
        // json = JSON.parse(json.toString())
        // console.log(json, typeof json)
    }
})

console.log(utils.computeJavaType("int(","tinyint"))
