const ZtMeta = require("../dist")

    

const aa=async ()=>{
let ztmeta=new ZtMeta({
    user:'root',
    host:'127.0.0.1',
    password:'123456'
})
// console.log(await ztmeta.listDatabases())
// console.log(await ztmeta.listTables("security_oauth"))
console.log(await ztmeta.listColumns("security_oauth","t_permission"))
ztmeta.listColumns()
}

let bb=aa()