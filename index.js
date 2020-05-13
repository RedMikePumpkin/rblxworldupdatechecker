var ps = require("./parsesettings")
var rv = require("./requestversion")
var db = require("./discordbot")
var fs = require("fs")
var moment = require("moment");
rv.settings = db.settings = ps()

var intIndex = -1
var intExec = moment()
var intTime = 5 * 60000
intExec.add(intTime, 'ms')

var stdin = process.openStdin()
stdin.on("data", (d) => {
  var cmd = d.toString().trim()

  !(0?()=>{}
    :(cmd === "c")?()=>{
      run()
    }
    :(cmd === "s")?()=>{
      if (intIndex !== -1) {
        console.log(
          "task already scheduled, next run in about",
          intExec.fromNow()
        )
      } else {
        var f = () => {
          console.log("scheduled run:")
          run().then(() => {
            intIndex = setTimeout(f, intTime)
            intExec = moment()
            intExec.add(intTime, 'ms')
          }).catch(console.error)
        }
        console.log("task scheduled successfully")
        f()
      }
    }
    :(cmd === "e")?()=>{
      if (intIndex === -1) {
        console.log("no tasks scheduled");
      } else {
        clearTimeout(intIndex);
        intIndex = -1;
        console.log("task canceled successfully")
      }
    }
    :(cmd === "q")?()=>{
      if (intIndex !== -1) {
        console.log("cancel the currently scheduled task before exiting")
      } else {
        console.log("cya!");
        process.exit(0);
      }
    }
    :() => {
      console.log("unknown command");
    }
  )()
});

function run() {
  console.log("start", moment().format('Y.MM.DD, HH:mm:ss.SSS [UTC]Z'))
  return new Promise((ye, nu) => {
    rv(fs.readFileSync("./lastver.txt").toString().trim()).then(a => db(...a)).then(a => {
      fs.writeFileSync("./lastver.txt", a[1] + "\n")
      console.log("end  ", moment().format('Y.MM.DD, HH:mm:ss.SSS [UTC]Z'))
      ye()
    }).catch(nu)
  })
}
