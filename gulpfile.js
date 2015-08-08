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
livereload = require('gulp-livereload');

gulp.task("compile-foundation", function () {
	return gulp.src('bower_components/foundation/scss/*.scss')
	.pipe(sass({
			includePaths : ['bower_components/foundation/scss']
		}))
	.pipe(gulp.dest('./public/css'));
});

gulp.task('default', ['compile-foundation']);
