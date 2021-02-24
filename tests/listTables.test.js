const ZtMeta = require("../lib");
it("listTables without columns and primary key",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    // notice use yourself database data
    ztmeta.listTables("security_oauth",{},(err,data,info)=>{
        expect(data[0].table_name).toBe('t_permission');
    })
});

it("listTables without columns but with primary key",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    // notice use yourself database data
    ztmeta.listTables("security_oauth",{},(err,data,info)=>{
        expect(data[0].primary_key.col_name).toBe("aa");
    })
});