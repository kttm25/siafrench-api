const crypto = require('crypto');
console.log();

// Success response format
exports._SuccessResponse = function succes(res, data=null, message=null){
    if(message != null){
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": message,
            "data": data  
        })
    }else{ 
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": "success.",
            "data": data  
        })
    }
}

// Error response format
exports._ErrorResponse = function error(res, data=null, message=null){
    if(message != null){
        res.status(400);
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": message,
            "data": data  
        })
    }else{
        res.status(400);
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": "error.",
            "data": data  
        })
    }
}

// Error API Key invalid response format
exports._ErrorNotAllowedResponse = function error(res, data=null, message=null){
    if(message != null){
        res.status(403);
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": message,
            "data": data  
        })
    }else{
        res.status(403);
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": "error.",
            "data": data  
        })
    }
}

// Error Max API Callresponse format
exports._ErrorMaxAPICallResponse = function error(res, data=null, message=null){
    if(message != null){
        res.status(403);
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": message,
            "data": data  
        })
    }else{
        res.status(403);
        res.send({
            "request_id": crypto.randomUUID(), //"4e14a4aa-2368-4029-a660-5a883c0c29f1#606",
            "code": 0,
            "message": "error.",
            "data": data  
        })
    }
}