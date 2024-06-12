const backendURL = 'https://dmott-cbo0uxprd-devas-projects-20feeb98.vercel.app/';

let timers = [null, null, null];

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

    if (timers[index - 1]) {
      clearInterval(timers[index - 1]);
    }

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

    clearInterval(timers[index - 1]);
    document.getElementById('display' + index).innerText = "00:00:00";

  } catch (error) {
    console.error('Error stopping timer:', error);
  }
}
