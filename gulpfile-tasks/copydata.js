module.exports = function (gulp, paths) {
  return function () {
  	var stream = 
  		gulp.src([paths.src.html + '/data/dark.json'])
  		.pipe(gulp.dest(paths.build.baseDir + '/data'));
  	return stream;
  };
};