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

async function main(key) {
    try {

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = new FileSystemWallet(walletPath);
        console.log(`Wallet path query: ${walletPath}`);

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

        // Evaluate the specified transaction.
        // queryCar transaction - requires 1 argument, ex: ('queryCar', 'CAR4')
        // queryAllCars transaction - requires no arguments, ex: ('queryAllCars')
        // const result = await contract.evaluateTransaction('queryCar','CAR9');
        // const result = await contract.evaluateTransaction('queryData',key);
        const result = await contract.evaluateTransaction('queryData',key);
        let retData = result.toString('utf8')
        console.log("retData",retData);
        // if(retData.includes('does not exist')){

        // }
        // else{}
        try{
        return JSON.parse(retData)
        }
        catch(error){
            return "data does not exist"
        }
        // console.log(result)
        // return JSON.stringify(result) 
        // try{
        //     result['status']= true
        //   return `${ JSON.stringify(result)}`
        // }
        // catch(e){
        //     return {'error':e, status: false}
        // }

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}


// main('CAR9s')

module.exports = {
    main
}