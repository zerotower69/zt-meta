const ZtMeta = require("../lib");

it("show version",()=>{
    let ztmeta=new ZtMeta({
        host:'127.0.0.1',
        user:'root',
        password:'123456'
    });
    ztmeta.showVersion((err,version,info)=>{
        //if you want to test, you must change the version to your MySQL   the command is: select version();
       expect(version).toBe("8.0.22");
    })
});