const axios = require('axios');
const fs = require('fs');

const response = require("../utils/response")
const messages = require("../utils/messages")
const Siad = require('../model/siad');
const cookieParser = require('cookie-parser');
const { GetDatabaseLastRecord, GetDatabaseData } = require('../lib/database');
const networkAnalysisModel = require('../model/database_network_analysis_model');
const hostsModel = require('../model/database_hosts_model');

const siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})

//Get result of siad's consensus request
async function concensus(res) {
    return siad.siaNetworkData.consensus().then(result => {
        return result;
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get result of siad's consensus block request
async function concensusBlock(res, block) {
    return await siad.siaNetworkData.consensusblock(block).then(result => {
        return result;
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get result of siad's hostdb active host
async function activehosts(res) {
    return await siad.siaNetworkData.activehosts().then(result => {
        return result;
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

exports.getHostsHistory = async (res) => {
    if (process.env.DATABASE_ENABLE === "true") {
        await GetDatabaseLastRecord({}, hostsModel).then(async (result) => {
            if (result == null) {
                return response._ErrorResponse(res, messages.internal_error, messages.error)
            } else {
                await GetDatabaseData({}, hostsModel).then((result1) => {
                    if (result1 == null) {
                        return response._ErrorResponse(res, messages.internal_error, messages.error)
                    } else {
                        return response._SuccessResponse(
                            res,
                            {
                                topSiaHosts: {
                                    N1: {
                                        totalstorage: result.topSiaHosts.N1.totalstorage,
                                        netaddress: result.topSiaHosts.N1.netaddress.split(':')[0]
                                    },
                                    N2: {
                                        totalstorage: result.topSiaHosts.N2.totalstorage,
                                        netaddress: result.topSiaHosts.N2.netaddress.split(':')[0]
                                    },
                                    N3: {
                                        totalstorage: result.topSiaHosts.N3.totalstorage,
                                        netaddress: result.topSiaHosts.N3.netaddress.split(':')[0]
                                    },
                                },
                                hostsHistory: result1.map((hosts) => (
                                    {
                                        activeHostsNumber: hosts.activeHostsNumber,
                                        timestamp: hosts.timestamp
                                    }
                                ))

                            }
                        )
                    }
                })
            }
        })
    } else {
        return response._ErrorResponse(res, messages.database_disable, messages.error)
    }
}

//Get network storage state
exports.networkStorageState = async function networkStorageState(res) {
    siad.siaNetworkData.activehosts().then(result => {
        if (result.hosts != null) {
            var totalstorage = 0;
            var usedStorage = 0
            for (var i = 0; i < result.hosts.length; i++) {
                totalstorage += result.hosts[i].totalstorage
                usedStorage += result.hosts[i].remainingstorage
            }
            concensus(res).then(result => {
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                response._SuccessResponse(res, {
                    totalnetworkstorage: totalstorage,
                    usednetworkstorage: usedStorage,
                    currentblockchainheight: result.height,
                    timestamp: new Date().getTime()
                })
            }).catch(err => {
                response._ErrorResponse(res, err.toString(), messages.error)
            })
        } else {
            response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network actives hosts
exports.networkActivesHosts = async function networkActivesHosts(res) {
    siad.siaNetworkData.activehosts().then(result => {
        if (result.hosts != null) {
            var numberactivestorage = result.hosts.length;
            var numberactivestorageACC = 0;
            for (var i = 0; i < result.hosts.length; i++) {
                if (result.hosts[i].acceptingcontracts) {
                    numberactivestorageACC++;
                }
            }
            concensus(res).then(result => {
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                response._SuccessResponse(res, {
                    numberactivestorage: numberactivestorage,
                    numberactivestorageACC: numberactivestorageACC,
                    currentblockchainheight: result.height,
                    timestamp: new Date().getTime()
                })
            }).catch(err => {
                console.log(err)
                response._ErrorResponse(res, err.toString(), messages.error)
            })

        } else {
            response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err => {
        console.log(err)
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network Usage
exports.networkUsageRatio = async function networkUsageRatio(res) {
    siad.siaNetworkData.activehosts().then(result => {
        if (result.hosts != null) {
            var numberactivehosts = result.hosts.length;
            var totalstorage = 0;
            var usedStorage = 0
            for (var i = 0; i < result.hosts.length; i++) {
                totalstorage += result.hosts[i].totalstorage
                usedStorage += result.hosts[i].remainingstorage
            }
            concensus(res).then(result => {
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                response._SuccessResponse(res, {
                    storageusagepercentage: Number((usedStorage / totalstorage).toFixed(2)),
                    averagestoragesizeperhost: totalstorage / numberactivehosts,
                    currentblockchainheight: result.height,
                    timestamp: new Date().getTime()
                })
            }).catch(err => {
                response._ErrorResponse(res, err.toString())
            })

        } else {
            response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get network Mining Profitability
exports.networkMiningProfitability = async function networkMiningProfitability(res) {
    axios.get("https://whattomine.com/coins/161.json?hr=1.0&p=0.0&fee=0.0&cost=0.0&cost_currency=USD&hcost=0.0&span_br=&span_d=24").then(result => {
        if (result.data != null) {
            var CurrentProfitabilitybyMhs = result.data.estimated_rewards * 1024 * 1024;
            concensus(res).then(result1 => {
                //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                concensusBlock(res, result1.height).then(result2 => {
                    //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
                    response._SuccessResponse(res, {
                        currentprofitabilitybymhs: CurrentProfitabilitybyMhs,
                        currentblockchainheight: result1.height,
                        timestamp: new Date().getTime(),
                        latestminingblockrewards: result2.minerpayouts,
                    })
                }).catch(err => {
                    response._ErrorResponse(res, err.toString(), messages.error)
                })
            }).catch(err => {
                response._ErrorResponse(res, err.toString(), messages.error)
            })
        } else {
            response._SuccessResponse(res, null, messages.error)
        }
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get Network Storage pricing
exports.networkStoragePricing = async function networkStoragePricing(res) {
    siad.siaNetworkData.activehosts().then(result => {
        if (result.hosts != null) {
            var numberactivehosts = result.hosts.length;
            var SumstoragepriceperTbpermonth = 0;
            var SumuploadpriceperTB = 0
            var SumdowloadpriceperTB = 0
            for (var i = 0; i < result.hosts.length; i++) {
                SumstoragepriceperTbpermonth += result.hosts[i].storageprice
                SumuploadpriceperTB += result.hosts[i].uploadbandwidthprice
                SumdowloadpriceperTB += result.hosts[i].downloadbandwidthprice
            }
            response._SuccessResponse(res, {
                storagepriceperTbpermonth: SumstoragepriceperTbpermonth / numberactivehosts,
                uploadpriceperTB: SumuploadpriceperTB / numberactivehosts,
                dowloadpriceperTB: SumdowloadpriceperTB / numberactivehosts,
                timestamp: new Date().getTime()
            })
        } else {
            response._SuccessResponse(res, null, messages.nohostactive)
        }
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}


//Get network total supply
exports.networkTotalSupply = async function networkTotalSupply(res) {
    if (process.env.DATABASE_ENABLE === 'false') {
        fs.readFile(process.env.FILE_DATA_LOCATION, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                response._SuccessResponse(res, {
                    totalsiacoinincirculation: JSON.parse(data).networkTotalSupply.totalsiacoinincirculation,
                    //totalburntsiacoin: JSON.parse(data).networkTotalSupply.totalburntsiacoin,
                    currentblockchainheight: JSON.parse(data).networkTotalSupply.currentblockchainheight,
                    timestamp: JSON.parse(data).networkTotalSupply.timestamp,
                })
            } else {
                response._ErrorResponse(res, err.toString(), messages.error)
            }
        });
    }
    else {
        GetDatabaseLastRecord({}, networkAnalysisModel).then(result => {
            if (result === null) {
                response._ErrorResponse(res, [], messages.error)
            } else {
                response._SuccessResponse(res, {
                    totalsiacoinincirculation: result.networkTotalSupply.totalsiacoinincirculation,
                    //totalburntsiacoin: result.networkTotalSupply.totalburntsiacoin,
                    currentblockchainheight: result.networkTotalSupply.currentblockchainheight,
                    timestamp: result.networkTotalSupply.timestamp,
                }, messages.succes)
            }
        })
    }
}

//Get Network Profits Paid By Renters
exports.networkProfitsPaidByRenters = async function networkProfitsPaidByRenters(res) {
    if (process.env.DATABASE_ENABLE === "false") {
        fs.readFile(process.env.FILE_DATA_LOCATION, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                response._SuccessResponse(res, {
                    Network_profits_24hrs: JSON.parse(data).networkProfitsPaidByRenters.Network_profits_24hrs,
                    Network_profits_7days: JSON.parse(data).networkProfitsPaidByRenters.Network_profits_7days,
                    Network_profits_30days: JSON.parse(data).networkProfitsPaidByRenters.Network_profits_30days,
                    timestamp: JSON.parse(data).networkProfitsPaidByRenters.timestamp
                })
            } else {
                response._ErrorResponse(res, err.toString(), messages.error)
            }
        });
    } else {
        GetDatabaseLastRecord({}, networkAnalysisModel).then(result => {
            if (result === null) {
                response._ErrorResponse(res, [], messages.error)
            } else {
                response._SuccessResponse(res, {
                    Network_profits_24hrs: result.networkProfitsPaidByRenters.Network_profits_24hrs,
                    Network_profits_7days: result.networkProfitsPaidByRenters.Network_profits_7days,
                    Network_profits_30days: result.networkProfitsPaidByRenters.Network_profits_30days,
                    timestamp: result.networkProfitsPaidByRenters.timestamp
                }, messages.succes)
            }
        })
    }

}

//Get Network SiadFund Profitability
exports.networkSiaFundProfitability = async function networkSiaFundProfitability(res) {
    if (process.env.DATABASE_ENABLE === "false") {
        fs.readFile(process.env.FILE_DATA_LOCATION, { encoding: 'utf-8' }, function (err, data) {
            if (!err) {
                response._SuccessResponse(res, {
                    Profitability_24hrs: JSON.parse(data).networkSiafundProfitability.Profitability_24hrs,
                    Profitability_7days: JSON.parse(data).networkSiafundProfitability.Profitability_7days,
                    Profitability_30days: JSON.parse(data).networkSiafundProfitability.Profitability_30days,
                    timestamp: JSON.parse(data).networkProfitsPaidByRenters.timestamp
                })
            } else {
                response._ErrorResponse(res, err.toString(), messages.error)
            }
        });
    } else {
        GetDatabaseLastRecord({}, networkAnalysisModel).then(result => {
            if (result === null) {
                response._ErrorResponse(res, [], messages.error)
            } else {
                response._SuccessResponse(res, {
                    Profitability_24hrs: result.networkSiafundProfitability.Profitability_24hrs,
                    Profitability_7days: result.networkSiafundProfitability.Profitability_7days,
                    Profitability_30days: result.networkSiafundProfitability.Profitability_30days,
                    timestamp: result.networkProfitsPaidByRenters.timestamp
                }, messages.succes)
            }
        })
    }
}

//Get Network Mining Total Hashrate
exports.networkMiningTotalHashrate = async function networkMiningTotalHashrate(res) {
    concensus(res).then(result => {
        //res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})    
        var difficulty = result.difficulty;
        var timestamp = [];
        var count = 0;
        var blockanalysecount = 5;
        for (var i = result.height; i > result.height - blockanalysecount; i--) {
            concensusBlock(res, i.toString()).then(result1 => {
                timestamp.push(result1.timestamp);
                count++;
                if (count == blockanalysecount) {
                    var timeinterval = []
                    timestamp.sort();
                    timeaverage = 0;
                    for (var j = 0; j < timestamp.length - 1; j++) {
                        if (timestamp[j] - timestamp[j + 1] < 0) {
                            timeinterval.push((timestamp[j] - timestamp[j + 1]) * -1)
                            timeaverage += (timestamp[j] - timestamp[j + 1]) * -1
                        }
                        else {
                            timeinterval.push(timestamp[j] - timestamp[j + 1])
                            timeaverage += timestamp[j] - timestamp[j + 1]
                        }
                    }
                    timeaverage = timeaverage / blockanalysecount;
                    response._SuccessResponse(res, {
                        currentnetworkmininghashrate: (difficulty * 2 ** 32) / timeaverage,
                        currentnetworkdifficulty: difficulty,
                        currentaverageblocktime: timeaverage,
                        currentheight: result.height,
                        timestamp: new Date().getTime(),
                    })
                    //console.log(timeaverage)
                }
            }).catch(err => {
                response._ErrorResponse(res, err.toString(), messages.error)
            })
        }
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}

//Get Network Mining Total Hashrate
exports.networkMiningDifficulty = async function networkMiningDifficulty(res) {
    concensus(res).then(result => {
        //console.log(result)
        concensusBlock(res, result.height).then(result1 => {
            response._SuccessResponse(res, {
                currentminingdifficulty: result1.difficulty,
                currentminingblockreward: result1.minerpayouts[0].value,
                currentheight: result.height,
                timestamp: new Date().getTime(),
            })
        }).catch(err => {
            response._ErrorResponse(res, err.toString(), messages.error)
        })
    }).catch(err => {
        response._ErrorResponse(res, err.toString(), messages.error)
    })
}