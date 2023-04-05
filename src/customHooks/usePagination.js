import { useState, useMemo, useEffect } from 'react';
import { splitByPages } from '../services/common.service';

const usePagination = (data, limitOfPages) => {
	// Инициализируем текущий индекс и диапазон значений
	const [index, setIndex] = useState({ start: 0, end: limitOfPages });
	const [numberOfPages, setNumberOfPages] = useState(0);

	// Разбиваем данные на страницы с помощью useMemo
	const splitData = useMemo(() => {
		return splitByPages(data, index.start, index.end);
	}, [data, index]);

	useEffect(() => {
		setNumberOfPages(Math.ceil(data.length / limitOfPages));
	}, [data, limitOfPages]);

	return {
		splitData,

		index,
		numberOfPages,
		setIndex,
	};
};

export default usePagination;
