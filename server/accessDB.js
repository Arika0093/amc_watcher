/*
	Simple Save and Load to DB 
 */
var nano = require("nano");

module.exports = {
	createDb: function(name) {
		nano.db.create(name);
		return nano.db.use(name);
	},
	destroyAndCreateDb: function(name) {
		nano.db.destroy(name);
		return this.createDb(name);
	},
	destroyDb: function(name) {
		nano.db.destroy(name);
	},
	insertData: function(db, key, value) {
		db.insert(value, key, (err) => {
			console.log(err);
		});
	},
	insertJsonData: function(db, key, jsonvalue) {
		this.insertData(db, key, JSON.parse(jsonvalue));
	},
	readData: function(db, key) {
		return db.get(key, (err) => {
			console.log(err);
		});
	},
	readJsonData: function(db, key) {
		return JSON.stringify(this.readData(db, key));
	},
}