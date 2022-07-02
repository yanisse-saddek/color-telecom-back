const express = require('express')
const app = express()
const mysql = require('mysql');
const cors = require('cors')
require('dotenv').config()

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASS,
    database:process.env.DATABASE
  });
  db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
    // db.query("CREATE DATABASE colortelecom", function (err, result) {  
    //     if (err) throw err;  
    //     console.log("Database created");  
    // });  
    // var sql = "CREATE TABLE openings (id INT AUTO_INCREMENT primary key, horaires TEXT(500), user VARCHAR(255))";  
    // db.query(sql, function (err, result) {  
    // if (err) throw err;  
    // console.log("Table created");  
    // });  
});
 

app.use(cors())
app.use(express.json())
app.get('/openings', (req, res)=>{      
    db.query(`SELECT * FROM openings where user = 'user' `, function (err, result) {  
        if (err) throw err;  
        res.json(result)  
    });  
})

app.post('/openings', (req, res)=>{
    console.log(req.body)
    var data = JSON.stringify(req.body);
    var sql = `INSERT INTO openings (horaires, user) VALUES ('${data}', 'user') `;  
    db.query(sql, function (err, result) {  
        if (err) throw err;  
        console.log("1 record inserted");  
    }); 
})

app.put('/openings', (req, res)=>{
    var data = JSON.stringify(req.body);
    var sql = `UPDATE openings SET horaires = '${data}' WHERE user = 'user'`;  
    db.query(sql, function (err, result) {  
        if (err) throw err;  
        res.json(result)
        // console.log("1 record inserted");  
    }); 
})
app.listen(3002)