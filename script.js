// Your script here.
const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speakBtn");
const stopBtn = document.getElementById("stopBtn");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");

let voices = [];
let utterance;

// Load available voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    if (voices.length === 0) {
        const option = document.createElement("option");
        option.textContent = "No voices available";
        voiceSelect.appendChild(option);
        return;
    }

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Some browsers load voices asynchronously
speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Speak function
function speakText() {
    if (!textInput.value.trim()) {
        alert("Please enter text to speak.");
        return;
    }

    speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = rateInput.value;
    utterance.pitch = pitchInput.value;

    speechSynthesis.speak(utterance);
}

// Stop speech
function stopSpeech() {
    speechSynthesis.cancel();
}

// Restart speech if voice changes mid-speech
voiceSelect.addEventListener("change", () => {
    if (speechSynthesis.speaking) {
        speakText();
    }
});

// Button listeners
speakBtn.addEventListener("click", speakText);
stopBtn.addEventListener("click", stopSpeech);
