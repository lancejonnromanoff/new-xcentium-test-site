'use strict';

var    gulp = require('gulp'),
     concat = require('gulp-concat'),
        del = require('del'),
       sass = require('gulp-sass'),
         bs = require('browser-sync').create(),
     minify = require('gulp-minify');

gulp.task('browser-sync', function() {
           bs.init({
               server: {
                   baseDir: "./public/"
               }
           });
       });

gulp.task('compileSass', function() {
  return gulp.src("scss/style.scss")
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(gulp.dest('public/css'))

});

gulp.task("concatIndex", function() {
  gulp.src(['partials/header.html', 'partials/indexbody.html', 'partials/footer.html'])
  .pipe(concat("index.html"))
  .pipe(gulp.dest("public"))
});

gulp.task('compress', function() {
  gulp.src(['js/*.js', 'js/*.mjs'])
    .pipe(minify())
    .pipe(gulp.dest('public'))
});

gulp.task("watch", ['browser-sync'], function() {
  gulp.watch(['partials/*.html', 'scss/*', 'img/*', 'js/*'], ['build']).on('change', bs.reload)
});

gulp.task('clean', function() {
  del(['public'])
});

gulp.task("build", ['compileSass', 'concatIndex'], function() {
  return gulp.src(["css/*", "img/*", "js/*"], { base: './'})
  .pipe(gulp.dest('public'))
});

gulp.task("default", ["watch"]);
