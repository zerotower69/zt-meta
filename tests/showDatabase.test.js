const ZtMeta = require("../lib");

it("list database method with system",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    let data_actual=[''];
    ztmeta.listDatabases({},(err,dbs,info)=>{
        // expect(typeof data).toBe('object');
        expect(dbs.includes('mysql')).toBe(true);
    })
});

it("show database method without system",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    ztmeta.listDatabases({withSystemDataBases:false},(err,data,info)=>{
        // expect(typeof data).toBe('object');
        expect(data.includes('mysql')).toBe(false);
    })
});

