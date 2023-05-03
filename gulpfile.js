const { src, dest, watch, parallel } = require("gulp");


// CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

function css( done ) {
    src("src/scss/**/*.scss")
        .pipe( plumber() )
        .pipe( sass() )
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


// DEV
function dev( done ) {
    watch("src/scss/**/*.scss", css);
    done();
}


// EXPORTS
exports.css = css;
exports.images = images;
exports.webpVersion = webpVersion;
exports.avifVersion = webpVersion;
exports.dev = parallel( images, webpVersion, avifVersion, dev );
