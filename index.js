const express = require("express");
const q = require("./models/questionModel");
const app = express();
const mogoose = require('mongoose');
const cryptModel = require('./models/cryptModel');
const encryption = require('./utils/encryption')
const port = 8080;
const dbPath = 'mongodb://127.0.0.1:27017/internDB';
//const dbPath = 'mongodb+srv://internsDB:412336195@internscluster.lujbp.mongodb.net/internsDB?retryWrites=true&w=majority';



app.use(require("cors")());
app.use(express.json());

mogoose.connect(dbPath, { useNewUrlParser: true , useUnifiedTopology: true});


app.use("/auth", require('./routes/authRoute'));


app.use("/api", function(req, res, next){
    var userToken = new cryptModel(false, req.headers['x-access-token']);
    
    if(userToken.isNotExpired()){
        req.user = userToken;
        console.log('token chacked');
        return next()
    } else{
        res.status(400).send('no access!!!')
    }
})
app.use("/api/users", require('./routes/userRoute.js'));

app.listen(port, () => {
    console.log('server is running with port ' + port)
});
