#### Engine
    node verison 10
    
node version shoule be 10. other wise privatekey generator function will not work.

### Block chain
##### first time up the block chain

    1. basic-network/start.sh
         uncommand the line no: 24, 26
    2  fabcar/startFabric.sh
         umcommand the line no: 49, 51
        
#### Next time up the block chain

     1. basic-network/start.sh
         command the line no: 24, 26
     2.  fabcar/startFabric.sh
         command the line no: 49, 51

#### Maha it now
    1. change the basic-network/docker-compose.yml

    2. change the chaincode/fabcar/javascript/lib/fabcar.js

    3. change the functions/Registration_login/onBoardUser.js
    
    4. docker rmi -f $(docker images | grep fabcar | awk '{print $3}')
    
    5. docker ps -f $(docker ps -aq)
    
    6.  ./startFabric.sh javascript

    7. change the basic-network/start.sh

    8. change the fabcar/startFabric.sh

