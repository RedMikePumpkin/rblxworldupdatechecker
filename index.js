
var fs = require("fs");

var settings = fs.readFileSync("./url.txt").toString().trim().split("\n").map(i => i.trim());
settings = {
  project: settings[1],
  regex: new RegExp(settings[2], "gi"),
  bot: {
    type: settings[3].slice(0, 2),
    url: settings[3].slice(2)
  }
}
