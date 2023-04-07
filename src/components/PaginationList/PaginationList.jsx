import React, { useContext, useEffect } from 'react';
import { DataContext } from './../../App';
import { moveToUp } from '../../services/common.service';
import { range } from './../../services/common.service';
import './paginationlist.css';

function PaginationList() {
	const {
		data,
		isDataLoading,
		setIndex,
		numberOfPages,
		limitOfCards,
		setPagesIndex,
		pagesIndex,
		currentPage,
		pagesLimit,
		setCurrentPage,
	} = useContext(DataContext);

	const pagesArray = range(1, numberOfPages);
	const pageOffset = 2;

	useEffect(() => {
		// Проверка при удалении элементов со страницы
		if (currentPage - 1 === data.length / limitOfCards) {
			setCurrentPage(Math.ceil(data.length / limitOfCards));
		}

		// Проверка на выход за пределы из диапазона значений
		// Проверка при проходе вперёд
		if (currentPage === pagesIndex.end && currentPage !== numberOfPages) {
			setPagesIndex({
				start: currentPage - pageOffset,
				end: currentPage - pageOffset + pagesLimit,
			});

			// Проверка при проходе назад
		} else if (
			currentPage - 1 === pagesIndex.start &&
			currentPage - pagesLimit >= 0
		) {
			setPagesIndex({
				start: currentPage + 1 - pagesLimit,
				end: currentPage + 1,
			});
		}

		if (currentPage + pagesLimit - pageOffset >= numberOfPages) {
			setPagesIndex({
				start: numberOfPages - pagesLimit,
				end: numberOfPages,
			});
		}

		// Если значение текущей страницы меньше,
		// чем установленный лимит, то сбрасываем индекс
		if (currentPage - pagesLimit < 0) {
			setPagesIndex({
				start: 0,
				end: pagesLimit,
			});
		}
	}, [isDataLoading, data, currentPage, numberOfPages]);

	function handleNextPageClick() {
		setIndex((prevState) => ({
			start: prevState.start + limitOfCards,
			end: prevState.end + limitOfCards,
		}));
		setCurrentPage(currentPage + 1);
		moveToUp();
	}

	function handlePreviousPageClick() {
		setIndex((prevState) => ({
			start: prevState.start - limitOfCards,
			end: prevState.end - limitOfCards,
		}));
		setCurrentPage(currentPage - 1);
		moveToUp();
	}

	function handleFirstPageClick() {
		setCurrentPage(1);
		setIndex({
			start: 0,
			end: limitOfCards,
		});
		moveToUp();
	}

	function handleLastPageClick() {
		setCurrentPage(numberOfPages);
		setIndex({
			start: numberOfPages * limitOfCards - limitOfCards,
			end: numberOfPages * limitOfCards,
		});
		setPagesIndex({
			start: numberOfPages - pagesLimit,
			end: numberOfPages,
		});
		moveToUp();
	}

	function handlePageClick(pageNumber) {
		setIndex({
			start: pageNumber * limitOfCards - limitOfCards,
			end: pageNumber * limitOfCards,
		});
		setCurrentPage(pageNumber);
		moveToUp();
	}

	return (
		<div className='page-view-wrapper'>
			<div className='buttons-previous-container'>
				<button
					disabled={currentPage === 1 || data.length === 0}
					onClick={handleFirstPageClick}
				>
					Первая
				</button>
				<button
					disabled={currentPage === 1 || data.length === 0}
					onClick={handlePreviousPageClick}
				>
					Предыдущая
				</button>
			</div>
			<div className='pages-view-container'>
				{pagesArray.slice(pagesIndex.start, pagesIndex.end).map((number) => {
					return (
						<div
							key={number}
							onClick={() => {
								handlePageClick(number);
							}}
							className={
								currentPage === number
									? 'page-view-wrapper-pages-active'
									: 'page-view-wrapper-pages'
							}
						>
							{number}
						</div>
					);
				})}
			</div>
			<div className='buttons-next-container'>
				<button
					disabled={currentPage === numberOfPages || data.length === 0}
					onClick={handleNextPageClick}
				>
					Следующая
				</button>
				<button
					disabled={currentPage === numberOfPages || data.length === 0}
					onClick={handleLastPageClick}
				>
					Последняя
				</button>
			</div>
		</div>
	);
}

export default PaginationList;
