---
title: "Таск-менеджеры: Grunt и Gulp"
draft: true
tags:
  - Gulp
  - Grunt
  - stream
info:
---
## Таск-менеджеры: Grunt и Gulp

### Grunt: Конфигурационный подход

```js
// Gruntfile.js
module.exports = function(grunt) {
    grunt.initConfig({
        // Очистка директории
        clean: {
            dist: ['dist/']
        },
        
        // Компиляция SASS
        sass: {
            dist: {
                files: {
                    'dist/css/main.css': 'src/scss/main.scss'
                }
            }
        },
        
        // Минификация CSS
        cssmin: {
            target: {
                files: {
                    'dist/css/main.min.css': 'dist/css/main.css'
                }
            }
        },
        
        // Объединение JavaScript
        concat: {
            dist: {
                src: [
                    'src/js/utils.js',
                    'src/js/components/*.js',
                    'src/js/main.js'
                ],
                dest: 'dist/js/app.js'
            }
        },
        
        // Минификация JavaScript
        uglify: {
            dist: {
                files: {
                    'dist/js/app.min.js': 'dist/js/app.js'
                }
            }
        },
        
        // Отслеживание изменений
        watch: {
            scss: {
                files: ['src/scss/**/*.scss'],
                tasks: ['sass', 'cssmin']
            },
            js: {
                files: ['src/js/**/*.js'],
                tasks: ['concat', 'uglify']
            }
        }
    });
    
    // Загрузка плагинов
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    // Определение задач
    grunt.registerTask('build', ['clean', 'sass', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('dev', ['build', 'watch']);
    grunt.registerTask('default', ['build']);
};
```

### Gulp: Потоковый подход

```js
// gulpfile.js
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const autoprefixer = require('gulp-autoprefixer');

// Пути к файлам
const paths = {
    styles: {
        src: 'src/scss/**/*.scss',
        dest: 'dist/css/'
    },
    scripts: {
        src: 'src/js/**/*.js',
        dest: 'dist/js/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    }
};

// Обработка стилей
function styles() {
    return gulp.src(paths.styles.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(browserSync.stream());
}

// Обработка скриптов
function scripts() {
    return gulp.src(paths.scripts.src)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.scripts.dest));
}

// Оптимизация изображений
function images() {
    return gulp.src(paths.images.src)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(paths.images.dest));
}

// Локальный сервер
function serve() {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });
    
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts).on('change', browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);
}

// Отслеживание изменений
function watch() {
    gulp.watch(paths.styles.src, styles);
    gulp.watch(paths.scripts.src, scripts);
    gulp.watch(paths.images.src, images);
}

// Экспорт задач
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.watch = watch;
exports.serve = serve;

// Сборка проекта
exports.build = gulp.parallel(styles, scripts, images);

// Разработка
exports.dev = gulp.series(exports.build, serve);

// Задача по умолчанию
exports.default = exports.build;
```

Gulp революционизировал сборку благодаря концепции потоков (streams), что позволяло обрабатывать файлы в памяти без создания промежуточных файлов на диске.

___
