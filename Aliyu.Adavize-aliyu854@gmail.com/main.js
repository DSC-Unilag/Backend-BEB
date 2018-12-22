const express = require("express")
const app = express()
const db =  new (require("./db.js"))
const bodyParser = require("body-parser")
app.use(bodyParser.json())

// Functions/Object creators
function User(firstName, lastName, address, email, phoneNumber){
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
 function Edit(id, firstName, lastName, address, email, phoneNumber){
  this.id = id
  this.firstName = firstName
  this.lastName = lastName
  this.address = address
  this.email = email
  this.phoneNumber = phoneNumber
  }
 //Create new user
app.post("/createUser", function(req, res){
 var newUser = new User(req.body.firstName, req.body.lastName, req.body.address, req.body.email, req.body.phoneNumber)
 var data = db.read().push(newUser)
 db.write(data)
 res.send(`the user was created successfully id: ${newUser.id}`)
 });
 //Edit user
 app.put("/editUser/:id", function(req, res){
  var  id = req.params.id
  var found = ""
  var data = db.read()
  for( var i = data.length; i--;){
    if ( data[i].id === Number(id)) {
      var found = "yes"
      var newUser = new Edit(id, req.body.firstName, req.body.lastName, req.body.address, req.body.email, req.body.phoneNumber)
      data[i] = newUser
      db.write(data)
    };
    } 
  if(found != "yes"){
    res.send(`Unable to edit no record found ref: ${id}`)
  }
  else{
    res.send("edit successful")
  }

 })
//Delete User
app.delete("/deleteUser/:id", function(req, res){
  var found;
 var id = req.params.id
 var data = db.read()
 for( var i = data.length; i--;){
  if ( data[i].id ===Number(id)) {
    var found = "yes"
    data.splice(i,1)
  };
  }
  db.write(data)
  if(found != "yes"){
    res.send(`The contact was not found, can't delete ref:${id}`)
  }
  else{res.send("The contact has been deleted succesfully")}
})
//Get single contact
app.get("/getByid/:id", function(req,res){
  var id = req.params.id
  var response = ""
  var data = db.read()
  for(var i = data.length; i--;){
    if (data[i].id === Number(id)){response = data[i]
    }}
    if(response === ""){response = "No record found" }

    res.send(response)
})
//Get all contacts filter by Id and name
app.get("/getAll", function(req,res){
 var data = db.read()
 var response = ""
  data.forEach(function(contact){
    response += `id: ${contact.id} Name: ${contact.firstName} ${contact.lastName} ---`
  })
  if (response === ""){response = "No contact in database"}
  res.send(response)
})
//Search by Name (first/Last)
app.get("/getByname/:anyName", function(req,res){
  var name = req.params.anyName
  var data = db.read()
  var response = ""
  for( var i = data.length; i--;){
 if ( data[i].firstName.toUpperCase() === name.toUpperCase() || data[i].lastName.toUpperCase() === name.toUpperCase()){response +=
      `id: ${data[i].id} Name: ${data[i].firstName} ${data[i].lastName} -`
    }}
if (data.length === 0 ){
    response = "No record found"
  }
    res.send(response)
  })
  


  app.listen(3000, function(){
   console.log("application is listening on port 3000")
  })