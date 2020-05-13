var https = require("https")

module.exports = (last) => {
  return new Promise((ye, nu) => {
    if (!module.exports.settings) {
      nu(new Error("no settings loaded"))
    } else {
      https.get(module.exports.settings.project, (res) => {
    
        // console.log('statusCode:', res.statusCode)
        // console.log('headers:', res.headers)
    
        var data = ""
        res.on('data', (d) => {
          data += d
        });
        res.on("end", () => {
          var regex = new RegExp(module.exports.settings.regex, "gi")
          var result = data.match(regex)[0].replace(regex, "$1")
          console.log(result)
          ye([result, result === last])
        });
    
      }).on('error', (e) => {
        nu(e)
      })
    }
  });
};
