var express = require("express");
//var dustjs = require("dustjs-linkedin");
var app = express();
var router = require("./routes");
var exphbs = require('express-handlebars');
app.engine('.hbs', exphbs({defaultLayout: 'homeLayout', extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(__dirname + "/public"));
app.set("views", __dirname + "/views");

app.use("/", router);

app.listen(1337, function(){
	console.log('try');
});