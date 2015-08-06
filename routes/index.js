//routes configuration
var router = require("express").Router();

	router.get('/', function(req, res){
		res.render("index",{title:"candy-deals"});
	});
	
module.exports = router;