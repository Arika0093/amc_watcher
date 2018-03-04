'use strict';

var gulp = require('gulp');
var config = require("config");
var path = require("path");

var watch = require("gulp-watch");
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

var listen_port = config.serverSetup.listen_port;
var proxy_port = config.serverSetup.proxy_port;

// browserSync
gulp.task('browser-sync', () => {
	browserSync.init(null, {
		proxy: `http://localhost:${listen_port}`,
		// files: ["./client/**/*.jade"],
		port: proxy_port,
		open: false
	});
	gulp.watch("./client/**/*").on("change", browserSync.reload);
});

// nodemon
gulp.task('nodemon', () => {
	nodemon({
		script: 'index.js',
		ext: 'js json yaml',
		ignore: [       // nodemon で監視しないディレクトリ
			'node_modules',
			'client',
			'public',
			'test'
		],
		env: {
			'PORT': listen_port,
			'NODE_ENV': 'development'
		},
		stdout: false  // Express の再起動時のログを監視するため
	})
	.on('readable', function() {
		this.stdout.on('data', function(chunk) {
			if (/^Express\ server\ listening/.test(chunk)) {
				// Express の再起動が完了したら、reload() でBrowserSync に通知。
				// ※Express で出力する起動時のメッセージに合わせて比較文字列は修正
				browserSync.reload({ stream: false });
			}
			process.stdout.write(chunk);
		});
		this.stderr.on('data', function(chunk) {
			process.stderr.write(chunk);
		});
	});
});

// ------------------------
// serve
gulp.task('serve', ['nodemon', 'browser-sync'], function () {
	
});

