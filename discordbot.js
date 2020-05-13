var https = require("https")
var moment = require("moment")
var url = require("url")

module.exports = (version, run) => {
  return new Promise((ye, nu) => {
    if (run) return ye([false, version])
    if (!module.exports.settings) {
      nu(new Error("no settings loaded"))
    } else {
      if (module.exports.settings.botType === "bot") {
        nu(new Error("no"))
      } else if (module.exports.settings.botType === "hook") {
        var data = {
          "embeds": [
            {
              "title": `${module.exports.settings.title} has been updated!`,
              "description": `Current version is now \`${version}\``,
              "url": module.exports.settings.project,
              "color": parseInt(module.exports.settings.color, 16),
              "author": {
                "name": moment().format('Y.MM.DD, HH:mm:ss.SS [UTC]Z')
              },
              "footer": {
                "text": module.exports.settings.footer
              }
            }
          ]
        }
        var urlParse = url.parse(module.exports.settings.bot)
        var bodyText = JSON.stringify(data)
        var options = {
          host: urlParse.hostname,
          port: urlParse.port,
          path: urlParse.path,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': bodyText.length,
          }
        }
        var req = https.request(options, (res) => {
          // console.log('statusCode:', res.statusCode);
          // console.log('headers:', res.headers);

          var data = ""
          res.on('data', (d) => {
            data += d
          });
          res.on("end", () => {
            ye([true, version, data])
          })

          req.on('error', (e) => {
            nu(e)
          });
        });
        req.write(bodyText)
        req.end()
      } else {
        nu(new Error("invalid botType"))
      }
    } 
  });
};
