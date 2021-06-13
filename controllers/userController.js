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
            
            if(err){
               
              return res.status(400).send({msg: err.message})
            }
            
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
        userModel.updateOne({id: req.body.id}, {tests: req.body.tests}, function(err, result){
            console.log('im in update');
            if(err) {
                console.log('im in err');
                return res.status(500).send();
            }

            if(! result.n){
                console.log('im in ! result.n');
                return res.status(404).send();
            }
            console.log('im success');
            res.status(200).send({msg: "update seccuflly"});

        })
    }

    function updateUsers(req, res) {
        userModel.updateMany({_id: req.body._id}, {tests: req.tests}, function(err, result){
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
        updateUser: updateUser,
        updateUsers: updateUsers
    }
}

module.exports = userController();