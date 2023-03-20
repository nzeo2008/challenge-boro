// Сохраненение данных в локальном хранилище
export const saveDataToLocalStorage = (token, data) => {
	const stringifyData = JSON.stringify(data);
	window.localStorage.setItem(token, stringifyData);
};

// Удаление данных из локального хранилища
export const removeDataFromLocalStorage = (token) => {
	window.localStorage.removeItem(token);
};

// Получение данных из локального хранилища по токену
export const getDataFromLocalStorage = (token) => {
	const stringifyData = window.localStorage.getItem(token);

	if (!stringifyData) {
		return null;
	}

	const data = JSON.parse(stringifyData);
	return data;
};
