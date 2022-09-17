const { src, dest, watch, series} = require('gulp');
const sass = require('gulp-sass')(require('sass')); 
const prefix = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');

//compile, prefix, and min scss
function compilescss() {
  return src('src/scss/**/*.scss') 
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest('build/css'))
};

// minify js
function jsmin(){
  return src('src/js/**/*.js') 
    .pipe(terser())
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest('build/js')); 
}

//watchtask
function watchTask(){
  watch('src/scss/**/*.scss', compilescss); 
  watch('src/js/**/*.js', jsmin); 
}

// Default Gulp task 
exports.default = series(
  compilescss,
  jsmin,
  watchTask
);