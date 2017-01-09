var Promise = require("bluebird"),
    fs = require('fs');

// Converter uma API existente promise-unaware para uma API promise-returning.
Promise.promisifyAll(fs);

Promise.reduce(["file-1.txt", "file-2.txt", "file-3.txt"], function(acumulador, fileName) {
    return fs.readFileAsync(fileName, "utf8").then(function(contents) {
        return acumulador + parseInt(contents, 10);
    });
}, 0).then(function(total) {
    // total 60
    console.log(total);
});
