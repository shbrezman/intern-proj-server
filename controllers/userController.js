const userModel = require('../models/userModel');
const global = require('../utils/global')

function userController(){

    function getAllUsers(req, res){
        console.log('im in get all users');
        userModel.find(req.body, function(err, list){
            if(err){
                
                return res.status(500).send({msg: "kjdcbksdbcdsj"});
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

    return{
        getAllUsers: getAllUsers,
        updateUsers: updateUsers
    }
}

module.exports = userController();