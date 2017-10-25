#!/usr/bin/env node

/**
 * TODO: Todos ...
 * 1. Figure out a way of not having the pages folder generated in the src/ folder. Move them to a temp directory for example then clean up
 * Add SASS, JS & Minification & Uglyfying
 */
console.log("# Building Site #");

// Require packages
const gulp = require('gulp');
const nunjucks = require('gulp-nunjucks-render');
const data = require('gulp-data');
const jsonFile = require('jsonfile');
const shell = require('shelljs');
const replace = require('replace-in-file');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');

// TODO: Refactor this. Probably a better way than string replacing, perhaps pass data per file load?
var pages = jsonFile.readFileSync('./src/data/pages.json').pages;
generatePages(pages);

/**
 * Generate any pages from the pages array
 * @param pages
 */
function generatePages(pages) {

    for (p in pages) {

        // if not root (because that's an index page)
        if (pages[p].is_root === false) {
            var page = pages[p];
            var dir = page.name.toLowerCase();

            // create the directory
            shell.exec('mkdir ./src/pages/' + dir);

            // copy the template
            shell.exec('cp ./src/templates/' + page.template + '.nunjucks ./src/pages/' + dir + '/index.nunjucks');

            // replace dynamic data
            replace({
                files: './src/pages/' + dir + '/index.nunjucks',
                from: /_page_name_/g,
                to: p
            }, (error, changes) => {
                if (error) {
                    return console.error('Error occured: ', error);
                } else {
                    console.log('Modified files: ', changes.join(', '));
                }
            })
        }
    }
}

/**
 * Execute the build
 */
console.log("# Executing build #");

// clean up dist folder
shell.exec('rm -rf dist');

// build site
gulp.src('src/pages/**/*.+(html|nunjucks)')
    .pipe(data(function () {
        return require('../src/data/config.json')
    }))
    .pipe(data(function () {
        return require('../src/data/pages.json')
    }))
    .pipe(data(function () {
        return require('../src/data/components.json')
    }))
    .pipe(nunjucks({
        path: ['src/templates']
    }))
    .pipe(gulp.dest('dist/'));

/**
 * Minify HTML
 * TODO: ^^
 */

/**
 * Build SASS
 */
gulp.src('./src/assets/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/assets/css'));


/**
 * Build Complete
 */
console.log('# Build Complete #');

//shell.exec('surge');