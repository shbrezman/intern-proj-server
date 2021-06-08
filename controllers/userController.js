const userModel = require('../models/userModel');
const global = require('../utils/global')

function userController(){

    function getAllUsers(req, res){
        
        userModel.find(req.body, function(err, list){
            if(err){
                
                return res.status(500).send({});
            }
            
            return res.status(200).send(list);
        })
        
    }

    function createUser(req, res){
        var newUser = new userModel(req.body);
       
        newUser.save(function(err, newDoc){
            console.log('im here');
            if(err){
                console.log('im error');
              return res.status(400).send({msg: err.message})
            }
            console.log('im here2');
            return res.status(201).send(newDoc);
          })
    }

    function getUser(req, res){
        userModel.findOne({phoneNumber: req.params.phoneNumber}, function(err, user){
            if(err){
                return res.status(500).send({"msg": "db problem"})
            }
            if(!user){
                return res.status(404).send({error: "user not found"})
            }
            return res.status(200).send(user);
        })
    }

    function updateUser(req, res) {
        userModel.updateOne({_id: req.params._id}, {$set: req.body}, function(err, result){
            if(err) {
                return res.status(500).send();
            }

            if(! result.n){
                return res.status(404).send();
            }
            res.status(200).send({msg: "update seccuflly"});

        })
    }

    return{
        getAllUsers: getAllUsers,
        createUser: createUser,
        getUser: getUser,
        updateUser: updateUser
    }
}

module.exports = userController();