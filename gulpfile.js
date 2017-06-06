const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');

gulp.task('lint', () => (
  gulp.src(['**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
));

gulp.task('sass', () => (
  gulp.src('./resources/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public/css'))
));

gulp.task('sass:watch', () => (
  gulp.watch('./sass/**/*.scss', ['sass'])
));

gulp.task('default', ['lint', 'sass'], () => {
  //
});
