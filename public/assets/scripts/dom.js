// disable scrolling
bodyScrollLock.disableBodyScroll();

// launch games
document.querySelector("#timed").addEventListener("click", () => timedMode());
document
  .querySelector("#twoPlayer")
  .addEventListener("click", () => alert("Coming Soon!"));

// assign webkitAudioContext to AudoContext if browser is Safari :)
const AudioContext = window.AudioContext || window.webkitAudioContext;

const drumSounds = {
  drum1: {
    url: "/assets/sounds/drums/hihat.wav"
  },
  drum10: {
    url: "/assets/sounds/drums/bongo.wav"
  },
  drum100: {
    url: "/assets/sounds/drums/snare.wav"
  },
  drum1000: {
    url: "/assets/sounds/drums/kick.wav"
  }
};

const soundContext = new AudioContext();

for (const key in drumSounds) {
  loadSound(key);
}

function loadSound(name) {
  const sound = drumSounds[name];
  const url = sound.url;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.responseType = "arraybuffer";

  xhr.onload = () => {
    soundContext.decodeAudioData(xhr.response, newBuffer => {
      sound.buffer = newBuffer;
    });
  };

  xhr.send();
}

//eslint-disable-next-line no-unused-vars
function playSound(name, options) {
  const sound = drumSounds[name];
  const soundVolume = drumSounds[name].volume || 1;

  const buffer = sound.buffer;
  if (buffer) {
    const source = soundContext.createBufferSource();
    source.buffer = buffer;

    const volume = soundContext.createGain();

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

// register service worker
if ("serviceWorker" in navigator) {
  // register service worker
  navigator.serviceWorker.register("/service-worker.js");
}
