const express   = require('express');
const mysql     = require('mysql');
const dbconfig  = require('./config/database.js');
const connection = mysql.createConnection(dbconfig);

const app       = express();

app.set('port', process.env.PORT || 3000);

app.get('/', (req, res) => {
    res.send('Root');
});

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

