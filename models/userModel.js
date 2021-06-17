const mongoose = require('mongoose');


const schema = mongoose.Schema;

var userSchema = new schema({
    name: {
        type: String
    },
    password: {
        type: String,
       
    },
    age: {
        type: Number
        
    },
    id: {
        type: String,
        
    },
    token: String,
    
    passportNumber: {
        type: String,
        
    },
    phoneNumber: {
        type: String,
        unique: true
    },
    roleType: {
        type: String
    },
    roleNumber: {
        type: Number
    },
    img: {
        type: String,
    },
    country: {
        type: String,
    },
    city: {
        type: String,
    },
    academicInstitution: {
        type: String,
    },
    graduationYear: {
        type: Number,
    },
    medicalInstitution: {
        type: String,
    },
    residancy: {
        type: String,
    },
    department: {
        type: String,
    },
    residancyYear: {
        type: Number,
    },
    
    tests : [{
        title: String,
        date : Date,
        score : Number,
        examineeName: String,
        questions: []
        
         }],
    practices : [{
        title: String,
        date : Date,
        score : Number,
        examineeName: String,
        questions: []
        }]

});



module.exports = mongoose.model('user', userSchema);


