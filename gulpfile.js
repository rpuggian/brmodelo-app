const gulp = require("gulp")
const sass = require("gulp-sass")
const sourcemaps = require("gulp-sourcemaps")
const autoprefixer = require("gulp-autoprefixer")
const gls = require("gulp-live-server")
const del = require("del")

// Sass variables
let input = "./app/sass/*.scss"
let output = "./app/css/"
let sassOptions = {
	errLogToConsole: true,
	outputStyle: "expanded"
}

gulp.task("clean", function() {
  return del("build")
})

gulp.task("sass", function() {
	return gulp
	.src(input)
	.pipe(sourcemaps.init())
	.pipe(sass(sassOptions).on("error", sass.logError))
	.pipe(sourcemaps.write())
	.pipe(autoprefixer())
	.pipe(gulp.dest(output))
}) // End task sass

gulp.task("watch", function() {
  gulp.watch(input, gulp.series("sass"))
	.on("change", function(file) {
  console.log(`File "${file}" has been changed...`)
  })
}) // End task watch

gulp.task("copy", function(done) {
	gulp.src([
		"node_modules/angular-ui-bootstrap/dist/ui-bootstrap.js",
		"node_modules/angular-ui-bootstrap/dist/ui-bootstrap-tpls.js",
		"node_modules/angular/angular.min.js",
		"node_modules/angular/angular.min.js.map",
		"node_modules/angular-ui-router/release/angular-ui-router.min.js",
		"node_modules/angular-cookies/angular-cookies.min.js",
		"node_modules/angular-cookies/angular-cookies.min.js.map",
		"node_modules/textangular/dist/textAngular-rangy.min.js",
		"node_modules/textangular/dist/textAngular-sanitize.min.js",
		"node_modules/textangular/dist/textAngular.min.js",
		"node_modules/textangular/dist/textAngular.css"
	]).pipe(gulp.dest("build/libs/"))

	gulp.src([
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/jquery/dist/jquery.min.map"
	]).pipe(gulp.dest("build/joint/"))

	gulp.src([
		"node_modules/bootstrap/dist/**/*"
	]).pipe(gulp.dest("build/bootstrap"))

	gulp.src([
		"node_modules/jquery-nice-select/**/*"
  ]).pipe(gulp.dest("build/jquery-nice-select"))
  
  done()

}) // End task copy

gulp.task("server", function() {
	let server = gls.new("server.js")
	server.start()
}) // End task server


gulp.task("default", gulp.series("clean", "sass", "copy", gulp.parallel("watch", "server")))
