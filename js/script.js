/**
 * @file script.js
 * @description Main script file for the Eventify 15 years old website
 * @version 21.03.25
 * @date 2025-03-21
 * */

// Interaction for the gallery
let modalElement = document.querySelector('#modal');
document
	.querySelector('.grid-gallery')
	.addEventListener('click', function (event) {
		if (event.target.tagName === 'IMG' && event.type === 'click') {
			// Replace src of the image in .zoom-img with the src of the clicked image
			modalElement.src = event.target.src;
		}
	});

document
	.querySelector('.grid-gallery')
	.addEventListener('touchstart', function (event) {
		if (event.target.tagName === 'IMG' && event.type === 'touchstart') {
			// Replace src of the image in .zoom-img with the src of the clicked image
			modalElement.src = event.target.src;
		}
	});

// Load the family name, counts and message from the URL
let familyElement = document.querySelector('#family');
let countsElement = document.querySelector('#counts');
let messageElement = document.querySelector('#message');

let params = new URLSearchParams(window.location.search);
let family = params.get('f');
let adults = params.get('a');
let childs = params.get('c');
let message = params.get('m');

familyElement.textContent = `Fam. ${family || 'Doe'}`;
countsElement.textContent = `Adultos: ${adults || 0} ${
	childs ? `Niños: ${childs}` : ''
}`;
messageElement.textContent = message || '¡Gracias por acompañarme!';

// Open the maps app when the address is clicked

const dialog = document.querySelector('#mapDialog');
const btnCloseDialog = document.querySelector('#closeDialog');

btnCloseDialog.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();
	closeDialog();
});

window.openMaps = function (lat, lng) {
	const isIOS =
		/iPad|iPhone|Mac/.test(navigator.userAgent) && !window.MSStream;
	const isAndroid = /Android/.test(navigator.userAgent);

	// Map apps options
	const options = [
		{
			name: 'Google Maps',
			icon: './assets/svg/google-maps.svg',
			url: `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`,
		},
		{
			name: 'Apple Maps',
			icon: './assets/svg/apple-maps.svg',
			url: `https://maps.apple.com/?q=${lat},${lng}`,
			onlyIOS: true,
		},
		{
			name: 'Waze',
			icon: './assets/svg/waze.svg',
			url: `https://waze.com/ul?ll=${lat},${lng}&navigate=yes`,
		},
	];

	let availableOptions = options.filter((opt) => !opt.onlyIOS || isIOS);

	// Get map container
	let mapOptions = document.querySelector('#mapOptions');
	mapOptions.innerHTML = '';

	// Create buttons for each available option
	availableOptions.forEach((opt) => {
		let button = document.createElement('button');
		let icon = document.createElement('img');
		icon.src = opt.icon;
		icon.alt = opt.name;

		button.appendChild(icon);
		button.className = 'btn__icon';
		button.addEventListener('click', () => {
			window.open(opt.url, '_blank');
			closeDialog();
		});
		mapOptions.appendChild(button);
	});

	dialog.showModal();

	// let choice = prompt(
	// 	'¿Con qué aplicación deseas abrir la ubicación?\n\n' +
	// 		availableOptions.map((opt, i) => `${i + 1}. ${opt.name}`).join('\n')
	// );

	// if (choice && !isNaN(choice)) {
	// 	let selectedOption = availableOptions[parseInt(choice) - 1];
	// 	if (selectedOption) {
	// 		window.open(selectedOption.url, '_blank');
	// 	}
	// }
};

function closeDialog() {
	dialog.close();
}
