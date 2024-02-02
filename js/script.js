const TEXT_LIST_DEFAULT = 'Список фильмов пуст...';
const STORAGE_LABEL_FILMS = 'films';

const inputNameFilmNode = document.getElementById('inputNameFilm');
const addFilmButtonNode = document.getElementById('addFilmButton');
const textFilmNameNode = document.getElementById('textFilmName');
const filmListHtmlNode = document.getElementById('filmListHtml');

let films = [];

init();

newFunction();

addFilmButtonNode.addEventListener('click', function () {
	const movie = getFilmFromUser();

	if (!movie.title) {
		return;
	}

	trackMovie(movie);

	renderFilmsList(films);

	clearInput(inputNameFilmNode);
});

function newFunction() {
	const getFilmsFromStorageString = localStorage.getItem(STORAGE_LABEL_FILMS);
	const getFilmsFromStorage = JSON.parse(getFilmsFromStorageString);
	films = [];
	if (Array.isArray(getFilmsFromStorage)) {
		films = getFilmsFromStorage;
	}

	renderFilmsList(films);
}

function getFilmFromUser() {
	const title = inputNameFilmNode.value.trim();

	const complited = false;

	const newMovie = { title: title, complited: complited };

	return newMovie;
}

function saveFilmsToLocStorage() {
	const movieToString = JSON.stringify(films);
	localStorage.setItem(STORAGE_LABEL_FILMS, movieToString);

	return movieToString;
}

function trackMovie(movie) {
	films.push(movie);

	saveFilmsToLocStorage();
}

function clearInput(input) {
	input.value = '';
}

function renderFilmsList(films) {
	let elementListHTML = '';

	films.forEach((elem, index) => {
		const elementHTML = getElementHTML(elem, index);
		elementListHTML += elementHTML;
	});

	filmListHtmlNode.innerHTML = elementListHTML;

	if (films.length == 0) {
		filmListHtmlNode.innerText = TEXT_LIST_DEFAULT;
	}
}

function getElementHTML(films, index) {
	return `
		<li class="list-films__item ${films.complited ? 'list-films__item--bg' : ''}">
			<input
				id="inputCheckMovies"
				class="list-films__input"
				type="checkbox"
			/>
			<label data-type="toggle" data-index="${index}" class="${
		films.complited ? 'label--checked' : ''
	}" for="inputCheckMovies"></label>
			<p id="textFilmName" class="list-films__text ${
				films.complited ? 'list-films--line-throgh' : ''
			}">${films.title}</p>
			<div data-type="remove" data-index="${index}" class="list-films__image-close">
				<img
					data-type="remove"
					data-index="${index}"
					class="list-films__icon-close"
					src="./images/close.svg"
					alt="кнопка удалить из списка"
					/>
					</div>
					</li>`;
}

filmListHtmlNode.addEventListener('click', function (event) {
	if (event.target.dataset.index) {
		const index = parseInt(event.target.dataset.index);
		const type = event.target.dataset.type;
		console.log(index);
		console.log(type);

		if (type === 'toggle') {
			films[index].complited = !films[index].complited;
			saveFilmsToLocStorage();
		} else if (type === 'remove') {
			films.splice(index, 1);
			saveFilmsToLocStorage();
		}
	}

	renderFilmsList(films);
});

function init() {
	filmListHtmlNode.innerText = TEXT_LIST_DEFAULT;
}

// function createElementList(movieTitle) {
// 	const elementLi = document.createElement('li');
// 	elementLi.classList.add('list-films__item');

// 	const elementInput = document.createElement('input');
// 	elementInput.setAttribute('id', 'inputCheckMovies');
// 	elementInput.classList.add('list-films__input');
// 	elementInput.setAttribute('type', 'checkbox');

// 	const elementLabel = document.createElement('label');
// 	elementLabel.setAttribute('for', 'inputCheckMovies');

// 	const elementParagraph = document.createElement('p');
// 	elementParagraph.setAttribute('id', 'textFilmName');
// 	elementParagraph.classList.add('list-films__text');
// 	elementParagraph.textContent = `${movieTitle}`;

// 	const elementDiv = document.createElement('div');
// 	elementDiv.classList.add('list-films__image-close');

// 	const elementImage = document.createElement('img');
// 	elementImage.classList.add('list-films__icon-close');
// 	elementImage.src = './images/close.svg';
// 	elementImage.setAttribute('alt', 'кнопка удалить из списка');

// 	const divImg = elementDiv.prepend(elementImage);
// 	console.log(divImg);

// 	const fullElement = elementLi.append(elementInput);
// 	console.log(fullElement);

// 	return fullElement;
// }
