var gulp = require('gulp');
var babel = require('gulp-babel');
var jeditor = require('gulp-json-editor');

// Compile babel and move files to build directory
gulp.task('default', function () {
    // Source files
    gulp.src('src/**/*.json').pipe(gulp.dest('build'));
    gulp.src('src/**/*.js').pipe(babel()).pipe(gulp.dest('build'));

    // API Key
    gulp.src('./key.json').pipe(gulp.dest('build'));

    // package.json without development abilities/funcitonality
    gulp.src('./package.json').pipe(jeditor(function(json) {
        delete json.scripts.build;
        delete json.scripts.clean;
        delete json.scripts.lint;
        delete json.devDependencies;
        json.scripts.start = 'node app.js';
        json.scripts.test = 'node test.js';
        return json;
      })).pipe(gulp.dest('build'));
});