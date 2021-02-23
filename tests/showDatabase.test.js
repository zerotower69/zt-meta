const ZtMeta = require("../dist")
// const Client=require("../dist/Client")

it("showdatabase method with system",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    let data_actual=[''];
    ztmeta.showdatabase((err,data,info)=>{
        // expect(typeof data).toBe('object');
        expect(data.includes('mysql')).toBe(true);
    })
})

it("showdatabase method without system",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    ztmeta.showdatabase((err,data,info)=>{
        // expect(typeof data).toBe('object');
        expect(data.includes('mysql')).toBe(false);
    },{withSystemDatabase:false})
})

