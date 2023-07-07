const axios = require('axios');
const fs = require('fs');

const Response = require("../utils/response")
const messages = require("../utils/messages")
const Siad = require('../model/siad');
const cookieParser = require('cookie-parser');
const siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})

//Get result of siad's consensus request
async function concensus(res){
    return siad.siaNetworkData.consensus().then(result =>{
        return result;
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get result of siad's consensus block request
async function concensusBlock(res, block){
    return await siad.siaNetworkData.consensusblock(block).then(result =>{
        return result;
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get result of siad's hostdb active host
async function activehosts(res){
    return await siad.siaNetworkData.activehosts().then(result =>{
        return result;
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network storage state
exports.networkStorageState = async function networkStorageState (res){
    siad.siaNetworkData.activehosts().then(result =>{
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
    siad.siaNetworkData.activehosts().then(result =>{
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
    siad.siaNetworkData.activehosts().then(result =>{
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

//Get Network Storage pricing
exports.networkStoragePricing = async function networkStoragePricing (res){
    siad.siaNetworkData.activehosts().then(result =>{
        if(result.hosts != null){
            var numberactivehosts = result.hosts.length;
            var SumstoragepriceperTbpermonth = 0;
            var SumuploadpriceperTB = 0
            var SumdowloadpriceperTB = 0
            for(var i=0; i < result.hosts.length; i++){
                SumstoragepriceperTbpermonth += result.hosts[i].storageprice
                SumuploadpriceperTB += result.hosts[i].uploadbandwidthprice
                SumdowloadpriceperTB += result.hosts[i].downloadbandwidthprice
            }
            Response._SuccessResponse(res, {
                storagepriceperTbpermonth: SumstoragepriceperTbpermonth/numberactivehosts,
                uploadpriceperTB: SumuploadpriceperTB/numberactivehosts,
                dowloadpriceperTB: SumdowloadpriceperTB/numberactivehosts,
                timestamp:new Date().getTime()
            })
        }else{
            Response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}


//Get network total supply
exports.networkTotalSupply = async function networkTotalSupply (res){
    fs.readFile(process.env.FILE_DATA_LOCATION, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            Response._SuccessResponse(res, {
                totalsiacoinincirculation: JSON.parse(data).networkTotalSupply.totalsiacoinincirculation,
                totalburntsiacoin: JSON.parse(data).networkTotalSupply.totalburntsiacoin,
                currentblockchainheight: JSON.parse(data).networkTotalSupply.currentblockchainheight, 
                timestamp: JSON.parse(data).networkTotalSupply.timestamp,
            })
        } else {
            Response._ErrorResponse(res, err.toString(), messages.error)
        }
    });
}

//Get Network Profits Paid By Renters
exports.networkProfitsPaidByRenters = async function networkProfitsPaidByRenters (res){
    
    fs.readFile(process.env.FILE_DATA_LOCATION, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            Response._SuccessResponse(res, {
                Network_profits_24hrs: JSON.parse(data).networkProfitsPaidByRenters.Network_profits_24hrs,
                Network_profits_7days: JSON.parse(data).networkProfitsPaidByRenters.Network_profits_7days,
                Network_profits_30days: JSON.parse(data).networkProfitsPaidByRenters.Network_profits_30days,
                timestamp: JSON.parse(data).networkProfitsPaidByRenters.timestamp
            })
        } else {
            Response._ErrorResponse(res, err.toString(), messages.error)
        }
    });
}

//Get Network SiadFund Profitability
exports.networkSiaFundProfitability = async function networkSiaFundProfitability (res){
    
    fs.readFile(process.env.FILE_DATA_LOCATION, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            Response._SuccessResponse(res, {
                Profitability_24hrs: JSON.parse(data).networkSiafundProfitability.Profitability_24hrs,
                Profitability_7days: JSON.parse(data).networkSiafundProfitability.Profitability_7days,
                Profitability_30days: JSON.parse(data).networkSiafundProfitability.Profitability_30days,
                timestamp: JSON.parse(data).networkProfitsPaidByRenters.timestamp
            })
        } else {
            Response._ErrorResponse(res, err.toString(), messages.error)
        }
    });
}

//Get Network Mining Total Hashrate
exports.networkMiningTotalHashrate = async function networkMiningTotalHashrate(res){
    concensus(res).then(result =>{
        //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})    
        var difficulty = result.difficulty;
        var timestamp = [];
        var count = 0;
        var blockanalysecount = 5;
        for(var i = result.height; i > result.height - blockanalysecount; i--){
            concensusBlock(res, i.toString()).then(result1 =>{
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                timestamp.push(result1.timestamp);
                /*Response._SuccessResponse(res, {
                    currentprofitabilitybymhs: CurrentProfitabilitybyMhs, 
                    currentblockchainheight: result1.height, 
                    timestamp:new Date().getTime(),
                    latestminingblockrewards : result2.minerpayouts,
                })*/
                if(count == blockanalysecount){
                    var timeaverage = []
                    timestamp.sort();
                    console.log(timestamp)
                    for(var j=0; j < timestamp.length - 1; j++){
                        timeaverage.push(timestamp[j] - timestamp[j+1])
                    }
                    console.log(timeaverage)
                }
            }).catch(err =>{
                Response._ErrorResponse(res, err.toString(), messages.error)
            })
        }
    }).catch(err =>{
        Response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get Network Mining Total Hashrate
exports.networkMiningDifficulty = async function networkMiningDifficulty(res){
    
    fs.readFile(process.env.FILE_DATA_LOCATION, {encoding: 'utf-8'}, function(err,data){
        if (!err) {
            Response._SuccessResponse(res, {
                Profitability_24hrs: JSON.parse(data).networkSiafundProfitability.Profitability_24hrs,
                Profitability_7days: JSON.parse(data).networkSiafundProfitability.Profitability_7days,
                Profitability_30days: JSON.parse(data).networkSiafundProfitability.Profitability_30days,
                timestamp: JSON.parse(data).networkProfitsPaidByRenters.timestamp
            })
        } else {
            Response._ErrorResponse(res, err.toString(), messages.error)
        }
    });
}