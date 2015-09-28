module.exports = {
	queue : require("./queue"),
	user : require("./user"),
	spot : require("./spot"),
	index : function  (req,res) {
		res.sendFile("index.html",{root:__dirname+"../../public"});
	}
}