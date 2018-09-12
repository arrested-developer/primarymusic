/* eslint-disable */

var AudioContext = window.AudioContext || window.webkitAudioContext;

var total = 0;

var drumSounds = {
  drum1: {
    url: "/assets/sounds/drums/kick-acoustic01.wav"
  },
  drum10: {
    url: "/assets/sounds/drums/kick-acoustic02.wav"
  },
  drum100: {
    url: "/assets/sounds/drums/tom-acoustic01.wav"
  },
  drum1000: {
    url: "/assets/sounds/drums/tom-acoustic02.wav"
  }
};

var soundContext = new AudioContext();

for (var key in drumSounds) {
  loadSound(key);
}

function loadSound(name) {
  var sound = drumSounds[name];
  var url = sound.url;
  var buffer = sound.buffer;

  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";

  xhr.onload = function() {
    soundContext = decodeAudioData(xhr.response, function(newBuffer) {
      sound.buffer = newBuffer;
    });
  };

  xhr.send();
}

function playSound(name, options) {
  var sound = drumSounds[name];
  var soundVolume = drumSounds[name].volume || 1;

  var buffer = sound.buffer;
  if (buffer) {
    var source = soundContext.createBufferSource();
    source.buffer = buffer;

    var volume = soundContext.createGain();

    if (options) {
      if (options.volume) {
        volume.gain.value = soundVolume * options.volume;
      }
    } else {
      volume.gain.value = soundVolume;
    }

    volume.connect(soundContext.destination);
    source.connect(volume);
    source.start(0);
  }
}

function drumTapped(points) {
  total = incrementTotal(points);
  switch (points) {
    case 1:
      playSound("drum1");
      break;
    case 10:
      playSound("drum10");
      break;
    case 100:
      playSound("drum100");
      break;
    case 1000:
      playSound("drum1000");
  }
}

function incrementTotal(num) {
  return (total += num);
}
// add to total
// plays a noise