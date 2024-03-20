const basicAuth = require('express-basic-auth');
const db = require("../models");
const User = db.user;

const logger = require("../utils/logger");

const bcrypt = require ('bcrypt');
const workFactor = 8;

module.exports = app => {

    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.get("/", basicAuth({ authorizer: passwordAuthorizer, authorizeAsync: true }), user.getuser);

    router.put("/", basicAuth({ authorizer: passwordAuthorizer, authorizeAsync: true }), user.updateuser);

    router.post("/", user.createuser);

    //base route
    app.use('/v1/user', router);

    async function passwordAuthorizer (username, password, cb) {
        logger.debug("Entered user.routes.passwordAuthorizer");
        User.findByPk(username)
            .then(data => {
                if (data) {
                    hash = data.password;
                    console.log("Hash found: " + hash);
                    bcrypt.compare(password, hash, function(err, result) {
                        if (result) {
                            console.log("Password verified");
                            logger.info("Password verified");
                            return cb(null, true);
                        }
                        else {
                            console.log("Password incorrect");
                            logger.info("Password incorrect");
                            return cb(null, false);
                        }
                    })
                } else{
                    console.log("User not found: " + username);
                    logger.info("User not found: " + username);
                    return cb(null, false);
                }
            })
            .catch(err => {
                console.log("error while verfying password " + err);
                logger.error("error while verfying password " + err);
                return cb(null, false);
            });
    }


    async function passwordVerifier (username, password) {
        logger.debug("Entered user.routes.passwordVerifier");
        try{
            //get row based on username
    
            var hash;

            const data = await User.findByPk(username);
            if(data){
            hash = data.password;
                console.log("Hash found: " + username);
                logger.info("Hash found: " + username);
                await bcrypt.compare(password, hash, function(err, result) {
                    if (result) {
                        console.log("Password verified");
                        logger.info("Password verified");
                        return true;
                    }
                    else {
                        console.log("Password incorrect");
                        logger.info("Password incorrect");
                        // throw new Exception("Password incorrect");
                        return false;
                    }
                })
            }else{
                console.log("User not found: " + username)
                logger.info("User not found: " + username);
                return false;
            }

        }catch(err){
            console.log("error while verfying pwd " + err);
            logger.error("error while verfying password " + err);
            return false;
        }
      }

};
