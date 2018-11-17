var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		stylus         = require('gulp-stylus'),
		pug            = require('gulp-pug'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleanCSS       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		del            = require('del'),
		imagemin       = require('gulp-imagemin'),
		cache          = require('gulp-cache'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify");

	gulp.task('browser-sync', function() {
		browserSync({
			server: {
				baseDir: 'app'
			},
			notify: false,
		});
	});


gulp.task('js', function() {
	return gulp.src([
		'app/block/**/*.js',
		])
	.pipe(concat('scripts.min.js'))
	.pipe(uglify())
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }));
});

gulp.task('stylus', function() {
	return gulp.src('app/stylus/**/*.styl')
	.pipe(stylus())
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS())
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream())
});

gulp.task('pages', function() {
	return gulp.src('app/pages/*.pug')
	.pipe(pug({pretty: true}))
	.pipe(gulp.dest('app'))

});

gulp.task('watch', ['stylus', 'js', 'pages', 'browser-sync'], function() {
	gulp.watch('app/**/*.styl', ['stylus']);
	gulp.watch('app/**/*.pug', ['pages']);
	gulp.watch(['libs/**/*.js', 'app/js/common.js', 'app/block/**/*.js'], ['js']);
	gulp.watch('app/*.html', browserSync.reload);
});

gulp.task('imagemin', function() {
	return gulp.src('app/assets/**/*')
	.pipe(cache(imagemin())) 
	.pipe(gulp.dest('dist/assets')); 
});

gulp.task('build', ['removedist', 'imagemin', 'stylus', 'js', 'pages'], function() {

	var buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		]).pipe(gulp.dest('dist'));

	var buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	var buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('dist/js'));

});

gulp.task('removedist', function() { return del.sync('dist'); });
gulp.task('clearcache', function () { return cache.clearAll(); });

gulp.task('default', ['watch']);
