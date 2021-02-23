const ZtMeta=require('./lib');
const mysql=require('mysql')
const Help =require("./lib/Help")
console.log(ZtMeta)
const ztmeta=new ZtMeta({
    host:'127.0.0.1',
    user:'root',
    password:'123456'
})

console.log(ztmeta)
ztmeta.listColumns("security_oauth","t_permission",{withPrimaryKey:true},(err,dbs,sql,info)=>{
    // if(err) console.log(err);
    // else console.log(dbs);
})

ztmeta.listTables("security_oauth",{withColumns:true},(err,tables,sql,info)=>{
    if(err) console.log(err,sql);
    else console.log(tables[0].columns);
})

