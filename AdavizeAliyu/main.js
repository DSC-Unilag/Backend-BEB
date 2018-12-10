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

app.post("/createUser", function(req, res){
 var newUser = new newUser
 var data = db.read().push(newUser)
 db.write(data)

 res.send(`the user was created successfully`)
 });



app.listen(3000)