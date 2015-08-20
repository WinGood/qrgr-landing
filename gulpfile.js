var gulp            = require('gulp'),
    sass            = require('gulp-sass'),
    jade            = require('gulp-jade'),
    autoprefixer    = require('gulp-autoprefixer'),
    concat          = require('gulp-concat'),
    livereload      = require('gulp-livereload'),
    plumber         = require("gulp-plumber"),
    coffee          = require('gulp-coffee'),
    browserify      = require("browserify"),
    vinylSource     = require("vinyl-source-stream"),
    debowerify      = require('debowerify');
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
        .pipe(livereload());
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
    gulp.src('./src/coffee/main.coffee')
        .pipe(plumber({
            errorHandler: function(err){
                console.log(err);
                this.emit('error coffee');
            }
        }))
        .pipe(coffee({bare: true}))
        .pipe(gulp.dest('./assets/js/'));

    return browserify('./assets/js/main.js')
        .transform(debowerify)
        .bundle().on('error', function(err){
            console.log(err.toString());
            this.emit('end');
        }) // EventEmitter
        .pipe(vinylSource('combined.js'))
        .pipe(gulp.dest('./assets/js/'));
});

gulp.task('dev', function(){
    livereload.listen();

    // Jade
    gulp.watch([
        './src/jade/*.jade'
    ], ['jade']);

    // Sass
    gulp.watch([
        './src/sass/*.sass'
    ], ['sass']);

    // Coffee
    gulp.watch([
        './src/coffee/*.coffee'
    ], ['coffee']).on('change', livereload.changed);
});


