const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const mysql = require('mysql');
const dbconfig = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app = express();
const fs = require('fs');

app.use(bodyParser.urlencoded({ extended: true}));

app.set('port', process.env.PORT || 11731);

app.get('/', (req, res) => {
  fs.readFile('index.html', function(error, data) {
    if(error) {
      console.log(error);
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8'});
      connection.query('SELECT * from exts', (error, rows) => {
        if (error) throw error;
        console.log('default exts: ', rows);
        // let result = "";
        for(let elem of rows) {
          if(elem.toggle == 1) {
           // document.getElementById(elem.name).checked = true;
          }
          //result += "<p>id: " + elem.name + ", toggle: " + elem.toggle + "</p>";
        }
      });
      
      res.end(data);
    }
  });    
});

app.post('/', (req, res) => res.send(req.body));

app.get('/users', (req, res) => {
    connection.query('SELECT * from exts', (error, rows) => {
      if (error) throw error;
      console.log('default exts: ', rows);
      let result = "";
      for(let elem of rows) {
        result += "<p>id: " + elem.name + ", toggle: " + elem.toggle + "</p>";
      }
      res.send(result);
    });
  });
  
app.listen(app.get('port'), () => {
  console.log('Express server listening on port ' + app.get('port'));
});

