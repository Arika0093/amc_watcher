
var gamp = require("../server/getAmcPrice");
//var chai = require("chai");
var assert = require("assert");

//descrbe('Test --- Get Amazon Coin Price Method', function(){
//	it("getAmcPrice", () => {
		gamp.getAmcPrices().then((datas) => {
			console.log(datas);
		});
//	});

//	it("getAmcPrice", () => {
		var amc_o_1 = gamp.AmcList[0];
		var amc_o_2 = gamp.AmcList[3];
		gamp.getAmcPrice(amc_o_1).then((obj) => {
			console.log(obj);
			//assert.equal(!!obj.sell_price, true);
		});
		gamp.getAmcPrice(amc_o_2).then((obj) => {
			console.log(obj);
			//assert.equal(!!obj.sell_price, true);
		});
//	});

//	it("parseHTMLtoPrice", () => {
		var rawHtml = "\n" +
			"    <td id=\"priceblock_ourprice_lbl\" class=\"a-color-secondary a-size-base a-text-right a-nowrap\">価格:</td>\n" +
			"                <span id=\"priceblock_ourprice\" class=\"a-size-medium a-color-price\">￥ 9,400</span>\n" +
			"        <span id=\"ourprice_fbabadge\">\n" +
			"        <span id=\"ourprice_shippingmessage\">\n";
		console.log(gamp.parseHTMLtoPrice(rawHtml));

//	});
	
	
//});
