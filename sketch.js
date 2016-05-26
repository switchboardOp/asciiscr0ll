var data;
var lineArray = [];
var index = 0;

//modify these as needed
var rows = 30;
var fr = 30;
var lineheight = 15;

function preload() {
  data = loadStrings("data/pr0n.txt");
}

function setup() {
  frameRate(fr);
  //init lines
  rows = displayHeight/lineheight;
  for (i = 0; i < rows; i++) {
    lineArray.push(" ")
    var lineId = "line" + (rows - (i + 1)).toString();
    var line = createElement("pre", lineArray[i]);
    line.parent('#scroll').id(lineId);
    line.style("line-height", lineheight + "px");
  }
}

function draw() {
    printLine(data, index);
    index++;
    if ( index >= data.length ) { index = 0; }
}

function printLine(data, i) {
    lineArray.unshift(data[i]);
    lineArray.pop();
    for (i = 0; i < rows; i++) {
      var lineSelector = "#line" + (i).toString();
      select(lineSelector).html(lineArray[i]);
    }
}