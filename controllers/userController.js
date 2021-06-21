const userModel = require('../models/userModel');
const global = require('../utils/global');
const tokenModel = require('../models/cryptModel');
const encryption = require('../utils/encryption');
var split = '-!-';


function userController(){

    function getAllUsers(req, res){
        var roll = (encryption.getDecrypt(req.headers['x-access-token'])).split(split)[1];
        if(roll > 100)
        console.log('im in get all users');
        userModel.find(req.body, function(err, list){
            if(err){   
                return res.status(500).send({msg: "error"});
            }  
            return res.status(200).send(list);
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

    function updateUser(req, res) {
        var roll = (encryption.getDecrypt(req.headers['x-access-token'])).split(split)[1];
        if(roll < 300){

            userModel.updateOne({id: req.body.id}, {tests: req.body.tests}, function(err, result){
                if(err) {
                    console.log('im in err');
                    return res.status(500).send();
                }
                if(! result.n){
                    console.log('im in ! result.n');
                    return res.status(404).send();
                }
                res.status(200).send({msg: "update seccuflly"});
            })
        }
        else{
            res.status(400).send({msg: "authorization error"})
        }
        
    }

    return{
        getAllUsers: getAllUsers,
        updateUsers: updateUsers,
        updateUser: updateUser
    }
}

module.exports = userController();