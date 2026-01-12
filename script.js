const textInput = document.getElementById("textInput");
const voiceSelect = document.getElementById("voiceSelect");
const speakBtn = document.getElementById("speak");
const stopBtn = document.getElementById("stop");
const rateInput = document.getElementById("rate");
const pitchInput = document.getElementById("pitch");

let voices = [];
let utterance;

// Load voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = "";

    if (!voices.length) {
        voiceSelect.innerHTML = "<option>No voices available</option>";
        return;
    }

    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

speechSynthesis.onvoiceschanged = loadVoices;
loadVoices();

// Speak
function speakText() {
    if (!textInput.value.trim()) return;

    speechSynthesis.cancel();

    utterance = new SpeechSynthesisUtterance(textInput.value);
    utterance.voice = voices[voiceSelect.value];
    utterance.rate = rateInput.value;
    utterance.pitch = pitchInput.value;

    speechSynthesis.speak(utterance);
}

// Stop
function stopSpeech() {
    speechSynthesis.cancel();
}

// Restart on voice change
voiceSelect.addEventListener("change", () => {
    if (speechSynthesis.speaking) speakText();
});

speakBtn.addEventListener("click", speakText);
stopBtn.addEventListener("click", stopSpeech);
