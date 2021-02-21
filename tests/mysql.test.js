const mysql=require("mysql")
const SQL =require("../dist/sql")
const db=new mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password:'123456'
})

db.connect()

// db.query("select version()",(err,results)=>{
//     console.log(results[0]["version()"])
//     if(err){
//         console.log(err)
//     }
// })
let sql="select column_name,is_nullable,data_type,column_type,column_key,column_comment,column_default from information_schema.columns where table_schema='security_oauth' and table_name='t_permission' ";
db.query(SQL.FIND_PRIMARY,["security_oauth","t_permission"],(err,result)=>{
    console.log(SQL.FIND_PRIMARY);
    if(err){
        console.log(err);
    }
    else{
       result.forEach(rt=>{
           console.log(rt);
       })
    }
})

db.end()
