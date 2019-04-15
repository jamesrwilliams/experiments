const gulp = require('gulp');
const dom  = require('gulp-dom');
const tokens = require('./tokens.js');
const log = require('fancy-log');
const watch = require('gulp-watch');

const options = {
    input: './src/**/*.html', // Input HTML source.
    output: './dist/',        // Output destination for replaced files.
    elm: 'span',              // The target element used for the data-token attributes.
};

gulp.task('default', (done) => {
   console.log(`Configured with ${tokens.length} replacement${ tokens.length !== 1 ? 's' : '' } to look for.`);
   done();
});

gulp.task('dev', () => {
    return gulp.watch(options.input, { ignoreInitial: false }, gulp.series(['parse']));
});

gulp.task('parse', () => {

    return gulp.src(options.input)
        .pipe(dom(function() {

            tokens.forEach(token => {
                let elements = this.querySelectorAll('body')[0].querySelectorAll(`${options.elm}[data-token="${token.token}"]`);

                if( elements.length > 0) {
                    elements.forEach(element => {

                       if( token.replacement === '' ) {
                           element.outerHTML = `<span style="background:#ffff00;color:#ff0000;font-family:monospace;font-weight:bold;">NO TOKEN</span>`;
                           log.warn(`No token replacement found for "${token.token}". Please check tokens.js!`);
                       } else {
                           element.outerHTML = token.replacement;
                       }
                    });
                }
            });

            return this;

        }))
        .pipe(gulp.dest(options.output));
});
