const https = require("https");
const querystring = require("querystring");
// const logger = require("../helper/logger");

smsAPI = "https://www.mobilnxt.in/api/push";

// send message through mobilnxt api
exports.sendMessage = function (text, to) {
  // define data to be sent
  // console.log(text,to)
  var data = {
    accesskey: "h7KLHYQVGqw6afOFDPfn7KU1YsMagN",
    to: to,
    text: text,
    from: "SMRTDR", 
  };

  // process the data through api
  https
    .get(smsAPI + "?" + querystring.encode(data), (res) => {
      res.on("data", (d) => {
        process.stdout.write(d);
      });
    })
    .on("error", (e) => {
      console.error(e);
      console.log('sms could not be send')
    });
};
