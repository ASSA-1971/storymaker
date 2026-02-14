// word lists for both modes
// classic is straight from the toy, alt is a space adventure set i made up

var classic = [
  ["The turkey", "mom", "Dad", "The dog", "my teacher", "The elephant", "the cat"],
  ["sat on", "ate", "danced with", "saw", "doesnt like", "kissed"],
  ["a funny", "a scary", "a goofy", "a slimy", "a barking", "a fat"],
  ["goat", "monkey", "fish", "cow", "frog", "bug", "worm"],
  ["on the moon", "on the chair", "in my spaghetti", "in my soup", "on the grass", "in my shoes"]
];

var alt = [
  ["The astronaut", "a robot", "The alien", "captain zara", "professor blob", "the dragon"],
  ["launched into", "zapped", "hugged", "tripped over", "discovered", "skateboarded past"],
  ["a sparkly", "a wobbly", "a gigantic", "a sneaky", "a glowing", "a frozen"],
  ["spaceship", "planet", "comet", "black hole", "asteroid", "nebula"],
  ["in a wormhole", "on mars", "behind saturn", "at warp speed", "near a black hole", "inside a nebula"]
];

var idx = [0, 0, 0, 0, 0];
var mode = "classic";
var words = classic;


function setup() {
  for (var i = 0; i < 5; i++) {
    makeDots(i);
    updateCol(i);
  }
  refreshPreview();
}

// builds the little indicator dots at the bottom of each column
function makeDots(col) {
  var box = document.getElementById("dt" + col);
  box.innerHTML = "";
  for (var i = 0; i < words[col].length; i++) {
    var d = document.createElement("span");
    d.className = i === idx[col] ? "dot on" : "dot";
    box.appendChild(d);
  }
}

function updateCol(col) {
  document.getElementById("wt" + col).textContent = words[col][idx[col]];

  var allDots = document.getElementById("dt" + col).querySelectorAll(".dot");
  allDots.forEach(function(d, i) {
    d.className = i === idx[col] ? "dot on" : "dot";
  });
}

function cycleWord(col) {
  idx[col] = (idx[col] + 1) % words[col].length;
  updateCol(col);
  refreshPreview();
  document.getElementById("storybox").classList.remove("show");
}

function refreshPreview() {
  for (var i = 0; i < 5; i++) {
    document.getElementById("pw" + i).textContent = words[i][idx[i]];
  }
}

function showStory() {
  var out = document.getElementById("storyout");
  out.innerHTML =
    '<span class="s0">' + words[0][idx[0]] + '</span> ' +
    '<span class="s1">' + words[1][idx[1]] + '</span> ' +
    '<span class="s2">' + words[2][idx[2]] + '</span> ' +
    '<span class="s3">' + words[3][idx[3]] + '</span> ' +
    '<span class="s4">' + words[4][idx[4]] + '</span>.';

  var box = document.getElementById("storybox");
  box.classList.remove("show");
  void box.offsetWidth;
  box.classList.add("show");
  box.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function randomStory() {
  for (var i = 0; i < 5; i++) {
    idx[i] = Math.floor(Math.random() * words[i].length);
    updateCol(i);
  }
  refreshPreview();
  showStory();
}

function playbackStory() {
  if (!window.speechSynthesis) {
    alert("sorry, your browser doesnt support speech");
    return;
  }
  var sentence = words[0][idx[0]] + " " + words[1][idx[1]] + " " + words[2][idx[2]] + " " + words[3][idx[3]] + " " + words[4][idx[4]] + ".";
  window.speechSynthesis.cancel();
  var u = new SpeechSynthesisUtterance(sentence);
  u.rate = 0.88;
  u.pitch = 1.15;
  u.lang = "en-US";
  window.speechSynthesis.speak(u);
}

function switchMode() {
  if (mode === "classic") {
    mode = "alt";
    words = alt;
    document.getElementById("altbtn").textContent = "classic words";
  } else {
    mode = "classic";
    words = classic;
    document.getElementById("altbtn").textContent = "alt words";
  }
  idx = [0, 0, 0, 0, 0];
  for (var i = 0; i < 5; i++) {
    makeDots(i);
    updateCol(i);
  }
  refreshPreview();
  document.getElementById("storybox").classList.remove("show");
}

function resetToy() {
  idx = [0, 0, 0, 0, 0];
  for (var i = 0; i < 5; i++) {
    updateCol(i);
  }
  refreshPreview();
  document.getElementById("storybox").classList.remove("show");
}

setup();

