const { src, dest, watch, parallel } = require("gulp");


// JS
const terser = require("gulp-terser-js");


// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps");

function css( done ) {
    src("src/scss/**/*.scss")
        .pipe( sourcemaps.init() )
        .pipe( plumber() )
        .pipe( sass() )
        .pipe( postcss([autoprefixer(), cssnano()]) )
        .pipe( sourcemaps.write(".") )
        .pipe( dest("build/css") )
    done();
}


// IMAGES
const cache = require("gulp-cache");
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function webpVersion( done ) {
    const options = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe( webp(options) )
        .pipe( dest("build/img") )
    done();
}

function avifVersion( done ) {
    const options = {
        quality: 50
    };

    src("src/img/**/*.{png,jpg}")
        .pipe( avif(options) )
        .pipe( dest("build/img") )
    done();
}

function images( done ) {
    const options = {
        optimizationLevel: 3
    }

    src("src/img/**/*.{png,jpg}")
        .pipe( cache( imagemin(options) ) )
        .pipe( dest("build/img") )
    done();
}


// JS
function javascript( done ) {
    src("src/js/**/*.js")
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write(".") )
        .pipe( dest("build/js") )
    done();
}


// DEV
function dev( done ) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);
    done();
}


// EXPORTS
exports.css = css;
exports.js = javascript;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = webpVersion;
exports.dev = parallel( images, webpVersion, avifVersion, javascript, dev );
