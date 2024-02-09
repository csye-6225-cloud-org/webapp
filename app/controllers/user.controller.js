const db = require("../models");
const User = db.user;
const bcrypt = require ('bcrypt');
const workFactor = 8;

exports.createuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    if( Object.keys(req.query).length > 0 || req.body.first_name == "" || req.body.first_name == null || req.body.first_name == undefined || req.body.last_name == "" || req.body.last_name == null || req.body.last_name == undefined 
    || req.body.password == "" || req.body.password == null || req.body.password == undefined || req.body.username == "" || req.body.username == null || req.body.username == undefined ){
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
            console.log("Error with password hashing: "+ onRejected);
            // Some task on failure
            res.status(500).send({
                message: onRejected
              });
        }
    )}

exports.getuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    // console.log("Auth done, inside getuser");
    // console.log(req.headers.authorization);

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    const username = login;
    console.log(username);


    if( Object.keys(req.query).length > 0){
        res.status(400).end();
    }

    // res.status(200).end();

    //get username here somehow

    User.findByPk(username)
        .then(data => {
            if (data) {
                dataToSend = {
                    id: data.id,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    username: data.username,
                    account_created: data.account_created,
                    account_updated: data.account_updated
                }
                // console.log("dataToSend: "+ dataToSend.id + dataToSend.username + dataToSend.account_created)
                res.status(200).send(dataToSend);
            } else {
                res.status(400).send({
                message: `Cannot find User with id=${username}.`
                });
            }
            })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving User with id=" + username +" " + err
            });
        });
}

exports.updateuser =  async (req, res) => {
    res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.set('Content-Type', 'application/json');
    res.set('X-Content-Type-Options', 'nosniff');

    if( Object.keys(req.query).length > 0 || req.body.username == "" || req.body.username == null || req.body.username == undefined ){
        res.status(400).send("Username cannot be empty");
    }

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [username, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    valuestoupdate = {};

    //need to test out with empty obj/first_name to see if value is "" or null or undefined  - done
    if(req.body.first_name != "" && req.body.first_name != null && req.body.first_name != undefined){
        valuestoupdate.first_name = req.body.first_name;
    }
    if(req.body.last_name != "" && req.body.last_name != null && req.body.last_name != undefined){
        valuestoupdate.last_name = req.body.last_name;
    }
    if(req.body.username != "" && req.body.username != null && req.body.username != undefined){
        valuestoupdate.username = req.body.username;
    }
    if(req.body.password != "" && req.body.password != null && req.body.password != undefined){
        valuestoupdate.password = req.body.password;
        this.passwordEncrypter(valuestoupdate.password).then(
            (encryptedPassword) => {
                // console.log(encryptedPassword)

                valuestoupdate.password = encryptedPassword;
                valuestoupdate.account_updated = new Date();
            
                // console.log(user);
            
                User.update(valuestoupdate, {
                    where: {username: username}
                })
                .then(num => {
                    if (num == 1) {
                        res.status(204).end();
                    } else {
                      res.status(400).send({
                        message: `Cannot update User with username= ${username}`
                      });
                    }
                  })
                  .catch(err => {
                    res.status(500).send({
                      message: "Error updating User with username=" + username + " "+ err
                    });
                  });
            },
            (onRejected) => {
                console.log("Error with password hashing: "+ onRejected);
                // Some task on failure
                res.status(500).send({
                    message: onRejected
                });
            }
        )}else{
            //password doesn't need to be updated
            User.update(valuestoupdate, {
                where: {username: username}
            })
            .then(num => {
                if (num == 1) {
                    res.status(204).end();
                } else {
                  res.status(400).send({
                    message: `Cannot update User with username= ${username}`
                  });
                }
              })
              .catch(err => {
                res.status(500).send({
                  message: "Error updating User with username=" + username + " " + err
                });
              });
        }
    }




// exports.passwordAuthorizer = function (username, password, cb) {
//     if (this.passwordVerifier(username, password))
//         return cb(null, true)
//     else
//         return cb(null, false)
// }

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

// exports.passwordVerifier = function(username, password) {
//     //get row based on username

//     var hash;
//     User.findByPk(username)
//     .then(data => {
//         if (data) {
//             hash = data.password;
//         } else{
//             console.log("User not found: " + username)
//             return false;
//         }
//     })
//     .catch(err => {
//         console.log("error while verfying pwd " + err)
//         return false;
//       });

//     console.log("Hash found: " + hash);

//     if(bcrypt.compare(password, hash, function(err, result) {
//         if (result) {
//             console.log("Password verified");
//             return true;
//         }
//         else {
//             console.log("Password not verified");
//             return false;
//         }
//       })){

//       }
//   }

  