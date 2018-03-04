
require("date-utils");

var getamcp = require("../server/getAmcPrice");
var tweetbot = require("../server/tweetBot");

getamcp.getAmcPrices().then((datas) => {
	var dt = new Date();
	var dt_ln_str = dt.toFormat("YY/MM/DD HH24:MI");
	// tweet it
	var tweet_str = `${dt_ln_str}\n` +
		(datas.map((e) => {
			var downrate = Math.floor((1-e.sell_price/e.price)*100);
			return `${e.price}: ${e.sell_price > 0 ? `￥${e.sell_price} [${downrate}%OFF]` : "[ERR]"}`;
		}).join("\n")
				
				
		);
	
	//console.log(tweet_str);
	tweetbot.Tweet(tweet_str);
});
