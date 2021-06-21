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
        req.body.token = new tokenModel(true, null, req.body.name, req.body.roleNumber, req.body._id).token;
        console.log(req.body);
        var newUser = new userModel(req.body);
       
        newUser.save(function(err, newDoc){
            
            if(err){
               
              return res.status(400).send({msg: err.message})
            }
            
            return res.status(201).send(newDoc);
          })
    }

    
    return {
        getUser,
        createUser
    }
}

module.exports = authContrroler();