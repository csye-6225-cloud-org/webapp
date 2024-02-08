const basicAuth = require('express-basic-auth');
const db = require("../models");
const User = db.user;

const bcrypt = require ('bcrypt');
const workFactor = 8;

module.exports = app => {

    const user = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.get("/", basicAuth({ authorizer: passwordAuthorizer, authorizeAsync: true }), user.getuser);

    // router.put("/self", healthcheck.invalidhealthcheck);

    router.post("/", user.createuser);

    //base route
    app.use('/v1/user', router);

    function passwordAuthorizer (username, password, cb) {
        if (passwordVerifier(username, password)){
            console.log("Verified at passwordAuthorizer")
            return cb(null, true)
        }
        else{
            console.log("Failed at passwordAuthorizer")
            return cb(null, false)
        }
    }

    function passwordVerifier (username, password) {
        //get row based on username
    
        var hash;
        User.findByPk(username)
        .then(data => {
            if (data) {
                hash = data.password;
                console.log("Hash found: " + hash);
                bcrypt.compare(password, hash, function(err, result) {
                    if (result) {
                        console.log("Password verified");
                        return true;
                    }
                    else {
                        console.log("Password not verified");
                        return false;
                    }
                  })
            } else{
                console.log("User not found: " + username)
                return false;
            }
        })
        .catch(err => {
            console.log("error while verfying pwd " + err)
            return false;
          });
      }

};
