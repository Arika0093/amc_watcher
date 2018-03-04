
require("date-utils");

var serverSetup = require("./server/serverSetup");
var getamcp = require("./server/getAmcPrice");
var myDb = require("./server/accessDB");
var cronjob = require("./server/cronJob");
var tweetbot = require("./server/tweetBot");

// Set Cron Job
cronjob.RunCronJob(task);

// Running Task
function task() {
	var dt = new Date();
	var dt_sh_str = dt.toFormat("YYMMDDHH24MISS");
	var dt_ln_str = dt.toFormat("YY/MM/DD HH24:MI");
	// DB top
	var db = myDb.createDb("root");
	// GET
	getamcp.getAmcPrices().then((datas) => {
		// Save DB
		myDb.insertData(db, dt_sh_str, datas);  // backup
		myDb.insertData(db, "latest", datas);   // latest data
		// tweet it
		var tweet_str = dt_ln_str + "\n" + (datas.map((e) => {
			return `${e.price}: ${e.sell_price > 0 ? e.sell_price : "[ERR]"}`;
		}).join("\n"));
		
		tweetbot.Tweet(tweet_str);
	});
}
