/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        // let key = "pkregistry"
        // let data = [{
        //     pub: 'public key',
        //     owner: 'test',
        //     designation:'Deputy Secretary'
        // }]
        //  await ctx.stub.putState(key, Buffer.from(JSON.stringify(data)));
        console.info('============= END : Initialize Ledger ===========');
    }

   
    async addData(ctx, key, data) {
        console.info('============= START : addData ===========');
        let result = await ctx.stub.putState(key, Buffer.from(JSON.stringify(data)));
        console.info('============= END : addData ===========');
        return result;
    }

    async queryData(ctx, key) {
        console.info("hello");
        const dataAsBytes = await ctx.stub.getState(key); 
        if (!dataAsBytes || dataAsBytes.length === 0) {
            console.info('does not exits');
            console.info(`${key} does not exitst=>`)
            return `${key} does not exitst`
            // throw new Error(`${key} does not exist`);
        }
        console.info('some data is here', dataAsBytes.toString());
        return dataAsBytes.toString();
    }

   



}

module.exports = FabCar;
