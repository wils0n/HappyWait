var express    = require("express");
var app        = require("express")();
var components = require("./components");
var bodyParser = require("body-parser");


app.use(bodyParser.json());



app.use("/user",components.user);
app.use("/queue",components.queue);
app.use("/spot",components.spot);
app.use(express.static(__dirname+"/public"));
app.get("/",components.index);
app.all("*",function  (req,res) {
	console.log("redirigiendo");
	res.redirect("/");
});
app.listen(3000);

console.log("Api corriendo en localhost:3000");