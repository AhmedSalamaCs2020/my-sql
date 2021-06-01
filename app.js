const express=require('express')
const app=express()
const port=8000
//
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
  app.use(express.json())
  
var mysql = require('mysql')
var pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'salama',
  password: 'ZZY9lydUAzTQeEHk',
  database: 'node'
})

//
app.get('/users', function (req, res) {
    pool.getConnection(function (err, connection) {
        connection.query("SELECT * FROM users", function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send(JSON.stringify(rows));
        });
    });
});
//
app.post('/users', function (req, res) {
   const data= req.body
   const name=data['name']
   const job=data['job']
   const college=data['college']
   //console.log(data)
    pool.getConnection(function (err, connection) {
        let sql = `INSERT INTO users (name,job,college) VALUES (?, ?, ?)`;
        connection.query(sql, [
            name,
            job,
            college
          ] ,function (err, rows) {
            connection.release();
            if (err) throw err;
            res.send({'Message':'User Added Succesfully'});
           // res.send(JSON.stringify(rows));
        });
    });
});
//
app.listen(port,()=>{
    console.log("server is up on port "+port)
  })