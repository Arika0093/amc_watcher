/*
	Routing Manager
 */

module.exports = (app) =>{

	// ROUTING ----------------------------------------
	// Browser access
	//app.get("/", (req, res, next) =>{
	//	res.render("index", {});
	//});

	// ROUTING DEFAULT --------------------------------
	// 404 Not found
	app.use(function(req, res, next){
		var err = new Error('Not Found');
		err.status = 404;
		err.stack = "invalid URL";
		
		res.locals.message = err.message;
		res.locals.error = err;
		res.render('error');
		// next(err);
	});

	// 500 Internal ERROR
	app.use(function(err, req, res, next){
		// set locals, only providing error in development
		res.locals.message = err.message;
		res.locals.error = req.app.get('env') === 'development' ? err : {};
		
		// render the error page
		res.status(err.status || 500);
		res.render('error');
	});
	
}