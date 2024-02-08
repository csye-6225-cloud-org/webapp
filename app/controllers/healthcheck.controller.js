const db = require("../models");

//performing health check by syncing db
exports.checkdbconnection = async (req, res) => {

    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    //checking validity of request
    // console.log(req.headers["content-type"]);
    if (checkpayload(req) == true || Object.keys(req.query).length>0){
        res.status(400).end();
    }else{
        try {
            //performing simple connection check with db
            await db.sequelize.authenticate();
            res.status(200).end();
    
        } catch (error) {
            res.status(503).end();
        }
    }
    
}

//invalid routes for health check
exports.invalidhealthcheck =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    if (checkpayload(req) == true || Object.keys(req.query).length>0){
        res.status(400).end();
    }else{
        res.status(405).end();
    }
    
}

//checking if request has body
function checkpayload(req, res){
    // console.log(req.body);
    //content type undefined to handle non json payload case
    if(req.body.constructor === Object && Object.keys(req.body).length === 0 && req.headers["content-type"] == undefined) {
        // console.log("Payload empty including bodies not in json express ignores");
        return false;
    }
    //content type doesn't exist until content exists.
    // if(req.headers["content-type"] != "application/json"){
    //     return true;
    // }
    return true;
}
