import { useRef, useState, useMemo, useEffect } from 'react';
import { splitByPages } from '../services/common.service';

const usePagination = (data, limitOfPages) => {
	const splitDataRef = useRef([]);

	// Инициализируем текущий индекс и диапазон значений
	const [index, setIndex] = useState({ start: 0, end: limitOfPages });

	// Функция для перехода к следующей странице
	const nextPage = () => {
		setIndex((prevSate) => ({
			start: prevSate.start + limitOfPages,
			end: prevSate.end + limitOfPages,
		}));
	};

	// Функция для перехода к предыдущей странице
	const prevPage = () => {
		if (index.start - limitOfPages < 0) {
			return setIndex((prevSate) => ({
				start: 0,
				end: limitOfPages,
			}));
		}

		setIndex((prevSate) => ({
			start: prevSate.start - limitOfPages,
			end: prevSate.end - limitOfPages,
		}));
	};

	// Разбиваем данные на страницы с помощью useMemo
	const splitData = useMemo(() => {
		return splitByPages(data, index.start, index.end);
	}, [data, index]);

	// Обновляем данные в splitDataRef
	useEffect(() => {
		splitDataRef.current = data;
	}, [data]);

	return { splitData, splitDataRef, index, setIndex, nextPage, prevPage };
};

export default usePagination;
