
import { Clarinet, Tx, Chain, Account, types } from 'https://deno.land/x/clarinet@v0.14.0/index.ts';
import { assertEquals } from 'https://deno.land/std@0.90.0/testing/asserts.ts';

Clarinet.test({
    name: "Testing payload-001. Tested with clarinet version 0.21.2",

    async fn(chain: Chain, accounts: Map<string, Account>) {

        /* Assign wallets to be used for simulating the escrow participants - seller, buyer, mediator. */
        let deployer  = accounts.get('deployer')!;
        let owner     = accounts.get('wallet_8')!;
        let stranger1 = accounts.get('wallet_7')!;
        let stranger2 = accounts.get('wallet_6')!;
        
        let hello     = '"Hello Kiddo!"';   /* For the echo function. */

        console.log('+--------------------------------------------------+');
        console.log('| Testing payload-001                              |');
        console.log('+--------------------------------------------------+');

        let block = chain.mineBlock([
           Tx.contractCall('payload-001' ,'echo'                  ,[hello] ,deployer.address),
           Tx.contractCall('payload-001' ,'get-contract-caller'   ,[]      ,deployer.address),
           Tx.contractCall('payload-001' ,'get-tx-sender'         ,[]      ,deployer.address),
           Tx.contractCall('payload-001' ,'get-contract-owner'    ,[]      ,deployer.address),
           Tx.contractCall('payload-001' ,'add-whitelist-self'           ,[]      ,deployer.address),

           Tx.contractCall('payload-001' ,'activate'               ,[]      ,deployer.address),           
           Tx.contractCall('payload-001' ,'check-whitelist-anyone' ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'get-whitelister'        ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'add-whitelist'          ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'check-whitelist-anyone' ,[types.principal(deployer.address)] ,deployer.address),          

           Tx.contractCall('payload-001' ,'add-whitelist'     ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'get-whitelister'   ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'get-whitelister-unwrap'   ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'add-whitelist-self'           ,[]      ,deployer.address),    
           Tx.contractCall('payload-001' ,'is-contract-active'           ,[]      ,deployer.address),    
           
           Tx.contractCall('payload-001' ,'delete-whitelister' ,[types.principal(deployer.address)]      ,deployer.address),
           Tx.contractCall('payload-001' ,'add-whitelist'          ,[types.principal(deployer.address)] ,deployer.address),
           Tx.contractCall('payload-001' ,'add-whitelist'          ,[types.principal(deployer.address)] ,deployer.address),
       
        ]);

        console.log('result count            = ' + block.receipts.length);
        console.log('')
        console.log('echo                    = ' + block.receipts[0].result);
        console.log('get-contract-caller     = ' + block.receipts[1].result);
        console.log('get-tx-sender           = ' + block.receipts[2].result);
        console.log('get-contract-owner      = ' + block.receipts[3].result);
        console.log('add-whitelist-self      = ' + block.receipts[4].result);
        console.log('')
        console.log('activate                = ' + block.receipts[5].result);
        console.log('check-whitelist-anyone  = ' + block.receipts[6].result);
        console.log('get-whitelister         = ' + block.receipts[7].result);
        console.log('add-whitelist           = ' + block.receipts[8].result);
        console.log('check-whitelist-anyone  = ' + block.receipts[9].result);
        console.log('')
        console.log('add-whitelist           = ' + block.receipts[10].result);
        console.log('get-whitelister         = ' + block.receipts[11].result);
        console.log('get-whitelister-unwrap  = ' + block.receipts[12].result);
        console.log('add-whitelist-self      = ' + block.receipts[13].result);
        console.log('is-contract-active      = ' + block.receipts[14].result);

        console.log('')
        console.log('delete-whitelister      = ' + block.receipts[15].result);
        console.log('add-whitelist           = ' + block.receipts[16].result);
        console.log('add-whitelist           = ' + block.receipts[17].result);
        console.log('')

         /*
         -----------------------------------------------------------------------------------------------------------------   
            END OF THE LINE.  PLEASE WATCH THE GAP.
         -----------------------------------------------------------------------------------------------------------------
         */

         console.log(' ');
         console.log('+--------------------------------------------------+');
         console.log('| Bye now.  See you on the next test.              |');
         console.log('+--------------------------------------------------+');
         console.log(' ');
         console.log(' ');
    },
});
