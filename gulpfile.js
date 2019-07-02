var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function (params) {
   return gulp.src('./scss/*.scss').pipe(sass())
   .pipe(gulp.dest('./css')); 
});

gulp.task('watch', function (params) {
    gulp.watch('./scss/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);