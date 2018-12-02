const gulp        = require('gulp');
const browserSync = require('browser-sync');
const sass        = require('gulp-sass');
const prefix      = require('gulp-autoprefixer');
const cssnano     = require('gulp-cssnano');
const concat      = require('gulp-concat');
const uglify      = require('gulp-uglify');
const babel       = require('gulp-babel');

const startServer = (done) => {
  browserSync.init({
    proxy: 'localhost:5000',
    port: 3000
  })
  done()
}

const browserSyncReload = (done) => {
  browserSync.reload()
  done()
}

const compileScripts = () => { 
  return gulp.src(['_js/scripts.js'])
  .pipe(babel({
    "presets": [ "@babel/preset-env" ]
  }))
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('public/js'))
  .pipe(browserSync.reload({ stream:true }))
}

const compileStyles = () => {
  return gulp.src('_scss/styles.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('public/css'))
  .pipe(browserSync.reload({ stream:true }))
}

const watchMarkup = () => {
  gulp.watch(['views/*.html'], browserSyncReload);
}

const watchScripts = () => {
  gulp.watch(['_js/*.js'], compileScripts);
}

const watchStyles = () => { 
  gulp.watch(['_scss/*.scss'], compileStyles)
}

const compile = gulp.parallel(compileScripts, compileStyles)
compile.description = 'compile all sources'

// Not exposed to CLI
const serve = gulp.series(compile, startServer)
serve.description = 'serve compiled source on local server at port 3000'

const watch = gulp.parallel(watchMarkup, watchScripts, watchStyles)
watch.description = 'watch for changes to all source'

const defaultTasks = gulp.parallel(serve, watch)

export {
  compile,
  compileScripts,
  compileStyles,
  serve,
  watch,
  watchMarkup,
  watchScripts,
  watchStyles,
}

export default defaultTasks
