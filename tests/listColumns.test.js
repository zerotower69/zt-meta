const ZtMeta = require("../lib");
it("list columns function test 01",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    // notice use yourself database data
    ztmeta.listColumns("security_oauth","t_permission",{},(err,data,info)=>{
        expect(data[0].table_name).toBe('t_permission');
    })
});