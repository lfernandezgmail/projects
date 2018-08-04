exports.get = function(request, response, db) {


db.all('SELECT * from Users', function(err, rows) {
    console.log('Results fom sql select');
    console.log(rows);
    response.send(JSON.stringify(rows));
  });
  
}