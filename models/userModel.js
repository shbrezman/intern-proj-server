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
    passportNumber: {
        type: String,
        
    },
    phoneNumber: {
        type: String,
        unique: true
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
        score : Number
         }],
    practices : [{
       title: String,
       date : Date,
       score : Number
        }]

});



module.exports = mongoose.model('user', userSchema);


