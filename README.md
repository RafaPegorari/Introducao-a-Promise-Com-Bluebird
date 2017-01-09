O objeto Promise é usado para computações assíncronas. Uma Promise representa um valor que pode estar disponível agora, ou no futuro, ou nunca.

```javascript
new Promise(function executor (resolve, reject) {} );
```
Uma função que é passada com os argumentos resolve e reject. A função executor é executada imediatamente pela implementação Promise, passando as funções resolve e reject(o executor é chamado antes que o construtor Promise devolva o objeto criado). As funções de resolve e reject, quando chamadas, resolvem ou rejeitam a Promise respectivamente. O executor normalmente inicia algum trabalho assíncrono e, uma vez concluído, chama a função resolve ou reject para resolver a Promise ou então rejeitá-la se ocorrer um erro.

Se um erro é lançado na função executor, a Promise é rejeitada. O valor de retorno do executor é ignorado.
```javascript
function aux() {
  throw new Error('Message error');
}

new Promise(function executor (resolve, reject) {
  aux();

  reject("Ignored");
});
```

## Bluebird
O Bluebird é uma biblioteca de Promise completa, com foco em recursos e desempenho inovadores.

### Promisificação em esteróides

Promisificação significa converter uma API existente promise-unaware para uma API promise-returning.

Exemplo:
```javascript
var Promise = require("bluebird"),
    fs = require("fs");

// Agora você pode usar fs como se ele foi projetado para usar bluebird promessas desde o início.
Promise.promisifyAll(fs);

fs.readFileAsync("file.js", "utf8").then(...)
```

Veja qual packages que o bluebird tem integração. [bluebirdjs.com](http://bluebirdjs.com/docs/features.html#promisification-on-steroids).

### Features
* [Promise.all](#Promise.all)
* [Promise.map](#Promise.map)
* [Promise.reduce](#Promise.reduce)
 * [Array.prototype.reduce](#Array.prototype.reduce)
* [Promise.filter](#Promise.filter)
* [Promise.each](#Promise.each)

### <a name="Promise.all">Promise.all</a>
```javascript
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
```
* require('fs') - > File System
 * fs.readFileAsync(fileName) -> Leia o arquivo e retorna Promise.

```javascript
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
```

### <a name="Promise.map">Promise.map</a>
```javascript
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
```

### <a name="Promise.reduce">Promise.reduce</a>

```javascript
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
```

#### <a name="Array.prototype.reduce">Array.prototype.reduce</a>
O método reduce () aplica uma função contra um acumulador a cada valor da matriz (da esquerda para a direita) para reduzi-la a um único valor.
```javascript
arr.reduce(callback, [initialValue])
```

**Parâmetros:**

* callback - Função para executar em cada valor na matriz, tendo quatro argumentos:

 * acumulador - O valor acumulado retornado anteriormente na última invocação do retorno de chamada.

 * valorAtual - O elemento atual que está sendo processado na matriz.

 * indexAtual - O índice do elemento atual sendo processado na matriz.

 * array - The array reduce was called upon.

 * valorInicial - Opcional. Valor inicial para o acumulador.

**Return value:**

O valor que resulta da redução.

**Exemplo**

```javascript
var sum = [0, 1, 2, 3].reduce(function(acumulador, valorAtual) {
  return acumulador + valorAtual;
}, 0);
// sum is 6
```

### <a name="Promise.each">Promise.each</a>

```javascript
var Promise = require("bluebird"),
    fs = require('fs'),
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
}).each(function (contents) {
    console.log(contents);
}).then(function () {
    console.log("Done");
});
```

**Conteúdo**

file-1.txt -> 10
file-2.txt -> 20
file-3.txt -> 30
file-4.txt -> 40

**Retorno**

10
20
30
40
Done

### <a name="Promise.filter">Promise.filter</a>

```javascript
var Promise = require("bluebird"),
    fs = require('fs'),
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
}).filter(function (contents) {
    console.log(parseInt(contents, 10));
    return parseInt(contents, 10) > 15;
}).then(function (arrayResult) {
    console.log(arrayResult);
});
```
**Conteúdo**

file-1.txt -> 10
file-2.txt -> 20
file-3.txt -> 30
file-4.txt -> 40

**Retorno**

10
20
30
40
[ '20', '30', '40' ]

## Documentation
* [ECMAScript 2015 6.0 - Promise](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor)
* [MDN - Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [Bluebird](http://bluebirdjs.com/docs/getting-started.html)
