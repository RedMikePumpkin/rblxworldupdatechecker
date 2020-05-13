
var fs = require("fs")

module.exports = () => {
  var settings = fs.readFileSync("./url.txt").toString().trim().split("\n").map(i => i.trim())
  var res = {}
  settings.forEach(i => {
    if (i[0] === "#") return
    var splitData = i.split(":")
    var propName = splitData.shift().trim()
    var propData = splitData.join(":").trim()
    res[propName] = propData
  });
  
  return res
}
