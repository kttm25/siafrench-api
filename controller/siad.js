var Siad = require('../model/siad')
var siad = new Siad({
    host: process.env.SIAD_HOST,
    agent: process.env.SIAD_AGENT,
    password: process.env.SIAD_TOKEN
    // other arguments
})


//console.log(siad)
async function networkStorageCapacity (res){
    siad.networkPower.activehosts().then(result =>{
        var totalstorage = 0;
        for(var i=0; i < result.hosts.length; i++){
            totalstorage+= result.hosts[i].totalstorage
        }
        concensus(res).then(result =>{
            res.send({totalstorage: totalstorage, currentlyheight: result.height, requesttimestamp:new Date().getTime()})
        }).catch(err =>{
            res.send(err)
        })
        //res.send({totalstorage: totalstorage})
    }).catch(err =>{
        res.send(err)
    })
}

async function concensus(res){
    return siad.networkPower.consensus().then(result =>{
        return result;
    }).catch(err =>{
        res.send(err)
    })
}

exports.networkStorageCapacity = networkStorageCapacity;