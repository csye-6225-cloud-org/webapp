const db = require("../models");
const User = db.user;
const bcrypt = require ('bcrypt');
const workFactor = 8;

exports.createuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    if( Object.keys(req.query).length > 0 || req.body.first_name == "" || req.body.first_name == null || req.body.last_name == "" || req.body.last_name == null 
    || req.body.password == "" || req.body.password == null || req.body.username == "" || req.body.username == null ){
        res.status(400).end();
    }

    this.passwordEncrypter(req.body.password).then(
        (encryptedPassword) => {
            // console.log(encryptedPassword)
            const user = {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                password: encryptedPassword,
                username: req.body.username,
                account_created: new Date(),
                account_updated: new Date()
            }
        
            // console.log(user);
        
            User.create(user)
                .then(data => {
                    delete data.password;
                    dataToSend = {
                        id: data.id,
                        first_name: data.first_name,
                        last_name: data.last_name,
                        username: data.username,
                        account_created: data.account_created,
                        account_updated: data.account_updated
                    }
                    res.status(201).send(dataToSend);
                })
                .catch(err => {
                    //following line throws error when creation fails - problem
                    
                    res.status(500).send({
                      message: "Error creating User with username: " + user.username + " " +err
                    });
                });
            // Some task on success
        },
        (onRejected) => {
            console.log("Error with user creation: "+ onRejected);
            // Some task on failure
        }
    )}

exports.getuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    console.log("Auth done, inside getuser");
    res.status(200).end();

    const username = req.params.id;

    User.findByPk(username)
        .then(data => {
        if (data) {
            console.log(data);
            res.send(data);
        } else {
            res.status(400).send({
            message: `Cannot find User with id=${username}.`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Error retrieving User with id=" + username
        });
        });
}

exports.passwordAuthorizer = function (username, password, cb) {
    if (this.passwordVerifier(username, password))
        return cb(null, true)
    else
        return cb(null, false)
}

exports.passwordEncrypter = async function(password) {
    try {
      const salt = await bcrypt.genSalt(workFactor);
    //   console.log('Salt: ' + salt);
      const hash = await bcrypt.hash(password, salt);
    //   console.log('Hash: ' + hash);
      return hash; 
    } catch (err) {
      console.error(err.message);
    }
  }

exports.passwordVerifier = function(username, password) {
    //get row based on username

    var hash;
    User.findByPk(username)
    .then(data => {
        if (data) {
            hash = data.password;
        } else{
            console.log("User not found: " + username)
            return false;
        }
    })
    .catch(err => {
        console.log("error while verfying pwd " + err)
        return false;
      });

    console.log("Hash found: " + hash);

    if(bcrypt.compare(password, hash, function(err, result) {
        if (result) {
            console.log("Password verified");
            return true;
        }
        else {
            console.log("Password not verified");
            return false;
        }
      })){

      }
  }

  