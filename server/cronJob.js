/*
	Cron Job -- Get & Tweet / 1 hour
 */

var cron = require('node-cron');
require("date-utils");

module.exports = {
	RunInterval: "0 * * * *",	
	RunCronJob: function (task) {
		cron.schedule(this.RunInterval, () => {
			var dt = new Date();
			console.log(`Running Cron Job at ${dt.toFormat("YYYY/MM/DD HH24:MI:SS")}`);
			task();
		});
	}
};


