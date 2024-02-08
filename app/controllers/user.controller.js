const db = require("../models");

exports.createuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    if (checkpayload(req) == true){
        res.status(400).end();
    }else{
        res.status(405).end();
    }
    
}
