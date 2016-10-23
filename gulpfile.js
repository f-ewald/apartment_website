'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');
var merge = require('merge-stream');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function() {
	var bootstrap = gulp.src('node_modules/bootstrap-sass/assets/stylesheets/**/*.scss')
		.pipe(sass().on('error', sass.logError))
   		.pipe(gulp.dest('dist/bootstrap'));
	var own_code = gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('dist/css'))
	    .pipe(connect.reload());
	return merge(bootstrap, own_code);
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('html:watch', function() {
	gulp.watch('./html/**/*.html', function() {
		gulp.src('./html/**/*.html')
			.pipe(gulp.dest('dist'))
			.pipe(connect.reload());
	});
});

gulp.task('watch', ['sass:watch', 'html:watch']);

gulp.task('debug', ['dist', 'sass', 'connect', 'watch']);

gulp.task('connect', function() {
  connect.server({
  	root: 'dist',
  	livereload: true
  });
});

gulp.task('dist', function () {
	// Distribution
	var html = gulp.src('html/**/*.html')
		.pipe(gulp.dest('dist'));

	var images = gulp.src('img/**/*.jpg')
		.pipe(gulp.dest('dist/img'));

	return [html, images];
});