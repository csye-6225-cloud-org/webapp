const db = require("../models");
const User = db.user;

exports.createuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    // if (checkpayload(req) == true){
    //     res.status(400).end();
    // }else{
    //     res.status(405).end();
    // }

    
    const user = {
        first_name: "asdf",
        last_name: "fdsa",
        password: "asdf",
        username: "asdf.fdsa@abc.com",
        account_created: new Date(),
        account_updated: new Date()
    }

    console.log(user);

    User.create(user)
        .then(res.status(200).end())
        .catch(err => {
            //following line throws error when creation fails - problem
            // res.status(500).send({
            //   message: "Error creating User with username: " + user.username
            // });
            console.log("Error creating User with username: " + user.username);
            console.log(err);
          });
    
}
