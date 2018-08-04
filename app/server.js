// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

//see https://stackoverflow.com/questions/5710358/how-to-retrieve-post-query-parameters
app.use(express.json());       // to support JSON-encoded bodies

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// init sqlite db
var fs = require('fs');
var dbFile = './.data/sqlite.db';
var exists = fs.existsSync(dbFile);
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(dbFile);

// if ./.data/sqlite.db does not exist, create it, otherwise print records to console
db.serialize(function(){
  // if (!exists) {
    db.run('DROP TABLE IF EXISTS Users');
    db.run('CREATE TABLE Users (name TEXT,age INTEGER,city TEXT)');
    console.log('New table Users created!');
    
    // insert default users
    db.serialize(function() {
      db.run('INSERT INTO Users (name,age,city) VALUES ("Luke","55","Ogden")');
      db.run('INSERT INTO Users (name,age,city) VALUES ("Joe","20","Hanovers")');
    });
  
    console.log('Database "Users" ready to go!');
    db.each('SELECT * from Users', function(err, row) {
      if ( row ) {
        console.log('record:', row);
      }
    });
  
});

//begin core routes used in app

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});


app.get('/getusers', function(request, response) {
  require(__dirname + '/controllers/getusers').get(request,response,db);
});

app.post('/createuser', function(request, response) {
  require(__dirname + '/controllers/createuser').get(request,response,db);
});

app.get('/deleteusers', function(request, response) {
  require(__dirname + '/controllers/deleteusers').get(request,response,db);
});
//end core routes used in app

//begin some demo routes 
app.get('/foo', function(request, response) {
   //send the foo file
   response.sendFile(__dirname + '/views/foo.html');
});
app.get('/bar', function(request, response) {
   //execute the bar.js code
   require(__dirname + '/bar.js').get(request,response);
});
app.get('/demojson', function(request, response) {
   var myObj = [{"name":"John", "age":31, "city":"New York"},{"name":"Jill", "age":28, "city":"Chicago"}];
   response.json(myObj);
});
app.get('/users/:username', function (request, response) {
  console.log(request.params.username);
  var sqlString = 'SELECT * from Users WHERE name="' + request.params.username + '"';
  db.all(sqlString, function(err, rows) {
    console.log('Results fom sql select');
    console.log(rows);
    response.send(JSON.stringify(rows));
  });
  
})
//end some demo routes



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
