/*CITATIONS

Express & sequelize setup
    https://expressjs.com/en/starter/installing.html
    https://www.bezkoder.com/node-express-sequelize-postgresql/

Postgres password enforcing
    https://stackoverflow.com/questions/29679507/how-to-force-postgresql-user-login-with-password  

License
    https://www.gnu.org/licenses/license-recommendations.en.html#:~:text=For%20most%20programs%2C%20we%20recommend,numerous%20protections%20for%20users'%20freedom.

Integration testing
    https://dev.to/franciscomendes10866/testing-express-api-with-jest-and-supertest-3gf
    https://stackoverflow.com/questions/71121350/typeerror-app-app-close-is-not-a-function-using-jest-27-5-1
    https://jestjs.io/docs/cli#--forceexit
    https://github.com/ladjs/supertest

Basic Auth
    https://www.npmjs.com/package/express-basic-auth

Boostrapping DB
    https://sequelize.org/docs/v7/models/model-synchronization/
    https://sequelize.org/docs/v6/core-concepts/validations-and-constraints/
    https://stackoverflow.com/questions/50414899/node-js-sequelize-uuid-primary-key-postgres
    https://sequelize.org/docs/v6/
    https://sequelize.org/docs/v7/models/auto-timestamps/

Bcrypt
    https://blog.logrocket.com/password-hashing-node-js-bcrypt/
    https://www.educative.io/answers/how-to-hash-passwords-using-bcrypt-in-nodejs
*/

const express = require("express");
const bodyParser = require("body-parser");
const logger = require("./app/utils/logger");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.disable("etag");

// app.use(basicAuth);

//importing db info and syncing db
const db = require("./app/models");
db.sequelize.sync({ alter: true })
  .then(() => {
    console.log("postgres db sync on server start successful");
    logger.info("Postgres DB synced on server start");
  })
  .catch((err) => {
    console.log("postgres db sync on server start failed: " + err.message);
    logger.info("Postgres DB sync on server start failed: " + err.message);
  });

//importing routes
require("./app/routes/healthcheck.routes")(app);
require("./app/routes/user.routes")(app);

//starting server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("Server started on port ${PORT}...");
  logger.info("Server started on port ${PORT}...");
});

module.exports = app;
