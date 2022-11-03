// Stworz aplikacje chat

// Stworz aplikacje chat, ktora zawiera okno chatu i formularz wpisywania wiadomosci.

// 1. Formularz powinien miec 2 inputy, pole author i pole message
// 2. Okno chatu, powinno wyswietlac wyslane wiadomosci wraz z jego autorem
// 3. Wiadomosci zapisz jako tablica obiektow i umiesc je w localStorage
// 4. Po wejsciu na strone, przeczytaj wiadomosci z localStorage i wyswietl w oknie chatu

// * Dodatkowe

// 5. Nad oknem chatu, zrob header z searchem (input + przycisk search). Po wcisnieciu przycisku, przefiltruj wiadomosci. Filtruj tylko po message.
// 6. Ostyluj zadanie zeby przypominalo realny chat :)
// 7. Odczytywanie i zapisywanie do localStorage stworz jako osobne funkcje, zapisz je w osobnych plikach i zaimportuj do glownego pliku chat.js

const addChatForm = document.querySelector('#addChatForm');
const addAuthor = document.querySelector('#addAuthor');
const addMessage = document.querySelector('#addMessage');
const chatWindow = document.querySelector('#chatWindow');
const searchForm = document.querySelector('#searchForm');
const searchInput = document.querySelector('#searchInput');
let messages = JSON.parse(localStorage.getItem('messages'));

if (messages === null) {
	messages = [];
}

messages.forEach((message) => {
	chatWindow.innerHTML += `
    <li>${message.authorValue}: ${message.messageValue}</li>`;
});

const handleSubmit = (event) => {
	event.preventDefault();
	const inputAuthorValue = addAuthor.value;
	const inputMessageValue = addMessage.value;

	chatWindow.innerHTML += `<li>${inputAuthorValue}: ${inputMessageValue}</li>`;
	messages.push({
		authorValue: inputAuthorValue,
		messageValue: inputMessageValue,
	});
	localStorage.setItem('messages', JSON.stringify(messages));

	addAuthor.value = '';
	addMessage.value = '';
};

const handleSearch = (event) => {
	event.preventDefault();
	const searchInputValue = searchInput.value;

	const searchResult = messages.filter((messageResult) => {
		return messageResult.messageValue.includes(searchInputValue);
	});

	if (searchResult.length !== 0) {
		searchResult.forEach((result) => {
			chatWindow.innerHTML = `<li> ${result.messageValue}</li>`;
		});
	} else {
		chatWindow.innerHTML = `Nie znaleziono wpisu`;
	}

	searchInput.value = '';
};

addChatForm.addEventListener('submit', handleSubmit);
searchForm.addEventListener('submit', handleSearch);
