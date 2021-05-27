const userModel = require('../models/userModel');
const global = require('../utils/global')

function userController(){

    function getAllUsers(req, res){
        userModel.find(function(err, list){
            if(err){
                return res.status(500).send({});
            }
            return res.status(200).send(list);
        })
        
    }

    function createUser(req, res){
        var newUser = new userModel(req.body);
       
        newUser.password = codeTable.get(req.body.phoneNumber);
        
        // codeTable.forEach(element => {
        //     if(element.phoneNumber = req.body.phoneNumber){
                
        //         newUser.password = element.code;
        //     }
        // });

        newUser.save(function(err, newDoc){
            if(err){
                res.status(409).send({msg: err.message})
            }
            res.status(201).send(newDoc);
          })
    }

    function getUser(req, res){
        userModel.findOne({phoneNumber: req.params.phoneNumber}, function(err, user){
            if(err){
                res.status(500).send({"msg": "db problem"})
            }
            if(!user){
                res.status(404).send({error: "user not found"})
            }
            res.status(200).send(user);
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
            res.status(200).send("update seccuflly");

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