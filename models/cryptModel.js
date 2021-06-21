var encrypt = require('../utils/encryption');
var ttl = 1000 * 60 * 60;
var split = "-!-"


function userToken(isNewToken, token, name, roll, _id){
    if (isNewToken) {
        this.expierd = Date.now() + ttl;
        this.token = encrypt.getEncrypt(name + split + roll + split + _id + split + this.expierd);
    }
    else{
        this.token = token;
        var tokenStr = encrypt.getDecrypt(token).split(split);
        this.name = tokenStr[0];
        this.roll = parseInt(tokenStr[1]);
        this._id = tokenStr[2];
        this.exiprationTime = tokenStr[3];
    }

    this.isNotExpired = function() {
        
        
        return this.exiprationTime && parseInt(this.exiprationTime) > Date.now();
        
    }
}

module.exports = userToken