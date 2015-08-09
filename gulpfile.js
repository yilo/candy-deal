var gulp = require('gulp'),
sass = require('gulp-sass'),
autoprefixer = require('gulp-autoprefixer'),
minifycss = require('gulp-minify-css'),
jshint = require('gulp-jshint'),
uglify = require('gulp-uglify'),
imagemin = require('gulp-imagemin'),
rename = require('gulp-rename'),
clean = require('gulp-clean'),
concat = require('gulp-concat'),
notify = require('gulp-notify'),
cache = require('gulp-cache'),
copy = require('gulp-copy'),
livereload = require('gulp-livereload');

gulp.task("compile-sass", function () {
	return gulp.src(['bower_components/foundation/scss/*.scss','public/scss/*.scss'])
	.pipe(sass({
			style:"nested"			
		}))
	.pipe(autoprefixer({browsers: ['last 2 versions']}))	
	.pipe(gulp.dest('./public/css'));
});

gulp.task("copy-thirdparty-js", function(){
	return gulp.src(["./bower_components/handlebars/handlebars.min.js"]).pipe(copy('./public/js/vendors/',{"prefix":3}));
});

gulp.task("watch", function(){
	gulp.watch("./**/*.scss", ["compile-sass"]);
});

gulp.task('default', ['compile-sass','copy-thirdparty-js']);
