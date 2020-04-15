const cp = require("child_process"),
    path = require("path"),
    wt = require("worker_threads")

let py = cp.spawn("python3", [path.join(__dirname, "main.py"), wt.workerData.il, wt.workerData.io], {cwd: __dirname})

py.stderr.on("data", d => {
    console.error(d.toString());
    process.exit(1)

})
