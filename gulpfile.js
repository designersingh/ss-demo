/**
 * Created by MrSingh on 2/13/16.
 */

'use strict';

const gulp = require('gulp'),
bump = require('gulp-bump'),
semver = require('semver'),
fs = require('fs'),
zip = require('gulp-zip'),
rename = require("gulp-rename"),
run = require('gulp-run-command').default();

const getPackageJson = function () {
	return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
};
const pkg = getPackageJson();
const newVer = semver.inc(pkg.version, 'patch');

gulp.task('bump',function(){
	gulp.src(['./package.json','./package-lock.json'])
	.pipe(bump({
		version: newVer
	}))
	.pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
	run('rm -rf /dist');
});

gulp.task('copy:assets',function(){
	gulp.src(['./server/**/*'])
	.pipe(gulp.dest('./dist/server'));
	
	gulp.src(['./package.json','./package-lock.json', './config.js','./server.js'])
	.pipe(gulp.dest('./dist'));
	
	gulp.src(['./.ebextensions/**/*'])
	.pipe(gulp.dest('./dist/.ebextensions'));
});

gulp.task('build',['clean','bump','copy:assets'],
	function(){
		const zipName = 'ncb-api-' + newVer;
		setTimeout(function(){
			return gulp.src(['./dist/**/*'])
			.pipe(zip('ncbAPIV.zip'))
			.pipe(rename({
				basename : zipName,
				extname : '.zip'
			}))
			.pipe(gulp.dest('./deploy'));
		},5000);
		
	});
gulp.task('default',['serve']);
