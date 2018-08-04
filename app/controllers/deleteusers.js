exports.get = function(request, response, db) {

   db.run('DELETE FROM Users');
   var myOb = {"Deleted From Users" : "true"};
   response.json(myOb);
  
}