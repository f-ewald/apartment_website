'use strict';

var gulp = require('gulp');
var connect = require('gulp-connect');
var sass = require('gulp-sass');

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('sass', function() {
	return gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
	    .pipe(gulp.dest('dist/css'))
	    .pipe(connect.reload());
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('watch', ['sass:watch']);

gulp.task('debug', ['dist', 'sass', 'connect', 'watch']);

gulp.task('connect', function() {
  connect.server({
  	root: 'dist',
  	livereload: true
  });
});

gulp.task('dist', function () {
	// Distribution
	gulp.src('index.html')
		.pipe(gulp.dest('dist'));
});