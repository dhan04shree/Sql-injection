const express = require("express");
const mysql = require('mysql2');
const app = express();
const path = require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

app.use(express.static(path.join(__dirname,"/public/css")));
app.use(express.urlencoded({extended:true}));

const connection = mysql.createConnection({
  host : 'localhost',
  user:'root',
  database: 'sqlinjection',
  password:'password' //Enter your MySQL password
});

app.get('/products', (req, res) => {
  const productId = req.query.id;
  const sql = `SELECT * FROM products WHERE id = ${productId}`;

  connection.query(sql, (err, results) => {
    if (err) {
      res.send('Error occurred');
    } else {
      res.render("index.ejs",{results});
    }
  });
});
app.get("/login",(req,res)=>{
  res.render("directlogin.ejs");
});

app.post('/login', (req, res) => {
  let {username,password}= req.body;
  const sql = "SELECT * FROM users WHERE username = '" + username + "' AND password = '" + password + "'";
  ;

  connection.query(sql, (err, results) => {
    if (err) {
      return res.send('Error occurred');
    } else {
      if(results.length === 0){
        return res.send("Invalid username or password");
      }
      return res.send("login successful");
    }
  });
});
app.listen("3001",()=>{
  console.log("server listening to port 3001");
});


