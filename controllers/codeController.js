const global = require('../utils/global')
const crypt = require('../utils/encryption')
const Vonage = require('@vonage/server-sdk')

const vonage = new Vonage({
  apiKey: "cd040200",
  apiSecret: "ofHyW6HzPK2NtZkb"
})
function codeController(){
    function smsMange(req, res){
        var from = req.body.from;
        var to = req.body.to;
        var text = req.body.text;
        vonage.message.sendSms(from, to, text, (err, responseData) => {
            if (err) {
                console.log("big fat Error" + err);
            } else {
                if(responseData.messages[0]['status'] === "0") {
                    console.log("Message sent successfully.");
                } else {
                    console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                }
            }
        })
    }

    function sendTxt(req, res){
        var password = (Math.floor(Math.random() * 8999) + 1000).toString();
        
        codeTable.set(req.body.to, crypt.cryptPassword(password));
        console.log(codeTable)
        res.status(200).send({msg : password});
        setTimeout(() => {
            codeTable.delete(req.body.to)
        }, 1000 * 60 * 30);
    }

    function varifacationCode(req, res){

        var code = codeTable.get(req.body.phoneNumber);
        
        
        res.send({msg: crypt.compare(req.body.password, code)});
    }

        
        return{
            sendSms: smsMange,
            sendTxt: sendTxt,
            varifacationCode: varifacationCode
        }
    }
    
    module.exports = codeController();

