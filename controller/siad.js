const axios = require('axios');

const Response = require("../utils/response")
const messages = require("../utils/messages")
const Siad = require('../model/siad')
const siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})

//Get result of siad's consensus request
async function concensus(res){
    return siad.networkPower.consensus().then(result =>{
        return result;
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get result of siad's consensus block request
async function concensusBlock(res, block){
    return siad.networkPower.consensusblock(block).then(result =>{
        return result;
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network storage state
exports.networkStorageState = async function networkStorageState (res){
    siad.networkPower.activehosts().then(result =>{
        if(result.hosts != null){
            var totalstorage = 0;
            var usedStorage = 0
            for(var i=0; i < result.hosts.length; i++){
                totalstorage += result.hosts[i].totalstorage
                usedStorage += result.hosts[i].remainingstorage
            }
            concensus(res).then(result =>{
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                Response._SuccessResponse(res, {
                    totalnetworkstorage: totalstorage, 
                    usednetworkstorage: usedStorage, 
                    currentblockchainheight: result.height, 
                    timestamp:new Date().getTime()
                })
            }).catch(err =>{
                Response._ErrorResponse(res, err.toString(), messages.error)
            })
        }else{
            Response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network actives hosts
exports.networkActivesHosts = async function networkActivesHosts(res){
    siad.networkPower.activehosts().then(result =>{
        if(result.hosts != null){
            var numberactivestorage = result.hosts.length;
            var numberactivestorageACC = 0;
            for(var i=0; i < result.hosts.length; i++){
                if(result.hosts[i].acceptingcontracts){
                    numberactivestorageACC++;
                }
            }
            concensus(res).then(result =>{
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                Response._SuccessResponse(res, {
                    numberactivestorage: numberactivestorage,
                    numberactivestorageACC: numberactivestorageACC,
                    currentblockchainheight: result.height, 
                    timestamp:new Date().getTime()
                })
            }).catch(err =>{
                console.log(err)
                Response._ErrorResponse(res, err.toString(), messages.error)
            })
            
        }else{
            Response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err =>{
        console.log(err)
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network Usage
exports.networkUsageRatio = async function networkUsageRatio (res){
    siad.networkPower.activehosts().then(result =>{
        if(result.hosts != null){
            var numberactivehosts = result.hosts.length;
            var totalstorage = 0;
            var usedStorage = 0
            for(var i=0; i < result.hosts.length; i++){
                totalstorage += result.hosts[i].totalstorage
                usedStorage += result.hosts[i].remainingstorage
            }
            concensus(res).then(result =>{
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                Response._SuccessResponse(res, {
                    storageusagepercentage: Number((usedStorage/totalstorage).toFixed(2)),
                    averagestoragesizeperhost: totalstorage/numberactivehosts,
                    currentblockchainheight: result.height, 
                    timestamp:new Date().getTime()
                })
            }).catch(err =>{
                Response._ErrorResponse(res, err.toString())
            })
            
        }else{
            Response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network Mining Profitability
exports.networkMiningProfitability = async function networkMiningProfitability (res){
    axios.get("https://whattomine.com/coins/161.json?hr=1.0&p=0.0&fee=0.0&cost=0.0&cost_currency=USD&hcost=0.0&span_br=&span_d=24").then(result =>{
        if(result.data != null){
            var CurrentProfitabilitybyMhs = result.data.estimated_rewards * 1024 * 1024;
            concensus(res).then(result1 =>{
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                concensusBlock(res, result1.height).then(result2 =>{
                    //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                    Response._SuccessResponse(res, {
                        currentprofitabilitybymhs: CurrentProfitabilitybyMhs, 
                        currentblockchainheight: result1.height, 
                        timestamp:new Date().getTime(),
                        latestminingblockrewards : result2.minerpayouts,
                    })
                }).catch(err =>{
                    Response._ErrorResponse(res, err.toString(), messages.error)
                })
            }).catch(err =>{
                Response._ErrorResponse(res, err.toString(), messages.error)
            })
        }else{
            Response._SuccessResponse(res, null, messages.error)
        }
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}
