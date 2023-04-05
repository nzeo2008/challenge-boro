import { useState, useEffect, useRef } from 'react';
import {
	extractImageName,
	separateDataByCategory,
} from '../services/common.service';
import { TOKEN_STORAGE } from '../constants/tokenConstants';
import {
	removeDataFromLocalStorage,
	getDataFromLocalStorage,
} from '../services/tokenStorage.service';

// Хук для загрузки и сохранения данных
const useDataFetching = (url, storageKey) => {
	// Поля для хранения данных, состояния загрузки и ошибки
	const [data, setData] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [error, setError] = useState(null);
	const treeViewDataRef = useRef([]);

	// Загрузка данных из сети
	const fetchData = async () => {
		try {
			const response = await fetch(url);
			const fetchedData = await response.json();

			// Добавление поля с именем файла к каждому объекту в массиве данных
			const fetchedDataWithNames = extractImageName(fetchedData);
			// Создание копии данных для TreeView
			treeViewDataRef.current =
				separateDataByCategory(fetchedDataWithNames);

			// Фильтрация удалённых карточек из массива входных данных
			const savedLocalData = getDataFromLocalStorage(storageKey);

			if (!savedLocalData) {
				setData(fetchedDataWithNames);
			}

			const filteredData = filterData(
				fetchedDataWithNames,
				savedLocalData
			);
			setData(filteredData);
			setIsDataLoading(false);
		} catch (error) {
			setError(error);
		} finally {
			setIsDataLoading(false);
		}
	};

	// Функция для повторной загрузки данных
	const resetData = () => {
		setIsDataLoading(true);
		removeDataFromLocalStorage(TOKEN_STORAGE.USER_DATA);
		fetchData();
	};

	// Функция фильтрации массивов
	const filterData = (data, deletedLocalData) => {
		const filteredArray = data.filter((obj) =>
			deletedLocalData.every((element) => element.image !== obj.image)
		);

		return filteredArray;
	};

	useEffect(() => {
		fetchData();
	}, [url]);

	return { data, isDataLoading, error, treeViewDataRef, setData, resetData };
};

export default useDataFetching;
