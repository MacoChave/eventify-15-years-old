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

let familyElement = document.querySelector('#family');
let countsElement = document.querySelector('#counts');
let messageElement = document.querySelector('#message');

let params = new URLSearchParams(window.location.search);
let family = params.get('f');
let adults = params.get('a');
let childs = params.get('c');
let message = params.get('m');

familyElement.textContent = `Fam. ${family || 'Doe'}`;
countsElement.textContent = `Adultos: ${adults || 0}`;

if (childs) {
  countsElement.textContent += ` Niños: ${childs}`
}

messageElement.textContent = message || '¡Gracias por acompañarnos!';
