var Promise = require("bluebird"),
    fs = require('fs');
    fileNames = [
        'file-1.txt',
        'file-2.txt',
        'file-3.txt',
        'file-4.txt',
    ];

// Converter uma API existente promise-unaware para uma API promise-returning.
Promise.promisifyAll(fs);

Promise.map(fileNames, function(fileName) {
    return fs.readFileAsync(fileName, "utf8");
}).then(function(arrayFileContent) {
    console.log('done', arrayFileContent);
});
