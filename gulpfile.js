const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));

// Sass compiling task
gulp.task('sass', function() {
    return gulp.src('src/scss/main.scss') // Source folder containing your .scss files
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('public/stylesheets'));
});

// Watch task
gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.scss', gulp.series('sass')); 
});

// Default task
gulp.task('default', gulp.series('sass', 'watch'));
