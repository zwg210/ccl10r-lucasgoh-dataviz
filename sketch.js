let fileLoaded, data, img;
let skinColours = [];
let numOfDancers;
let s;

function preload() {
  fileLoaded = loadJSON("poses.json");
  img = loadImage('stage.png');
  // s = loadSound('chinesesong.mp3');
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let key in data) {
    console.log(key);
    console.log(data[key])
  }
  colorMode(HSB);
  data = fileLoaded["poses"]
  for (let i = 0; i < 6; i++) {
    skinColours.push([int(random(30, 40)), int(random(40, 60)), int(random(60, 100)), int(random(360))]);
  }
  // s.play()
}

let indexes = [1, 1, 1, 1, 1, 1]
let idx = 0;
let startDancing = false;
function draw() {
  image(img, 0, 0, windowWidth, windowHeight);
  translate(-200, 0.4 * windowHeight);
  if (indexes[5] + 1 < data.length) {
    for (let i = 0; i < indexes.length; i++) {
      fill(skinColours[i][0], skinColours[i][1], skinColours[i][2]);
      stroke(skinColours[i][0], skinColours[i][1], skinColours[i][2])
      let n1 = data[indexes[i]].bodypoints;
      let n2 = data[indexes[i] + 1].bodypoints;
      push();
      // if (startDancing === true) {
      //   translate(noise(frameCount + i / 10), noise(frameCount + (i * 2) / 10));
      //   console.log("startdancing");
      // }
      translate(300 * i, 0);
      drawPerson(n1, n2, skinColours[i], i);
      pop();
    }
  }
  else {
    indexes = [0, 0, 0, 0, 0, 0];
  }
  if (frameCount % 16 === 0) {
    indexes[idx] += 1;
    idx += 1;
    if (idx === indexes.length) {
      idx = 0;
    }
  }
  if (frameCount === 49 * frameRate()) {
    startDancing = true
  }
}


function findP(bodypart, bodypoints, bodypoints2) {
  for (let key in bodypoints) {
    if (bodypoints[key].part === bodypart) {
      // if (frameCount % 10 === 0) {
      return [bodypoints[key].x, bodypoints[key].y];
      // }
      // else {
      //   return interpolatePosition(bodypoints[key].x, bodypoints[key].y, bodypoints2[key].x, bodypoints2[key].y);
      // }
    }
  }
}


function drawBody(p1, p2, p3, p4, c, i) {
  beginShape();
  vertex(p1[0], p1[1]);
  vertex(p2[0], p2[1]);
  vertex(p3[0], p3[1]);
  vertex(p4[0], p4[1]);
  endShape();
  drawDress(p1, p2, p3, p4, c, i);
}

function drawDress(p1, p2, p3, p4, c, i) {
  push();
  fill(c[3], c[1], c[2]);
  beginShape();
  vertex(p2[0], p2[1] + 20);
  vertex(p1[0], p1[1] + 20);
  vertex(p4[0] + 50, p4[1]);
  vertex(p3[0] - 50, p3[1]);
  endShape();
  push();
  fill(255, 30);
  translate(15, 60);
  for (let i = 0; i < 10; i++) {
    ellipse(0, 10, 4, 20);
    rotate(PI / 5);
  }
  pop();
  pop();
}

function drawPart(p1, p2) {
  push();
  strokeWeight(10);
  line(p1[0], p1[1], p2[0], p2[1]);
  pop();
}


function drawEye(p1) {
  push();
  fill(255);
  circle(p1[0], p1[1], 10);
  fill(0);
  circle(p1[0], p1[1], 5);
  pop();
}
function drawEar(p1) {
  circle(p1[0], p1[1], 10);
}


function drawFace(p1, p2, p3, p4, p5) {
  // drawEar(p4);
  // drawEar(p5);
  circle(p1[0], p1[1], 50); //code for face
  drawEye(p2);
  drawEye(p3);
}




function drawPerson(bodydata, bodydata2, c, i) {
  drawBody(findP("leftShoulder", bodydata, bodydata2), findP("rightShoulder", bodydata, bodydata2), findP("rightHip", bodydata, bodydata2), findP("leftHip", bodydata, bodydata2), c, i);
  drawPart(findP("leftShoulder", bodydata, bodydata2), findP("leftElbow", bodydata, bodydata2));
  drawPart(findP("rightShoulder", bodydata, bodydata2), findP("rightElbow", bodydata, bodydata2));
  drawPart(findP("leftElbow", bodydata, bodydata2), findP("leftWrist", bodydata, bodydata2));
  drawPart(findP("rightElbow", bodydata, bodydata2), findP("rightWrist", bodydata, bodydata2));
  drawPart(findP("leftHip", bodydata, bodydata2), findP("leftKnee", bodydata, bodydata2));
  drawPart(findP("rightHip", bodydata, bodydata2), findP("rightKnee", bodydata, bodydata2));
  drawPart(findP("leftKnee", bodydata, bodydata2), findP("leftAnkle", bodydata, bodydata2));
  drawPart(findP("rightKnee", bodydata, bodydata2), findP("rightAnkle", bodydata, bodydata2));
  drawFace(findP("nose", bodydata, bodydata2), findP("leftEye", bodydata, bodydata2), findP("rightEye", bodydata, bodydata2), findP("leftEar", bodydata, bodydata2), findP("rightEar", bodydata, bodydata2));
}


function mousePressed() {
  console.info([mouseX, mouseY]);
}


function interpolatePosition(x1, y1, x2, y2) {
  let resultX = lerp(x1, x2, (frameCount % 10) / 6);
  let resultY = lerp(x1, x2, (frameCount % 10) / 6);
  return [resultX, resultY];
}