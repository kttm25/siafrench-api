const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');
const moment = require('moment')
const today = moment().startOf('day')

const Response = require("../utils/response")
const messages = require("../utils/messages")
const Siad = require('../model/siad');
const { InsertDatabaseData, UpdateDatabaseData, GetDatabaseSingleRecord } = require('./database');
const networkAnalysisModel = require('../model/database_network_analysis_model')
const hostsModel = require('../model/database_hosts_model')
const siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})

async function getHosts() {
    siad.siaNetworkData.activehosts().then(async function (result) {
        GetDatabaseSingleRecord ({
            createdAt: {
                $gte: today.toDate(),
                $lte: moment(today).endOf('day').toDate()
            }
        }, hostsModel).then((data) => {
            if (data) {
                //Update existing data host in day
                UpdateDatabaseData({ _id: data._id, hosts: result.hosts, activeHostsNumber: result.hosts.length }, hostsModel)
            } else {
                //Insert Hosts data 
                InsertDatabaseData({activeHostsNumber: result.hosts.length, hosts: result.hosts}, hostsModel)
            }
        }).catch((e) => {
            console.log(e)
        })
    }).catch(err => {
        console.log(err);
    })
}

//Get Network Profits Paid By Renters, network total supply and network profitability
async function networkBlockAnalysis() {
    siad.siaNetworkData.consensus().then(async function (result1) {
        var count = 0;
        var TotalSiacoinIncirculation = 0;
        var Network_profits_24hrs = 0;
        var Network_profits_7days = 0;
        var Network_profits_30days = 0;
        const dateNow = new Date()

        for (var i = 0; i <= result1.height; i++) {
            //setTimeout(()=>{}, 200 );
            await siad.siaNetworkData.consensusblock(i.toString()).then(result2 => {
                if (result2.minerpayouts.length > 0) {
                    TotalSiacoinIncirculation += parseInt(result2.minerpayouts[0].value);
                }

                //Get Profits Paid By Renters
                var j = 0;
                while (j < result2.transactions.length) {
                    //for 24 hrs
                    //Remove 1 day on the date of the day
                    if ((new Date(result2.timestamp * 1000).getTime() >= new Date().setDate(dateNow.getDate() - 1)) && result2.transactions[j].filecontracts.length > 0) {
                        result2.transactions[j].filecontracts.forEach(function (item) {
                            Network_profits_24hrs += parseInt(item.payout);
                        });
                    }

                    //for 7 days
                    //Remove 7 day on the date of the day
                    if ((new Date(result2.timestamp * 1000).getTime() >= new Date().setDate(dateNow.getDate() - 7)) && result2.transactions[j].filecontracts.length > 0) {
                        result2.transactions[j].filecontracts.forEach(function (item) {
                            Network_profits_7days += parseInt(item.payout);
                        });
                    }

                    //for 30 days
                    //Remove 30 day on the date of the day
                    if ((new Date(result2.timestamp * 1000).getTime() >= new Date().setDate(dateNow.getDate() - 30)) && result2.transactions[j].filecontracts.length > 0) {
                        result2.transactions[j].filecontracts.forEach(function (item) {
                            Network_profits_30days += parseInt(item.payout);
                        });
                    }

                    j++;
                }

                count++;
                //If background call is finish save in file
                if (count == result1.height) {
                    // Write data in 'Output.txt' .
                    console.log('Background Task Finished');
                    if (!process.env.DATABASE_ENABLE) {
                        fs.writeFile(process.env.FILE_DATA_LOCATION, JSON.stringify({
                            "networkTotalSupply": {
                                totalsiacoinincirculation: TotalSiacoinIncirculation,
                                currentblockchainheight: result1.height,
                                timestamp: dateNow.getTime(),
                            },
                            "networkProfitsPaidByRenters": {
                                Network_profits_24hrs: Network_profits_24hrs,
                                Network_profits_7days: Network_profits_7days,
                                Network_profits_30days: Network_profits_30days,
                                currentblockchainheight: result1.height,
                                timestamp: dateNow.getTime(),
                            },
                            "networkSiafundProfitability": {
                                Profitability_24hrs: Network_profits_24hrs * 0.039,
                                Profitability_7days: Network_profits_7days * 0.039,
                                Profitability_30days: Network_profits_30days * 0.039,
                                currentblockchainheight: result1.height,
                                timestamp: dateNow.getTime(),
                            }
                        }), (err) => {
                            // In case of a error throw err.
                            if (err) throw err;
                        })
                    }
                    else {
                        //Install NetworkAnalysis Data
                        InsertDatabaseData({
                            networkTotalSupply: {
                                totalsiacoinincirculation: TotalSiacoinIncirculation,
                                currentblockchainheight: result1.height,
                                timestamp: dateNow.getTime(),
                            },
                            networkProfitsPaidByRenters: {
                                Network_profits_24hrs: Network_profits_24hrs,
                                Network_profits_7days: Network_profits_7days,
                                Network_profits_30days: Network_profits_30days,
                                currentblockchainheight: result1.height,
                                timestamp: dateNow.getTime(),
                            },
                            networkSiafundProfitability: {
                                Profitability_24hrs: Network_profits_24hrs * 0.039,
                                Profitability_7days: Network_profits_7days * 0.039,
                                Profitability_30days: Network_profits_30days * 0.039,
                                currentblockchainheight: result1.height,
                                timestamp: dateNow.getTime(),
                            }
                        }, networkAnalysisModel)
                    }
                }
            }).catch(err2 => {
                throw err2;
            })
        }
    }).catch(err1 => {
        console.log(err1);
    })
}

exports.doInBackground = async function doInBackground() {
    //    console.log('running a task every 12h');
    //});
    //cron.schedule('1-59/4 * * * *', async function func(){
    //cron.schedule('* * * * *', async function func() {
        
    //Every 2 minutes
    //cron.schedule('*/2 * * * *', async () => {
    //Every 12h
    cron.schedule('0 */12 * * *', async function(){
        const back = async () => {
            console.log('Background Task Starded');
            await networkBlockAnalysis();
            await getHosts();
        }
        back();
    });
}
