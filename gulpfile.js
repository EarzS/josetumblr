/*
	- por hacer: minimizar y optimizar html, css y js.
*/

// Busca un paquete llamado gulp en node_modules
// es como incluir una libreria en Java.
var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');


// Creo una tarea, son funciones que pueden realizar
// actividades particulares.

// Para compilar el preprocesador pug.
gulp.task('html', function(){
	return gulp.src(['app/pug/**/*.pug', '!app/pug/layout.pug', '!app/pug/includes/**/*'])
		.pipe(pug())
		.pipe(gulp.dest('public'))
		.pipe(browserSync.reload({
			stream: true
	    }))
});

// Para compilar el preprocesador de sass.
gulp.task('css', function(){
	return gulp.src('app/scss/**/*.scss')
		.pipe(sass())
		.pipe(gulp.dest('public/css'))
		.pipe(browserSync.reload({
			stream: true
	    }))
});

// Copiar la carpeta js de app a public
gulp.task('js', function(){
	return gulp.src('app/js/**/*.js')
		.pipe(gulp.dest('public/js'))
		.pipe(browserSync.reload({
			stream: true
	    }))
});

// Para minimizar imagenes.
gulp.task('images', function(){
	return gulp.src('app/img/**/*.+(png|jpg|gif|svg)')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('public/img'))
});

// Para mover las librerias a public
gulp.task('copy', function() {
    gulp.src(['bower_components/bootstrap/dist/css/bootstrap.min.css', 'bower_components/bootstrap/dist/js/bootstrap.min.js'])
        .pipe(gulp.dest('public/vendor/bootstrap'))

    gulp.src(['bower_components/jquery/dist/jquery.js', 'bower_components/jquery/dist/jquery.min.js'])
        .pipe(gulp.dest('public/vendor/jquery'))

   	gulp.src(['bower_components/font-awesome/web-fonts-with-css/css/fontawesome-all.min.css'])
        .pipe(gulp.dest('public/vendor/font-awesome'))

    gulp.src(['bower_components/magnific-popup/dist/jquery.magnific-popup.min.js'])
        .pipe(gulp.dest('public/vendor/magnific-popup'))
});

// Borra la carpeta public
gulp.task('clean:public', function() {
  	return del.sync('public');
})

// Para construir la carpeta public y compilar app
gulp.task('build', function(callback) {
	runSequence('clean:public',['html', 'css', 'images', 'copy'], callback);
});

// Para actualizar el navegador cada vez que se
// modifique algun archivo.
gulp.task('browserSync', function() {
	browserSync.init({
		server: {
	  		baseDir: 'public'
		},
		open: false
	});
})

// Para ejecutar al escribir el comando gulp
gulp.task('default', ['watch']);

// Creo una tarea que creara vigilantes
// Un vigilante hara una tarea si
// se altera algun archivo.
gulp.task('watch', ['html', 'css', 'browserSync'], function(){
	gulp.watch('app/pug/**/*.pug', ['html']);
	gulp.watch('app/scss/**/*.scss', ['css']);
	gulp.watch('app/js/**/*.js', ['js']);
});