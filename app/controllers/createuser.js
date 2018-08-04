exports.get = function(request, response, db) {

  var sqlString = 'INSERT INTO Users (name,age,city) VALUES (' + ' " ' + request.body.name + ' " ' + ',' + '  ' + request.body.age + '  ' + ',' + ' " ' + request.body.city + ' " ' + ')';
  console.log(sqlString);
  db.serialize(function() {
      db.run(sqlString);
  });
  
  var myOb = {"Success" : "true"};
  response.json(myOb);
  
}