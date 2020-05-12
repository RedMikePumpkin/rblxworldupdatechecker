var https = require("https");

module.exports = () => {
  return new Promise((ye, nu) => {
    if (!settings) {
      nu(new Error("no settings loaded"))
    } else {
      https.get(settings.project, (res) => {
    
        // console.log('statusCode:', res.statusCode);
        // console.log('headers:', res.headers);
    
        var data = "";
        res.on('data', (d) => {
          data += d;
        });
        res.on("end", () => {
          ye(data.match(settings.regex)[0].replace(settings.regex, "$1"));
        });
    
      }).on('error', (e) => {
        nu(e);
      })
    });
    }
}

module.exports.settings = settings;
