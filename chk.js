const crypto = require('crypto');

let data = crypto.createHash('md5').update('base64').digest('hex');

console.log(data)