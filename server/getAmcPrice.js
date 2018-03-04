/*
	Get Amazon Coin Price with Scraiping
 */

let https = require("https");
let extend = require("extend");

module.exports = {
	
	UrlTemplate: "https://www.amazon.co.jp/Amazon-%%PRICESTR%%-Amazonコイン/dp/%%ASIN%%/",
	
	AmcList: [
		{ price:   500, price_str:    "500", asin: "B00KQVX53C", },
		{ price:  1000, price_str:  "1-000", asin: "B00KQVX7EY", },
		{ price:  2500, price_str:  "2-500", asin: "B00KQVX9J2", },
		{ price:  5000, price_str:  "5-000", asin: "B00KQVXBLS", },
		{ price: 10000, price_str: "10-000", asin: "B00KQVXDW0", },
		{ price: 50000, price_str: "50-000", asin: "B018GUTE1G", },
	],
	
	getAmcPrices: function() {
		// 全タスクが完了したらthenが呼ばれる
		return Promise.all(
			this.AmcList.map((e) => {
				return this.getAmcPrice(e);
			})
		);
	},
	
	getAmcPrice: function (amc_obj) {
		return new Promise((res, rej) => {
			// 非同期処理を記述
			var res_obj = extend({}, amc_obj);
			var url = this.UrlTemplate
				.replace("%%PRICESTR%%", amc_obj.price_str)
				.replace("%%ASIN%%", amc_obj.asin);
			// GET REQUEST SEND
			var req = https.request(url, (res_https) => {
				var raw_html = "";
				res_https
					.on("data", (chunk) => {
						// RECIEVE DATA
						raw_html += chunk;
					})
					.on("end", () => {
						// END RECIEVE
						var prc = this.parseHTMLtoPrice(raw_html);
						res_obj["sell_price"] = prc;
						res(res_obj);
					});
				
				
			});
			req.end();
		});
		
	},
	
	parseHTMLtoPrice: function(rawHtml) {
		var exp = rawHtml.match(/<span.*id="priceblock_ourprice".*>￥\s*([0-9,]+)/);
		if(exp && exp[1]){
			return Number(exp[1].replace(",", ""));
		} else if(exp) {
			return -1;
		} else {
			return -2;
		}
	},
	
	
	
};
