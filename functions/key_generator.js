const { generateKeyPair } = require('crypto');

module.exports = {
    key_gen
}
key_gen()
function key_gen() {
   
    return new Promise((resolve, reject) =>{
        generateKeyPair('rsa', {
            modulusLength: 512,
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
                cipher: 'aes-256-cbc',
                passphrase: ''
            }
        }, (err, publicKey, privateKey) => {
            // console.log('publicKey', publicKey)
        resolve({publicKey, privateKey})
    });
})
}