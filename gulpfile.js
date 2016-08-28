var gulp = require('gulp');
var stylus = require('gulp-stylus');
var rename = require('gulp-rename');
var cleanCss = require('gulp-clean-css');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var browserSync = require('browser-sync').create();


// 启动静态服务器的任务
gulp.task('server', function() {
  browserSync.init({
    server: {
        baseDir: "./"
    }
  });
});

gulp.task('test', function() {
    console.log('这是一个测试任务');
});

// 编译 stylus 文件
gulp.task('stylus', function() {
  // 读取 .styl 文件
  gulp.src('./stylus/*.css')
  	// 编译 .styl 文件
	   .pipe(stylus({
        compress: true
      }))
    .pipe(cleanCss())
	  // 编译完成后改个名字
	  // .pipe(rename('index.css'))
	  // 输出文件到当前目录下
	   .pipe(gulp.dest('./dist'));
});

// 删除 dist 目录
gulp.task('delete', function() {
  del(['./dist']).then(function (paths) {
     console.log('Deleted files and folders:\n', paths.join('\n'));
  })
});

// 默认任务
gulp.task('default', function() {
	// 观察 app.styl 文件变化的时候，去执行 stylus 任务
	gulp.watch('./app.styl', ['stylus']);
  console.log('这个是默认的任务');
});

// 压缩 html 代码
gulp.task('htmlmin', function() {
  gulp.src('./index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      minifyCSS: true
    }))
    .pipe(gulp.dest('./dist'));
});

// 压缩 js 任务
gulp.task('uglify', function () {
  gulp.src('./socket-server.js')
    .pipe(uglify({
      mangle: true,
      compress: true,
    }))
    .pipe(gulp.dest('./dist'));
})
