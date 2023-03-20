import { useState, useEffect } from 'react';
import { extractImageName } from '../services/common.service';
import {
	saveDataToLocalStorage,
	getDataFromLocalStorage,
} from '../services/tokenStorage.service';

// Хук для загрузки и сохранения данных
const useDataFetching = (url, storageKey) => {
	// Поля для хранения данных, состояния загрузки и ошибки
	const [data, setData] = useState([]);
	const [isDataLoading, setIsDataLoading] = useState(true);
	const [error, setError] = useState(null);

	// Загрузка данных из сети и сохранение их в локальном хранилище
	const fetchData = async () => {
		try {
			const response = await fetch(url);
			const fetchedData = await response.json();

			// Добавление поля с именем файла к каждому объекту в массиве данных
			const fetchedDataWithNames = extractImageName(fetchedData);
			setData(fetchedDataWithNames);

			// Сохранение в локальное хранилище
			saveDataToLocalStorage(storageKey, fetchedDataWithNames);
		} catch (error) {
			setError(error);
		} finally {
			setIsDataLoading(false);
		}
	};

	// Функция для повторной загрузки данных
	const resetData = () => {
		setIsDataLoading(true);
		fetchData();
	};

	// Получение данных из localStorage, если они есть, если нет, то вызываем fetchData
	useEffect(() => {
		const savedLocalData = getDataFromLocalStorage(storageKey);
		if (savedLocalData) {
			setData(savedLocalData);
			setIsDataLoading(false);
		} else {
			fetchData();
		}
	}, [url, storageKey]);

	return { data, isDataLoading, error, setData, resetData };
};

export default useDataFetching;
