const userModel = require('../models/userModel');
const tokenModel = require('../models/cryptModel');

function authContrroler(){
   
    function getUser(req, res){
        userModel.findOne({phoneNumber: req.params.phoneNumber}, function(err, user){
            if(err){
                return res.status(500).send({"msg": "db problem"})
            }
            if(!user){
                return res.status(404).send({error: "user not found"})
            }
            user.token = new tokenModel(true, null, user.name, user.roleNumber, user._id).token
                        
            return res.status(200).send(user);
        })
    }

    function createUser(req, res){
        var newUser = new userModel(req.body);
       
        newUser.save(function(err, newDoc){
            
            if(err){
               
              return res.status(400).send({msg: err.message})
            }
            
            return res.status(201).send(newDoc);
          })
    }

    function updateUser(req, res) {
        userModel.updateOne({id: req.body.id}, {tests: req.body.tests}, function(err, result){
            
            if(err) {
                console.log('im in err');
                return res.status(500).send();
            }

            if(! result.n){
                console.log('im in ! result.n');
                return res.status(404).send();
            }
            console.log(req.body.tests);
            res.status(200).send({msg: "update seccuflly"});

        })
    }

    return {
        getUser,
        createUser,
        updateUser
    }
}

module.exports = authContrroler();