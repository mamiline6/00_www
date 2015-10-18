var gulp         = require('gulp');
var sass         = require('gulp-sass');
var rename       = require('gulp-rename');
var minify       = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var uglify       = require('gulp-uglify');
var browserSync  = require('browser-sync');
var plumber      = require('gulp-plumber');
var jade         = require('gulp-jade');

var jadeSrc      = 'src/assets/jade/**/*.jade';
var _jadeSrc     = '!src/assets/jade/**/_*.jade';
var sassSrc      = 'src/assets/scss/**/*.scss';
var prejsSrc     = 'src/assets/js/**/*.js';
var templatesSrc = 'app/';
var cssSrc       = 'app/css';
var minjsSrc     = 'app/js';
var devSrc       = 'app/**';
var rootSrc      = 'app';


gulp.task('jade', function() {
	gulp.src([jadeSrc, _jadeSrc])
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(templatesSrc));
});

gulp.task('sass', function(){
	gulp.src(sassSrc)
		.pipe(plumber())
		.pipe(sass({
			outputStyle :'expanded'
		}))
		.pipe(autoprefixer(["last 2 version", "ie 8"]))
		.pipe(gulp.dest(cssSrc))
		.pipe(minify())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(cssSrc));
});

gulp.task('js', function () {
	gulp.src(prejsSrc)
		.pipe(uglify())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(minjsSrc));
});

gulp.task('browserSync', function () {
	browserSync({
		server: {
			baseDir: rootSrc
		}
	});
	browserSync.reload();
});

gulp.task('default', function(){
	gulp.watch(jadeSrc, ['jade']);
	gulp.watch(sassSrc, ['sass']);
	gulp.watch(prejsSrc, ['js']);
	gulp.watch(devSrc, ['browserSync']);
});
