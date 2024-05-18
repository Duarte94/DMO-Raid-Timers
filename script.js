// Boss parameters
var bosses = [];

class Boss {
  constructor(name, location, cooldown, photo) {
    this.name = name;
    this.location = location;
    this.cooldown = cooldown; // cooldown in seconds
    this.photo = photo;
  }

  displayInfo() {
    console.log(`${this.name}`);
    console.log(`${this.location}`);
    console.log(`${this.cooldown}`);
    console.log(`${this.photo}`);
  }
}

// Boss creation function
function createBoss(name, location, cooldown, photo) {
  var newBoss = new Boss(name, location, cooldown, photo);
  bosses.push(newBoss);
  createTimerElement(newBoss);
}

// Function to start a timer
function startTimer(duration, display, bossImg) {
  let timer = duration, hours, minutes, seconds;
  const interval = setInterval(function () {
    hours = parseInt(timer / 3600, 10);
    minutes = parseInt((timer % 3600) / 60, 10);
    seconds = parseInt(timer % 60, 10);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      display.textContent = "Appeared";
      bossImg.classList.add("appeared");
    }
  }, 1000);

  // Función para reiniciar el temporizador
  function resetTimer() {
    clearInterval(interval);
    display.textContent = formatTime(duration);
    bossImg.classList.remove("appeared"); // Remover la clase "appeared"
  }

  // Al hacer clic en el botón de reset, llamar a la función para reiniciar el temporizador
  bossImg.addEventListener("click", resetTimer);
}

// Función para formatear el tiempo
function formatTime(time) {
  let hours = Math.floor(time / 3600);
  let minutes = Math.floor((time % 3600) / 60);
  let seconds = time % 60;

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

// Function to create timer elements for a boss
function createTimerElement(boss) {
  const timerContainer = document.querySelector(".timerContainer");

  var bossDiv = document.createElement("div");
  bossDiv.className = "bossTimer";

  var bossName = document.createElement("p");
  bossName.textContent = boss.name;

  var bossImg = document.createElement("img");
  bossImg.src = boss.photo;

  var bossTime = document.createElement("div");
  bossTime.className = "timerOverlay";
  startTimer(boss.cooldown, bossTime, bossImg); 

  var bossReset = document.createElement("button");
  bossReset.textContent = "Reset";
  bossReset.addEventListener("click", function() {
    // Desactivar el botón de reset mientras el temporizador está en funcionamiento
    bossReset.disabled = true;
    
    startTimer(boss.cooldown, bossTime, bossImg);
    
    // Habilitar el botón de reset después de un breve retraso para evitar múltiples clics
    setTimeout(function() {
      bossReset.disabled = false;
    }, 1000);
    
    bossImg.classList.remove("appeared"); // Asegurar que al reiniciar se elimine la clase "appeared"
  });

  bossDiv.appendChild(bossName);
  bossDiv.appendChild(bossImg);
  bossDiv.appendChild(bossTime);
  bossDiv.appendChild(bossReset);

  timerContainer.appendChild(bossDiv);
}

// Create initial bosses
createBoss("Examon", "Versandi Terminal", 14400, "https://i.imgur.com/kPbKfh9.png");
createBoss("Omegamon", "Versandi Terminal", 18000, "https://i.imgur.com/UoMhUwI.png");
createBoss("Myotismon", "Minato City", 7200, "https://i.imgur.com/knZbVKq.png");