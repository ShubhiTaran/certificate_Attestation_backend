/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { FileSystemWallet, Gateway } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const ccpPath = path.resolve(__dirname, '..', '..', 'basic-network', 'connection.json');
const ccpJSON = fs.readFileSync(ccpPath, 'utf8');
const ccp = JSON.parse(ccpJSON);

async function main(key, data) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path invoke: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const userExists = await wallet.exists('user1');
        if (!userExists) {
            console.log('An identity for the user "user1" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'user1', discovery: { enabled: false } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        // Submit the specified transaction.
        // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
        // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR10', 'Dave')
        // await contract.submitTransaction('createCar', 'CAR13', 'Honda', 'Accord', 'Black', 'Tom');
        // let key = "pkregistry"
        // let data = [{
        //     pub:'some public key is here',
        //     owner:'Anantha Kannan',
        //     designation:'Deputy Secretary'
        // },
        // {
        //     pub:'another publick',
        //     owner:'Owner',
        //     designation:'Deputy Secretary'
        // }]
        // let key = "8350e5a3e24c153df2275c9f80692773",
        //     data = {
        //         "encrypthash": "xOFQR7iMLl0Z77WKiDVyz7bEVqhHtXmmCtDdTe8WV1r+stgeUdo4aBLsI0Uj7lcMNVirHSv8Lybz58QUy2q2OLLK1t8wCVtgRQTBB8QcQtnoCFJY0FRzCQ6A1iwGrxGeXNfLLIXXGlaSj9xZbuAvAeorCZltARe/JJzcxWiOy3I=",
        //         "date": "22/07/2018"
        //     }
        // console.log("data invoke", data)
        console.log("key", key)
       let result = await contract.submitTransaction('addData', key, JSON.stringify(data));

        // console.log('Transaction has been submitted', JSON.parse(result.toString('utf8')) );

        // Disconnect from the gateway.
        await gateway.disconnect();
        return [];

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}

module.exports = {
    main
}

// main('hello', {
//     name:'anth',
//     lastName:'kanan'
// })