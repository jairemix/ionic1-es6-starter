'use strict';
// gulp
const gulp = require('gulp');
const paths = gulp.paths;
// plugins
const $ = require('gulp-load-plugins')();

const chalk = require('chalk');

// all linting tasks
gulp.task('linting', ['eslint', 'jsonlint']);
gulp.task('linting-throw', ['eslint-throw', 'jsonlint-throw']);

// check app and test for eslint errors
var eslint = function (fail) {
  return function () {
    return gulp.src(paths.jsFiles.concat(paths.karma).concat(paths.protractor))
      .pipe($.eslint())
      .pipe($.eslint.format())
      .pipe($.if(fail, $.eslint.failOnError()));
  };
};
gulp.task('eslint', eslint());
gulp.task('eslint-throw', eslint(true));

// check app for jsonlint errors
var jsonlint = function (fail) {
  var failReporter = function (file) {
    throw new Error(file.path + '\n' + file.jsonlint.message);
  };
  return function () {
    return gulp.src(paths.jsonFiles)
      .pipe($.jsonlint())
      .pipe($.jsonlint.reporter(fail ? failReporter : undefined));
  };
};
gulp.task('jsonlint', jsonlint());
gulp.task('jsonlint-throw', jsonlint(true));

// eslint task for contributors
gulp.task('contrib-linting', ['linting'], function () {
  return gulp.src(paths.contrib)
    .pipe($.eslint())
    .pipe($.eslint.format());
});

/******* ESLint Fixing ******/

gulp.task('eslint-app-fix', () => {
  console.log(chalk.green('Fixing ESLint errors in app folder'));
  return gulp.src(paths.jsFiles)
    .pipe($.eslint({
      fix: true
    }))
    .pipe($.eslint.format())
    .pipe(gulp.dest('app/'));
});

gulp.task('eslint-karma-fix', () => {
  console.log(chalk.green('Fixing ESLint errors in karma folder'));
  return gulp.src(paths.karma)
    .pipe($.eslint({
      fix: true
    }))
    .pipe($.eslint.format())
    .pipe(gulp.dest('test/karma/'));
});

gulp.task('eslint-protractor-fix', () => {
  console.log(chalk.green('Fixing ESLint errors in protractor folder'));
  return gulp.src(paths.protractor)
    .pipe($.eslint({
      fix: true
    }))
    .pipe($.eslint.format())
    .pipe(gulp.dest('test/protractor/'));
});

gulp.task('eslint-fix', ['eslint-app-fix', 'eslint-karma-fix', 'eslint-protractor-fix']);
