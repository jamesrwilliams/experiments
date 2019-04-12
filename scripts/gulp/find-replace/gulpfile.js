const gulp = require('gulp');
const replace = require('gulp-replace');
const data = require('./tokens.js');

gulp.task('parse', () => {

    let tokens = data.tokens;
    let task = gulp.src('./src/*.html');

    tokens.forEach((token) => {

        let find = `<span.*data-token=.${token.target}.*?</span>`;
        const regex = new RegExp(find, 'g');
        const replacement = `${token.replacement}`;
        task = task.pipe(replace(regex, replacement));

    });

    return task.pipe(gulp.dest('./dist/'));

});
