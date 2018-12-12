const express = require("express")
const app = express()
const db =  new (require("./db.js"))
const bodyParser = require("body-parser")
app.use(bodyParser.json())

// Functions
function newUser(firstName, lastName, address, email, phoneNumber){
 let self = this
 this.id = function(){
  if(db.read().length == 0){return 1}
  else{return (db.read()[db.read().length-1].id + 1)}
 }
 this.firstName = firstName
 this.lastName = lastName
 this.address = address
 this.email = email
 this.phoneNumber = phoneNumber
 }


 //Create new user
app.post("/createUser", function(req, res){
 var newUser = new newUser(req.body.firstName, req.body.lastName, req.body.address, req.body.email, req.body.phoneNumber)
 var data = db.read().push(newUser)
 db.write(data)
 res.send(`the user was created successfully id: ${newUser.id}`)
 });

//Delete User
app.delete("/deleteUser/:id", function(req, res){
 var id = req.params.id
 var data = db.read()
 for( var i = data.length-1; i--;){
  if ( data[i].id === id) {data.splice(i,1)};
  }
  res.send("The contact has been deleted succesfully")
})


app.listen(3000, function(){
 console.log("application is listening on port 3000")
})