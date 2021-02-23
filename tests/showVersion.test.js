const ZtMeta = require("../dist");

it("showversion",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    ztmeta.showVersion((err,data,info)=>{
        //if you want to test, you must change the version to your MySQL   the command is: select version();
       expect(/^8[-.]0[-.]22/.test(data)).toBe(true);
    })
})