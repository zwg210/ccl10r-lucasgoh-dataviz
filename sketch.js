let data;

function preload() {
  data = loadJSON("pose.json");
}


function setup() {
  createCanvas(windowWidth, windowHeight);
  for (let key in data) {
    console.log(key);
    console.log(data[key]);
  }
}



function draw() {
  background(200);
  let px = null;
  let py = null;
  fill(255, 0, 0);
  let n = data["bodypoints"]
  for (let key in n) {
    let x = n[key].x;
    let y = n[key].y;
    if (px != null && py != null) {
      line(px, py, x, y)
    }
    circle(x, y, 10);
    px = n[key].x;
    py = n[key].y;
  }
}
