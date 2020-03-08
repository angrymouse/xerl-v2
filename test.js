D3Node = require('d3-node');
let fs = require ('fs')
const canvasModule = require('canvas'); // supports node-canvas v1 & v2.x
const d3n = new D3Node({ canvasModule }); // pass it node-canvas
const canvas = d3n.createCanvas(960, 500);
const context = canvas.getContext('2d');
// draw on your canvas, then output canvas to png
let table = canvas.pngStream()
var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0)
    .context(context)
table.pipe(fs.createWriteStream("tbl.png"))