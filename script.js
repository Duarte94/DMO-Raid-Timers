// URL del backend en Vercel
const backendURL = 'https://dmott-cbo0uxprd-devas-projects-20feeb98.vercel.app';

// Array para almacenar los intervalos de los temporizadores
let timers = [null, null, null];

// Función para iniciar el temporizador
async function startTimer(index) {
  // Obtener los valores de horas y minutos del formulario
  let hours = parseInt(document.getElementById('hours' + index).value);
  let minutes = parseInt(document.getElementById('minutes' + index).value);

  // Calcular la duración en milisegundos
  let duration = (hours * 60 * 60 + minutes * 60) * 1000;

  try {
    // Hacer una solicitud POST al backend para iniciar el temporizador
    const response = await fetch(`${backendURL}/start-timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index: index, duration: duration })
    });

    if (!response.ok) {
      throw new Error('Failed to start timer');
    }

    // Obtener la respuesta JSON del backend
    const data = await response.json();
    console.log('Timer started:', data);

    // Guardar el tiempo de finalización del temporizador
    const endTime = data.endTime;

    // Si ya hay un temporizador activo, detenerlo
    if (timers[index - 1]) {
      clearInterval(timers[index - 1]);
    }

    // Iniciar un intervalo para actualizar el temporizador en la interfaz de usuario
    timers[index - 1] = setInterval(function () {
      const now = Date.now();
      const distance = endTime - now;

      if (distance < 0) {
        clearInterval(timers[index - 1]);
        document.getElementById('display' + index).innerText = "00:00:00";
        return;
      }

      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      document.getElementById('display' + index).innerText =
        (hours < 10 ? "0" : "") + hours + ":" +
        (minutes < 10 ? "0" : "") + minutes + ":" +
        (seconds < 10 ? "0" : "") + seconds;
    }, 1000);

  } catch (error) {
    console.error('Error starting timer:', error);
  }
}

// Función para detener el temporizador
async function resetTimer(index) {
  try {
    // Hacer una solicitud POST al backend para detener el temporizador
    const response = await fetch(`${backendURL}/stop-timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index: index })
    });

    if (!response.ok) {
      throw new Error('Failed to stop timer');
    }

    // Obtener la respuesta JSON del backend
    const data = await response.json();
    console.log('Timer stopped:', data);

    // Limpiar el intervalo y restablecer el temporizador en la interfaz de usuario
    clearInterval(timers[index - 1]);
    document.getElementById('display' + index).innerText = "00:00:00";

  } catch (error) {
    console.error('Error stopping timer:', error);
  }
}
