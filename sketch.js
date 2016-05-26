var data;
var lineArray = ["hello", "world"];
var time = 3;
var rows = 30;

function preload() {
  data = loadStrings("data/pr0n.txt");
}

function setup() {
  //init lines
  for (i = 0; i < rows; i++) {
    lineArray.push(" ")
    var lineId = "line" + (rows - (i + 1)).toString();
    var line = createElement("pre", lineArray[i]);
    line.parent('#content').id(lineId);
  }

  for (i = 0; i <= data.length; i++) {
    printLine(data, i);
  }
}

function draw() {}

function printLine(data, i) {
  setTimeout(function () {

    //console.log(i + ": " + data[i]);

    var newLine = data[i];
    lineArray.unshift(newLine);
    lineArray.pop();

    for (i = 0; i < rows; i++) {

      var lineSelector = "#line" + (i).toString();
      select(lineSelector).html(lineArray[i]);

    }
  }, time * i);
}