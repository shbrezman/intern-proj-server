const express = require("express");
const app = express();
const mogoose = require('mongoose');
const port = 8080;
const dbPath = 'mongodb://127.0.0.1:27017/internDB';


app.use(require("cors")());
app.use(express.json());

mogoose.connect(dbPath, { useNewUrlParser: true , useUnifiedTopology: true});


app.use("/api/users", require('./routes/userRoute.js'));

app.listen(port, () => {
    console.log('server is running with port ' + port)
});
