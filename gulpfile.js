const gulp = require('gulp');
const util = require('gulp-util');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minifyCSS = require('gulp-clean-css');
const inject = require('gulp-inject');
const clean = require('gulp-clean');

const production = !!util.env.production;

gulp.task('clean', () => (
  gulp.src(['./public/css/**/*.css', './public/js/**/*.js'], { read: false })
    .pipe(clean())
));

gulp.task('lint', () => (
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('sass', ['clean'], () => (
  gulp.src('./resources/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(production ? concat('all.min.css') : util.noop())
    .pipe(production ? minifyCSS() : util.noop())
    .pipe(gulp.dest('./public/css'))
));

gulp.task('sass:watch', () => (
  gulp.watch('./sass/**/*.scss', ['sass'])
));

gulp.task('inject-css', ['sass'], () => (
  gulp.src('./resources/views/layouts/injected-css.hbs')
    .pipe(inject(gulp.src(['./public/css/*.css'], { read: false })))
    .pipe(gulp.dest('./resources/views/layouts/'))
));

gulp.task('inject-js', ['clean'], () => (
  gulp.src('./resources/views/layouts/injected-js.hbs')
    .pipe(inject(gulp.src(['./public/js/*.js'], { read: false })))
    .pipe(gulp.dest('./resources/views/layouts/'))
));

gulp.task('default', ['lint', 'sass', 'inject-css', 'inject-js'], () => {
  //
});
