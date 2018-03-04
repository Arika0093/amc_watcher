/*
	Simple Tweet
 */
var config = require("config");
var tws = config.tweetbot;
var Tw = require("twitter");

module.exports = {
	Client: null,
	ClientUpdate: function() {
		this.Client = new Tw({
			consumer_key: tws.cons_key,
			consumer_secret: tws.cons_secret,
			access_token_key: tws.access_key,
			access_token_secret: tws.access_secret,
		});
	},
	Tweet: function(text) {
		if(!this.Client){
			this.ClientUpdate();
		}
		this.Client.post('statuses/update',
			{status: text}, (err) => {
				if(err){
					console.log(err);
				} else {
					console.log("Tweet Successly");
				}
			}
		);
	},
};