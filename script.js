// Clase Boss para almacenar información del jefe
class Boss {
  constructor(name, location, cooldown, photo) {
    this.name = name;
    this.location = location;
    this.cooldown = cooldown; // cooldown en segundos
    this.photo = photo;
  }
}

// Función para aplicar la escala de grises a la imagen
function applyGrayscale(img) {
  img.classList.add("grayscale");
}

// Función para quitar la escala de grises de la imagen
function removeGrayscale(img) {
  img.classList.remove("grayscale");
}

// Función para iniciar un temporizador
function startTimer(cooldown, container) {
  var display = document.createElement("div");
  display.className = "timerOverlay";

  var img = container.querySelector("img");
  applyGrayscale(img); // Aplicar escala de grises

  var interval = setInterval(function() {
    var hours = Math.floor(cooldown / 3600);
    var minutes = Math.floor((cooldown % 3600) / 60);
    var seconds = cooldown % 60;

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = hours + ":" + minutes + ":" + seconds;

    if (--cooldown < 0) {
      clearInterval(interval);
      display.textContent = "Alive";
      removeGrayscale(img); // Quitar escala de grises cuando el temporizador llega a cero
      img.classList.add("appeared");
    }
  }, 1000);

  // Eliminar el display del temporizador existente y agregar el nuevo
  var existingDisplay = container.querySelector(".timerOverlay");
  if (existingDisplay) {
    container.removeChild(existingDisplay);
  }
  container.appendChild(display);

  // Aplicar escala de grises nuevamente antes de iniciar el nuevo temporizador
  applyGrayscale(img);
}

// Función para crear elementos de temporizador para un jefe
function createTimerElement(boss) {
  const timerContainer = document.querySelector(".timerContainer");

  var bossDiv = document.createElement("div");
  bossDiv.className = "bossTimer";

  var bossName = document.createElement("p");
  bossName.textContent = boss.name;

  var bossImg = document.createElement("img");
  bossImg.src = boss.photo;

  var hoursLabel = createLabelElement("Hours");
  var cooldownHoursInput = createInputElement("number", Math.floor(boss.cooldown / 3600));
  var minutesLabel = createLabelElement("Minutes");
  var cooldownMinutesInput = createInputElement("number", Math.floor((boss.cooldown % 3600) / 60));

  var startButton = document.createElement("button");
  startButton.textContent = "Start";
  startButton.addEventListener("click", function() {
    var hours = parseInt(cooldownHoursInput.value);
    var minutes = parseInt(cooldownMinutesInput.value);
    var cooldown = hours * 3600 + minutes * 60 || boss.cooldown; // Usar el cooldown del jefe si no se ingresan horas o minutos
    startTimer(cooldown, bossDiv);
    var img = bossDiv.querySelector("img");
    applyGrayscale(img); // Aplicar escala de grises al iniciar el temporizador
  });

  // Agregar elementos al contenedor del temporizador
  bossDiv.appendChild(bossName);
  bossDiv.appendChild(bossImg);
  bossDiv.appendChild(hoursLabel);
  bossDiv.appendChild(cooldownHoursInput);
  bossDiv.appendChild(minutesLabel);
  bossDiv.appendChild(cooldownMinutesInput);
  bossDiv.appendChild(startButton);

  timerContainer.appendChild(bossDiv);
}

// Función para crear un elemento de entrada de datos
function createInputElement(type, value) {
  var input = document.createElement("input");
  input.type = type;
  input.value = value;
  return input;
}

// Función para crear un elemento de etiqueta
function createLabelElement(text) {
  var label = document.createElement("label");
  label.textContent = text;
  return label;
}

// Crear jefes iniciales
createTimerElement(new Boss("Examon", "Versandi Terminal", 14400, "https://i.imgur.com/kPbKfh9.png"));
createTimerElement(new Boss("Omegamon", "Versandi Terminal", 18000, "https://i.imgur.com/UoMhUwI.png"));
createTimerElement(new Boss("Myotismon", "Minato City", 7200, "https://i.imgur.com/knZbVKq.png"));
