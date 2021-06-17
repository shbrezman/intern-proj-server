const express = require("express");
const q = require("./models/questionModel");
const app = express();
const mogoose = require('mongoose');
const cryptModel = require('./models/cryptModel');

const port = 8080;
const dbPath = 'mongodb://127.0.0.1:27017/internDB';


app.use(require("cors")());
app.use(express.json());

mogoose.connect(dbPath, { useNewUrlParser: true , useUnifiedTopology: true});


app.use("/auth", require('./routes/authRoute'));

app.use("/api", function(req, res, next){
    var userToken = new cryptModel(false, req.headers['x-access-token']);
    console.log(userToken);
    console.log(userToken.isNotExpired());
    
    if(userToken.isNotExpired()){
        req.user = userToken
        console.log('is working');
        return next()
    } else{
        res.status(400).send('no access!!!')
    }
})
app.use("/api/users", require('./routes/userRoute.js'));

app.listen(port, () => {
    console.log('server is running with port ' + port)
});
