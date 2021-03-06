/**
 * Created by Deepak Papanna on 9/27/2015.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var karma = require('karma').server;
var server = require('gulp-live-server');

gulp.task('server',function() {
    var live = server('server.js');
    live.start();
})

gulp.task('serve',['server'], function() {
    browserSync.init({
        notify: false,
        port: 8080,
        server: {
            baseDir: ["app"],
            routes: {
                '/bower_components':'bower_components'
            }
        }
    });
    gulp.watch(['app/**/*.*'])
        .on('change', browserSync.reload);
});

gulp.task('test-browser', function(done){
    karma.start({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true,
        reporters: ['mocha','coverage']
    },function(){
        done();
    });
})
gulp.task('serve-test', function(){
    browserSync.init({
        notify: false,
        port: 8081,
        server: {
            baseDir: ["test","app"],
            routes: {
                '/bower_components':'bower_components'
            }
        }
    });
    gulp.watch(['app/**/*.*'])
        .on('change', browserSync.reload);
});
gulp.task('serve-coverage',['test-browser'], function(){
    browserSync.init({
        notify: false,
        port: 7777,
        server: {
            baseDir: ["test/coverage"],

        }
    });
    gulp.watch(['app/**/*.*'])
        .on('change', browserSync.reload);
});