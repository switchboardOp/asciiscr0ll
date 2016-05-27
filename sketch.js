var data, rows;
var lineArray = [];
var index = 0;
var run = false;

//modify these as needed
var fr = 30;
var lineheight = 15;

function preload() {
  data = loadStrings("data/pr0n.txt");
}

function setup() {
  frameRate(fr);
  
  button = createButton('- let the good times scroll -');
  button.mousePressed(initLines);
  
  // file input
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    input = createFileInput(process);
    input.id("userData");
  }
}

function process(file) {
  data = file.data.split("\n");
  initLines();
}

function draw() {
    if (run == true) {
      printLine(data, index);
      index++;
      if ( index >= data.length ) { index = 0; }
    }
}

function printLine(data, i) {
    lineArray.unshift(data[i]);
    lineArray.pop();
    for (i = 0; i < rows; i++) {
      var lineSelector = "#line" + (i).toString();
      select(lineSelector).html(lineArray[i]);
    }
}

function initLines(){
  // clear the DOM
  select('#about').remove();
  button.remove();
  input.remove();
  run = true;
  
  //initialize the DOM for scrollin'
  rows = ceil(displayHeight/lineheight);
  for (i = 0; i <= rows; i++) {
    lineArray.push(" ")
    var lineId = "line" + (rows - (i+1)).toString();
    line = createElement("pre", lineArray[i]);
    line.parent('#scroll').id(lineId);
    line.style("line-height", lineheight + "px");
  }
}