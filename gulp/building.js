'use strict';
// gulp
const gulp = require('gulp');
const options = gulp.options;
const paths = gulp.paths;
// plugins
const $ = require('gulp-load-plugins')();
// modules
const del = require('del');
const vinylPaths = require('vinyl-paths');
const chalk = require('chalk');
const shell = require('gulp-shell');

var buildDependencies = [
  options['force-build'] ? 'linting' : 'linting-throw',
  'build-app',
  'build-templates',
  'build-assets'
];

gulp.task('build', buildDependencies, function () {
  return gulp.src(paths.dist + '/**/*')
    .pipe($.size({showFiles: true}));
});

gulp.task('clean', function () {
  // pattern is windows-friendly according to https://github.com/mwaylabs/generator-m-ionic/issues/223#issuecomment-196060284
  return gulp.src(['.tmp/**/*.*', paths.dist + '/**/*.*'])
    .pipe(vinylPaths(del));
});

// concatenate files in build:blocks inside index.html
// and copy to build folder destinations
gulp.task('build-app', ['clean', 'inject-all'], function () {
  var jsFilter = $.filter('**/*.js', {restore: true});
  var cssFilter = $.filter('**/*.css', {restore: true});

  var stream = gulp.src('app/index.html') // main html file
    .pipe($.useref({searchPath: '{.tmp,app}'})); // all assets (without index.html)

  console.log(chalk.green('Transpiling from ES6 to ES5'));
  var noVendorFilter = $.filter(['app/scripts/app.js', '!app/scripts/vendor.js'], {restore: true});
  stream
    // .pipe($.debug())
    .pipe(noVendorFilter)
    // .pipe($.debug())
    .pipe($.babel({
        presets: ['es2015'],
        compact: false,
        comments: true,
        minified: false,
        retainLines: true
      }))
    .pipe(noVendorFilter.restore);

  if (options.minify) {
    console.log(chalk.green('Minifying'));
    stream
      .pipe(jsFilter)
      .pipe($.ngAnnotate({
        add: true,
        sourcemap: true
      }))
      .pipe($.uglify())
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.csso())
      .pipe(cssFilter.restore);
  }

  stream.pipe(gulp.dest(paths.dist));

  return stream;
});

// copy templates
gulp.task('build-templates', ['clean'], function () {
  return gulp.src(paths.templates)
  .pipe($.if(options.minify, $.htmlmin({
    removeComments: true,
    removeCommentsFromCDATA: true,
    collapseWhitespace: true,
    conservativeCollapse: true,
    collapseInlineTagWhitespace: true
  })))
  .pipe(gulp.dest(paths.dist));
});

// copy assets, wait for fonts
gulp.task('build-assets', ['clean', 'bower-fonts'], function () {
  return gulp.src('app/*/assets/**/*')
    .pipe($.if(options.minify, $.imagemin()))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('build-mobile', ['build'], shell.task([
  'ionic build ios',
  'ionic build android'
]));
