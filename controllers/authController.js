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

    return {
        getUser
    }
}

module.exports = authContrroler();