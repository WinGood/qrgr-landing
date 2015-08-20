var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    jade            = require('gulp-jade'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    livereload      = require('gulp-livereload'),
    plumber         = require("gulp-plumber"),
    coffee          = require('gulp-coffee'),
    es              = require("event-stream");

gulp.task('jade', function(){
    gulp.src('./src/jade/*.jade')
        .pipe(plumber({
            errorHandler: function(err){
                console.log(err);
                this.emit('error jade');
            }
        }))
        .pipe(jade())
        .pipe(gulp.dest('./'))
});

gulp.task('sass', function(){
    var vendor = gulp.src('./bower_components/normalize-css/normalize.css');

    var bundle = gulp.src('./src/sass/main.sass')
        .pipe(plumber({
            errorHandler: function(err){
                console.log(err);
                this.emit('error sass');
            }
        }))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: true
        }));

    return es.merge(vendor, bundle)
        .pipe(concat('combined.css'))
        .pipe(gulp.dest('./assets/css/'))
        .pipe(livereload());
});

gulp.task('coffee', function(){
    gulp.src('./src/coffee/*.coffee')
        .pipe(plumber({
            errorHandler: function(err){
                console.log(err);
                this.emit('error coffee');
            }
        }))
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('dev', function(){
    livereload.listen();

    // Jade
    gulp.watch([
        './src/jade/*.jade'
    ], ['jade']).on('change', livereload.changed);

    // Sass
    gulp.watch([
        './src/sass/*.sass'
    ], ['sass']);

    // Coffee
    gulp.watch([
        './src/coffee/*.coffee'
    ], ['coffee']).on('change', livereload.changed);
});


