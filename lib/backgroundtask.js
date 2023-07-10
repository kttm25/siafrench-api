const axios = require('axios');
const cron = require('node-cron');
const fs = require('fs');

const Response = require("../utils/response")
const messages = require("../utils/messages")
const Siad = require('../model/siad');
const siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})
/*const siad = new Siad({
    host: "http://127.0.0.1:9880",
    agent: "Sia-Agent",
    password: "11d7aefd0c835cf9c4a400454bba4c56"
})*/

//Get Network Profits Paid By Renters and network total supply
async function networkBlockAnalyse(){
    await axios.get("https://siastats.info:3500/navigator-api/hash/000000000000000000000000000000000000000000000000000000000000000089eb0d6a8a69").then(result =>{
        if(result != null){
            var TotalBurnSiaCoin = result.data[1].balanceSc;
            siad.siaNetworkData.consensus().then(result1 =>{
                var count = 0;
                var TotalSiacoinIncirculation = 0;
                var Network_profits_24hrs = 0;
                var Network_profits_7days = 0;
                var Network_profits_30days = 0;
                const dateNow = new Date()
                
                for(var i=0; i<=result1.height; i++){
                    //setTimeout(()=>{}, 200 );
                    siad.siaNetworkData.consensusblock(i.toString()).then(result2 =>{
                        if(result2.minerpayouts.length >0){
                            TotalSiacoinIncirculation += parseInt(result2.minerpayouts[0].value);
                        }
                        
                        //Get Profits Paid By Renters
                        var j= 0;
                        while(j<result2.transactions.length){
                            //for 24 hrs
                            //Remove 1 day on the date of the day
                            if((new Date(result2.timestamp * 1000).getTime() >= new Date().setDate(dateNow.getDate() - 1)) && result2.transactions[j].filecontracts.length > 0){
                                result2.transactions[j].filecontracts.forEach(function(item){
                                    Network_profits_24hrs += parseInt(item.payout);
                                });
                            }

                            //for 7 days
                            //Remove 7 day on the date of the day
                            if((new Date(result2.timestamp * 1000).getTime() >= new Date().setDate(dateNow.getDate() - 7)) && result2.transactions[j].filecontracts.length > 0){
                                result2.transactions[j].filecontracts.forEach(function(item){
                                    Network_profits_7days += parseInt(item.payout);
                                });
                            }

                            //for 30 days
                            //Remove 30 day on the date of the day
                            if((new Date(result2.timestamp * 1000).getTime() >= new Date().setDate(dateNow.getDate() - 30)) && result2.transactions[j].filecontracts.length > 0){
                                result2.transactions[j].filecontracts.forEach(function(item){
                                    Network_profits_30days += parseInt(item.payout);
                                });
                            }

                            j++;
                        }

                        count++;
                        //console.log(count)
                        //If background call is finish save in file
                        if(count == result1.height){
                            // Write data in 'Output.txt' .
                            fs.writeFile(process.env.FILE_DATA_LOCATION, JSON.stringify({
                                "networkTotalSupply":{
                                    totalsiacoinincirculation: TotalSiacoinIncirculation,
                                    totalburntsiacoin: TotalBurnSiaCoin,
                                    currentblockchainheight: result1.height, 
                                    timestamp: dateNow.getTime(),
                                },
                                "networkProfitsPaidByRenters":{
                                    Network_profits_24hrs: Network_profits_24hrs,
                                    Network_profits_7days: Network_profits_7days,
                                    Network_profits_30days: Network_profits_30days,
                                    currentblockchainheight: result1.height, 
                                    timestamp:dateNow.getTime(),
                                },
                                "networkSiafundProfitability":{
                                    Profitability_24hrs: Network_profits_24hrs * 0.039,
                                    Profitability_7days: Network_profits_7days * 0.039,
                                    Profitability_30days: Network_profits_30days * 0.039,
                                    currentblockchainheight: result1.height, 
                                    timestamp:dateNow.getTime(),
                                }
                            }), (err) => {
                                // In case of a error throw err.

                                if(err) throw err;   
                            })
                            /*console.log({
                                "networkTotalSupply":{
                                    totalsiacoinincirculation: TotalSiacoinIncirculation,
                                    totalburntsiacoin: TotalBurnSiaCoin,
                                    currentblockchainheight: result1.height, 
                                    timestamp: dateNow.getTime(),
                                },
                                "networkProfitsPaidByRenters":{
                                    Network_profits_24hrs: Network_profits_24hrs,
                                    Network_profits_7days: Network_profits_7days,
                                    Network_profits_30days: Network_profits_30days,
                                    currentblockchainheight: result1.height, 
                                    timestamp:dateNow.getTime(),
                                }
                            })*/
                        }
                    }).catch(err2 =>{
                        //console.log(err2);
                        throw err2;
                    })
                }
            }).catch(err1 =>{
                console.log(err1);
            })
        }else{
            console.log(messages.error);
        }
    }).catch(err =>{
        throw err;
    })
}

exports.doInBackground = async function doInBackground(){
    //cron.schedule('* */12 * * *', function(){
    //    console.log('running a task every 12h');
    //});
    //cron.schedule('1-59/4 * * * *', async function func(){
    cron.schedule('* * * * *', async function func(){
        console.log('Background Task Starded');
        await networkBlockAnalyse()
    });
}
