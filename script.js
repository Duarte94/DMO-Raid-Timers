const backendURL = 'https://dmott-cbo0uxprd-devas-projects-20feeb98.vercel.app';

async function startTimer(index) {
  let hours = parseInt(document.getElementById('hours' + index).value);
  let minutes = parseInt(document.getElementById('minutes' + index).value);
  let duration = (hours * 60 * 60 + minutes * 60) * 1000;

  try {
    const response = await fetch(`${backendURL}/start-timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index, duration })
    });

    if (!response.ok) {
      throw new Error('Failed to start timer');
    }

    const data = await response.json();
    console.log('Timer started:', data);

    const endTime = data.endTime;

    // Resto del código para manejar el temporizador...
  } catch (error) {
    console.error('Error starting timer:', error);
  }
}

async function resetTimer(index) {
  try {
    const response = await fetch(`${backendURL}/stop-timer`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ index })
    });

    if (!response.ok) {
      throw new Error('Failed to stop timer');
    }

    const data = await response.json();
    console.log('Timer stopped:', data);

    // Resto del código para detener el temporizador...
  } catch (error) {
    console.error('Error stopping timer:', error);
  }
}
