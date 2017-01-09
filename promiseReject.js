var Promise = require("bluebird");

function aux() {
  throw new Error('Message error');
}

new Promise(function executor (resolve, reject) {
  aux();

  reject("Ignored");
});
