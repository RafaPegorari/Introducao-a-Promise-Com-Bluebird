var Promise = require("bluebird"),
    fs = require('fs');
    fileName = 'file-1.txt';

// Converter uma API existente promise-unaware para uma API promise-returning.
Promise.promisifyAll(fs);

fs.readFileAsync(fileName, "utf8")
    .then(function (contentFile) {
        console.log('conteudo do arquivo', contentFile);
    }).catch(function (err) {
        console.log('não conseguiu ler o arquivo:', err);
    });

