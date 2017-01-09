var Promise = require("bluebird"),
    fs = require('fs');
    fileNames = [
        'file-1.txt',
        'file-2.txt',
        'file-3.txt',
        'file-4.txt',
    ]
    promises = [];

// Converter uma API existente promise-unaware para uma API promise-returning.
Promise.promisifyAll(fs);

for (var i = 0; i < fileNames.length; ++i) {
    promises.push(fs.readFileAsync(fileNames[i], "utf8"));
}

Promise.all(promises).then(function(arrayFiles) {
    console.log('done', arrayFiles);
});
