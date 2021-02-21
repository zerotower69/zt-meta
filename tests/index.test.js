const ZtMeta = require("../dist")

const aa=async ()=>{
let ztmeta=new ZtMeta({
    user:'root',
    host:'127.0.0.1',
    password:'123456'
})
// console.log(await ztmeta.listDatabases())
// console.log(await ztmeta.listTables("security_oauth"))
// console.log(await ztmeta.listColumns("security_oauth","t_permission"))
// ztmeta.listColumns()
// ztmeta.findPrimaryKey("security_oauth","t_permission")
// .then((res)=>{
//     console.log(res,"aa")
// })
// .catch(err=>{
//     console.log("错误",err)
// })
console.log(await ztmeta.findPrimaryKey("security_oauth","t_permission"))
}

let bb=aa()