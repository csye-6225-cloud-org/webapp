module.exports = app => {
    const healthcheck = require("../controllers/user.controller.js");

    var router = require("express").Router();

    router.get("/self", healthcheck.checkdbconnection);

    router.put("/self", healthcheck.invalidhealthcheck);

    router.post("/", healthcheck.invalidhealthcheck);

    //base route
    app.use('/v1/user', router);
};