/**
 * name : gulpfile.js
 * author : Aman
 * created-date : 19-03-2020
 * Description : Gulpfile for apidoc. 
*/

// Dependencies

let gulp = require("gulp");
let apidoc = require("gulp-apidoc");

gulp.task("apidoc", (done) => {
    apidoc({
        src: "./controllers",
        dest: "./public/apidoc"
    }, done);
});

gulp.task("watch", () => {
    gulp.watch(["./controllers/**"], ["apidoc"]);
});