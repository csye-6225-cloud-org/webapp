module.exports = app => {
    const healthcheck = require("../controllers/healthcheck.controller.js");

    var router = require("express").Router();

    //get request to /healthz (only valid one for now)
    router.get("/healthz", healthcheck.checkdbconnection);

    //invalid requests to /healthz
    router.put("/healthz", healthcheck.invalidhealthcheck);

    router.post("/healthz", healthcheck.invalidhealthcheck);

    router.patch("/healthz", healthcheck.invalidhealthcheck);

    router.delete("/healthz", healthcheck.invalidhealthcheck);

    router.head("/healthz", healthcheck.invalidhealthcheck);

    router.options("/healthz", healthcheck.invalidhealthcheck);

    //base route
    app.use('/', router);
};