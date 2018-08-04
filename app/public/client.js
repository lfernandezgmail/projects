// client-side js
// run by the browser each time your view template referencing it is loaded

console.log('hello world :o');


      
        function getUsers(){
          hideUserForm();
          message('Getting Users...');
          //promises using arrow function syntax
          fetch('/getusers')
          .then((response) => {
             return response.json();
          })
          .then((users) => {
            displayUsers(users);
            message('');
          })
          .catch((err) => {
            // Code called in the future when an errors occurs during the request
            alert('Error: ' + err.message);
          });
          //promises using traditional syntax
          // fetch('getusers').then(function(response) { 
          //   // Convert to JSON
          //   return response.json();
          // }).then(function(users) {
          //   displayUsers(users);
          // }).catch(function(err) {
          // alert("Error: " + err.message);
          // });
        }
      
        function deleteUsers(){
          
          hideUserForm();

          fetch('/deleteusers')
          .then((response) => {
             return response.json();
          })
          .then((users) => {
            //document.getElementById('message').innerHTML = 'users deleted';
            message('Users deleted');
            document.getElementById('users').innerHTML = '';
          })
          .catch((err) => {
            // Code called in the future when an errors occurs during the request
            document.getElementById('message').innerHTML = 'Error: ' + err.message;
            message('users deleted');
          });
        }

        function createUser(){
          //create the javascript object from the form
          var user = new Object();
          user.name = document.getElementById('username').value;
          user.age = document.getElementById('age').value;
          user.city = document.getElementById('city').value;
          
          console.log(user);

          fetch('/createuser',{
            method: "POST",
            headers: {'Content-Type':'application/json', 'Access-Control-Origin': '*'},
            body:  JSON.stringify(user)
          })
          .then((response) => {
             return response.json();
          })
          .then((resp) => {
            console.log(resp);
            message('User created (press the Get Users button to confirm it is in the DB)');

          })
          .catch((err) => {
            // Code called in the future when an errors occurs during the request
            document.getElementById('message').innerHTML ='Error: ' + err.message;
          });
         
        }
      
        function displayUsers(users){
           hideUserForm();
           document.getElementById('users').innerHTML = "";
           console.log('in displayUsers' + users);
           if (users.length == 0){
             document.getElementById('users').innerHTML='No Users in DB';
           } else
           {
             for(var i=0;i < users.length;i++){
               var divVar =document.createElement('div');
               divVar.setAttribute('id','name' );
               document.getElementById('users').appendChild(divVar);
               var textNode = document.createTextNode(users[i].name + " " + users[i].age + " " + users[i].city );
               divVar.appendChild(textNode);
             }
           }
        }
      
        function displayUserForm(){
          document.getElementById('createUserForm').style.display = "block";
        }
      
        function hideUserForm(){
          document.getElementById('createUserForm').style.display = "none";
          document.getElementById('username').value="";
          document.getElementById('age').value="";
          document.getElementById('city').value="";
        }
      
        function message(msg){
          document.getElementById('message').innerHTML = msg;
          
          var erase = function(){
            console.log('debug 22');
            document.getElementById('message').innerHTML = "";
          }
          setTimeout(erase, 3000);
          console.log('debug 33');
        }
