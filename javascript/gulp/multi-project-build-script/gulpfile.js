const gulp = require('gulp');
const less = require('gulp-less');
const babel = require('gulp-babel');
const rename = require("gulp-rename");
const debug = require('gulp-debug');
const autoPrefixer = require('gulp-autoprefixer');
const include = require('gulp-include');

// const utilities = require('./scripts/utilities');

gulp.task('build:less', () => {
    return gulp.src('partners/**/**/src/*.less', { base: '.' })
        .pipe(autoPrefixer({
            browsers: ['last 2 versions', 'ie 9'],
        }))
        .pipe(less())
        .pipe(gulp.dest('./'));
});

gulp.task('build:js', () => {
    return gulp.src('partners/**/**/src/*.js', { base: '.' })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(rename((path) => {
            path.basename = 'banner.min';
            return path;
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build:combine', () => {
    return gulp.src('partners/**/**/src/*.html', { base: '.' })
        .pipe(include())
        .pipe(rename((path) => {
            path.basename = path.basename + '-output';
            path.dirname = path.dirname.substring(0, path.dirname.lastIndexOf("/") + 1);
        }))
        .pipe(gulp.dest('./'));
});

gulp.task('build', gulp.series('build:less', 'build:js', 'build:combine'));

gulp.task('watch', () => {
    gulp.watch(['partners/**/**/src/banner.js'], gulp.series('build:js', 'build:combine'));
    gulp.watch(['partners/**/**/src/banner.less'], gulp.series('build:less', 'build:combine'));
    gulp.watch(['partners/**/**/src/*.html'], gulp.series('build:combine'));
});
