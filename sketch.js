var data, rows, run;
var lineArray = [];
var index = 0;
var paused = false;

//modify these as needed
var fr = 30;
var lineheight = 15;

function preload() {
  data = loadStrings("data/pr0n.txt");
}

function setup() {
  frameRate(fr);
  initMenu();

  button = createButton('- let the good times scroll -');
  button.mousePressed(initLines);
  button.parent('menu');
  
  // file input, passes file to process()
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    input = createFileInput(process);
    input.parent('menu');
  }
}

function initMenu() {
  run = false;
  noLoop();
  select("#menu").show();
  //button.show();
  //input.show();
}

function process(file) {
  var re = /(\.txt)$/i;
  if(!re.exec(file.name)){
    alert("Only .TXT files are currently supported.");
  } else {
    data = file.data.split("\n");
    initLines();
  }
  index = 0;
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
  // clear the Menu
  select('#menu').hide();
  
  //initialize the DOM for scrollin'
  rows = ceil(displayHeight/lineheight);
  for (i = 0; i <= rows; i++) {
    lineArray.push(" ")
    var lineId = "line" + (rows - (i+1)).toString();
    line = createElement("pre", lineArray[i]);
    line.parent('#scroll').id(lineId);
    line.style("line-height", lineheight + "px");
  }
  run = true;
  loop();
}

// pausing is weird on mobile
// function touchStarted() {noLoop(); paused = true;}
// function touchEnded() {loop(); paused = false;}

function keyPressed() {
  //console.log(key);
  // pause with P or spacebar
  if (key == "P" || key == " ") {
    if (paused == false) {
      paused = true;
      noLoop();
    } else if (paused == true) {
      paused = false;
      loop();
    }
  }
  
  // change framerate with arrows (might be buggy)
  if (key == "&") {
    fr++;
    frameRate(fr);
  } else if (key == "(") {
    fr--;
    frameRate(fr);
  }
  // go back to menu
  if (key == "X") {
    if (run == true) {
      initMenu();
    } else if (run == false) {
      initLines();
    }
  }
}
