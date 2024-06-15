var timers = [null];

function startTimer(index) {
  var hours = parseInt(document.getElementById('hours' + index).value);
  var minutes = parseInt(document.getElementById('minutes' + index).value);
  var duration = (hours * 60 * 60 + minutes * 60) * 1000;
  var endTime = new Date().getTime() + duration;

  if (timers[index - 1]) {
    clearInterval(timers[index - 1]);
  }

  timers[index - 1] = setInterval(function() {
    var now = new Date().getTime();
    var distance = endTime - now;

    if (distance < 0) {
      clearInterval(timers[index - 1]);
      document.getElementById('display' + index).innerText = "00:00:00";

      // Reproducir alarma
      playAlarm();
      
      return;
    }

    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('display' + index).innerText = 
      (hours < 10 ? "0" : "") + hours + ":" + 
      (minutes < 10 ? "0" : "") + minutes + ":" + 
      (seconds < 10 ? "0" : "") + seconds;
  }, 1000);
}

function resetTimer(index) {
  clearInterval(timers[index - 1]);
  document.getElementById('display' + index).innerText = "00:00:00";
  
  // Para pausar la alarma si está sonando
  var alarmSound = document.getElementById('alarm');
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

function playAlarm() {
  var alarmSound = new Audio('digivicesound.mp3');
  alarmSound.play();
}
