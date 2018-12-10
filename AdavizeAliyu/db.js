const fs = require("fs")
const Db = function(){
}
Db.prototype.read = function(){
return JSON.parse(fs.readFileSync("./db.json", "utf-8"))
}

Db.prototype.write = function(newData){  
 fs.writeFileSync("./db.json", JSON.stringify(newData)) 
}

module.exports = Db

