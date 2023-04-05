// Разбивает массив на страницы
export const splitByPages = (data, start, end) => {
	return data.slice(start, end);
};

// Прокручивает страницу вверх
export const moveToUp = () => {
	window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Сортирует данные в зависимости от порядка (ASC или DESC)
// и от типа входных данных (String | Number)
export const sortData = (data, key, order) => {
	if (order === 'DESC') {
		return data.sort((a, b) => {
			if (typeof a[key] === 'string' && typeof b[key] === 'string') {
				return b[key].localeCompare(a[key]);
			} else {
				return b[key] - a[key];
			}
		});
	}
	if (order === 'ASC') {
		return data.sort((a, b) => {
			if (typeof a[key] === 'string' && typeof b[key] === 'string') {
				return a[key].localeCompare(b[key]);
			} else {
				return a[key] - b[key];
			}
		});
	}
};

// Форматирование даты в удобочитаемый формат
export const getDateFromTimestamp = (timestamp) => {
	const intTimestamp = Number.parseInt(timestamp);
	const date = new Date(intTimestamp);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString();
	const formattedDate = `${day}-${month}-${year} г.`;
	return formattedDate;
};

// Устанавливает поле checked у radiobutton
export const setRadioButtonCheckedProp = (
	property,
	value,
	checkedValue,
	isChecked
) => {
	const radioButton = isChecked
		? document.querySelector(`input[${property}=${value}]:checked`)
		: document.querySelector(`input[${property}=${value}]`);

	if (radioButton) {
		radioButton.checked = checkedValue;
	}
};

// Делит путь image на части и достаёт имя файла
// Добавляет поле name к каждому объекту из массива
export function extractImageName(data) {
	for (let object of data) {
		let [, name] = object.image.split('/');
		object.name = name;
	}
	return data;
}

// Функция для формирования диапазон значений
export function range(start, end) {
	return Array(end - start + 1)
		.fill()
		.map((_, idx) => start + idx);
}

// Функция для перевода из байт в килобайт
export function getSize(filesize) {
	return (parseInt(filesize) / 1000).toFixed(2) + ' kB';
}

// Функция разбивки входных данных по категориям
export function separateDataByCategory(data) {
	const updatedData = [];
	let categoryObject = {};

	data.forEach((obj) => {
		const objectCategory = obj.category;
		const { category, ...modifiedObject } = obj;
		if (!categoryObject[objectCategory]) {
			categoryObject[objectCategory] = [];
		}
		categoryObject[objectCategory].push(modifiedObject);
	});
	updatedData.push(categoryObject);
	return updatedData;
}
