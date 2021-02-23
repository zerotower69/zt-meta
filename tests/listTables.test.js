const ZtMeta = require("../dist");
const Table=require('../dist/Table')
it("listTables without columns",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    let rt=new Table();
    // notice use yourself database data
    ztmeta.listTables("security_oauth",(err,data,info)=>{
        expect(data[0].table_name).toBe('t_permission');
    })
})