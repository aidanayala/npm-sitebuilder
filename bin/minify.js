#!/usr/bin/env node

const gulp = require('gulp');
const minify = require('gulp-minifier');

/**
 * Minify
 */
gulp.task('minify', function() {
    console.log('# Minifying #');
    return gulp.src('dist/**/*').pipe(minify({
        minify: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        minifyJS: true,
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
    })).pipe(gulp.dest('dist'));
});

gulp.start('minify');