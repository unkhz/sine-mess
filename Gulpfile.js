var gulp = require('gulp');
var gutil = require('gulp-util');

function logErrorAndNotify(e) {
  gutil.log('Error running task', e.plugin);
  gutil.log(e.message);
  gutil.log(e.stack);
}

// Clean
var rimraf = require('rimraf');
gulp.task('clean', function() {
  rimraf.sync('index.css');
});

// SASS -> CSS
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
gulp.task('css', function() {
  var stream = gulp.src(['index.scss'])
  .pipe(sass({
    // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
    onError: function(err){
      logErrorAndNotify({plugin:'sass', message: err});
    }
  }))
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  .on('error', logErrorAndNotify)
  .pipe(gulp.dest('.'));
  return stream;
});
gulp.watch(['*.scss'], ['css']);

// Generic tasks
gulp.task('default', ['clean', 'css'])
gulp.task('dist', ['default'], function(){
  process.exit(0);
});