let container = document.querySelector('.conteo');
let dateEvent = new Date('2025-05-03T07:00:00');

/**
 * @param {Date} endTime
 * @returns {Object} - Object with the time remaining until the end time is reached in difference, days, hours, minutes and seconds
 */
function getTimeRemaining(endTime) {
	let dateNow = new Date();
	let diff = endTime - dateNow;

	if (diff < 0) {
		return {
			difference: diff,
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
		};
	}

	let days = Math.floor(diff / (1000 * 60 * 60 * 24));
	let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
	let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
	let seconds = Math.floor((diff % (1000 * 60)) / 1000);

	return {
		difference: diff,
		days: days,
		hours: hours,
		minutes: minutes,
		seconds: seconds,
	};
}

function updateCountdown() {
	let time = getTimeRemaining(dateEvent);
	let days = time.days;
	let hours = time.hours;
	let minutes = time.minutes;
	let seconds = time.seconds;

	container.innerHTML = `
        <div class="conteo__item">
            <p class="value">${days}</p>
            <p class="key">Días</p>
        </div>
        <div class="conteo__item">
            <p class="value">${hours}</p>
            <p class="key">Horas</p>
        </div>
        <div class="conteo__item">
            <p class="value">${minutes}</p>
            <p class="key">Minutos</p>
        </div>
        <div class="conteo__item">
            <p class="value">${seconds}</p>
            <p class="key">Segundos</p>
        </div>
    `;

	if (time.difference <= 0) {
		clearInterval(interval);
		container.innerHTML = '<p class="text-1 party">¡Ya es el día!</p>';
	}
}

var interval = setInterval(updateCountdown, 1000);
