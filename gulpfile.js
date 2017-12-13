'use strict';

const gulp         = require('gulp'),
      sass         = require('gulp-sass'),
      plumber      = require('gulp-plumber'),
      notify       = require('gulp-notify'),
      imagemin     = require('gulp-imagemin'),
      babel        = require("gulp-babel"),
      browserSync  = require('browser-sync').create(),
      uglify       = require('gulp-uglify'),
      pump         = require('pump'),
      autoprefixer = require('gulp-autoprefixer'),
      sourcemaps   = require('gulp-sourcemaps'),
      rollup       = require('rollup-stream'),
      source       = require('vinyl-source-stream'),
      buffer       = require('vinyl-buffer');


const config = {
      src_path : './src/',
      dest_path : './build/',
      bootstrap_path : './node_modules/bootstrap-sass/assets/',
      fontawesome_path : './node_modules/font-awesome/',
      jquery_path : './node_modules/jquery/dist/'
}

gulp.task('setup-assets' , function(){


    //setup/copy bootstrap fonts to build directory

    gulp.src(config.bootstrap_path + 'fonts/bootstrap/**.*')
    .pipe(gulp.dest(config.dest_path + 'fonts/bootstrap'))

    //copy jquery js files to build directory
    gulp.src(config.jquery_path + 'jquery.min.js')
    .pipe(gulp.dest(config.dest_path + 'js'))

    //copy bootstrap js files to build directory

    gulp.src(config.bootstrap_path + 'javascripts/bootstrap.min.js')
    .pipe(gulp.dest(config.dest_path + 'js'))

});

// image task
// compress image

gulp.task('image', function(){
  gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('build/images'));
});

gulp.task('sass' , function(){

    return gulp.src(config.src_path+'sass/**/*.scss')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(sass({
            noCache: true,
            style:'compact',
            includePaths : [
                config.bootstrap_path+"stylesheets",
                config.fontawesome_path+"scss"
            ]
        }))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.dest_path+'css'))
        .pipe(browserSync.stream());

});


var cache;

gulp.task('js',function(){

    return rollup({
        entry: config.src_path + 'js/app.js',
        format: 'umd',
        cache: cache
    })
    .on('bundle', function(bundle){

        cache = bundle;
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps:true}))
    .pipe(plumber())
    .pipe(babel())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dest_path + 'js'))
    .pipe(browserSync.stream());
});


gulp.task('serve',['sass','js','image','setup-assets'],function(){

    browserSync.init({
        server: config.dest_path
    });

    gulp.watch(config.src_path + 'images/*', ['images']); 

    gulp.watch(config.src_path + 'sass/**/*.scss',['sass']);

    gulp.watch(config.src_path + 'js/**/*.js',['js']);


});

gulp.task('default',['serve']);
