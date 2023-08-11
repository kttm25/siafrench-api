const mongoose = require('mongoose');
const model = require("../model/databasemodel")

async function connection(){
    //Connect Database
    //const url = process.env.DATABASE_CONNECTION_LINK + '/' + process.env.DATABASE_NAME;
    mongoose.connect('mongodb://localhost:27017/User', {useNewUrlParser: true});
    mongoose.connection.once('open',function(){
        //console.log('Database connected Successfully');
    }).on('error',function(err){
        console.log('Error', err);
    });
}

exports.InsertDatabaseData = async function InsertData(data){
    connection();
    const _newUser = new model({
        email: data.email,
        passwordHash: data.passwordHash,
        passwordSalt: data.passwordSalt,
        apiCallRemain: data.apiCallRemain,
        apiKey: data.apiKey,
    });

    return await _newUser.save()/*.then(val => {
       console.log({ msg: "User Added Successfully", val: val })
    }).catch(error => {
        console.log(error)
    });*/
    
}

exports.UpdateDatabaseData = async function UpdateData(data){
    connection();
    // Updated at most one doc, `res.nModified` contains the number
    // of docs that MongoDB updated
    return await model.findOneAndUpdate({_id: data._id}, data)/*.then(val => {
        console.log({ msg: "User Update Successfully", val: val })
    }).catch(error => {
        console.log(error)
    });*/
}

exports.GetDatabaseData = async function GetData(data){
    connection();

    // Updated at most one doc, `res.nModified` contains the number
    // of docs that MongoDB updated
    return await model.findOne({email: data.email})/*.then(val => {
        console.log({ msg: "User Get Successfully", val: val })
    }).catch(error => {
        console.log(error)
    });*/
}

exports.FindWithApiKey = async function FindData(apiKey){
    connection();

    // Updated at most one doc, `res.nModified` contains the number
    // of docs that MongoDB updated
    return await model.findOne({apiKey: apiKey});
}

//UpdateData({email: 'Email', password: 'Password Change 1', apiKey: 'Key'});
//GetData({email: 'Email', password: 'Password Change 1', apiKey: 'Key'});
//InsertData({email: 'Email', password: 'Password1', apiKey: 'Key1'});

