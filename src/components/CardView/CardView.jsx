import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import { TOKEN_STORAGE } from '../../constants/tokenConstants';
import {
	saveDataToLocalStorage,
	getDataFromLocalStorage,
} from '../../services/tokenStorage.service';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../App';
import { moveToUp, range } from '../../services/common.service';
import './cardview.css';

function CardView() {
	const {
		data,
		isDataLoading,
		setData,
		index,
		setIndex,
		splitData,
		numberOfPages,
		limitOfPages,
		currentPage,
		setCurrentPage,
	} = useContext(DataContext);

	const pagesArray = range(1, numberOfPages);
	const pagesLimit = 10;
	const [pagesIndex, setPagesIndex] = useState({
		start: 0,
		end: pagesLimit,
	});

	// Уданение карточки
	const handleDelete = (currentObj) => {
		const filteredData = data.filter((obj) => {
			return obj.image !== currentObj.image;
		});

		setData(filteredData);

		if (index.start) {
			setIndex((prevSate) => ({
				start: prevSate.start - 1,
				end: prevSate.end - 1,
			}));
		}

		const savedData = getDataFromLocalStorage(TOKEN_STORAGE.USER_DATA);
		if (!savedData) {
			return saveDataToLocalStorage(TOKEN_STORAGE.USER_DATA, [
				currentObj,
			]);
		}
		saveDataToLocalStorage(TOKEN_STORAGE.USER_DATA, [
			...savedData,
			currentObj,
		]);
	};

	function handleNextPageClick() {
		setIndex((prevState) => ({
			start: prevState.start + limitOfPages,
			end: prevState.end + limitOfPages,
		}));
		setCurrentPage(currentPage + 1);
		moveToUp();
	}

	function handlePreviousPageClick() {
		setIndex((prevState) => ({
			start: prevState.start - limitOfPages,
			end: prevState.end - limitOfPages,
		}));
		setCurrentPage(currentPage - 1);
		moveToUp();
	}

	function handleFirstPageClick() {
		setCurrentPage(1);
		setIndex({
			start: 0,
			end: limitOfPages,
		});
		moveToUp();
	}

	function handleLastPageClick() {
		setCurrentPage(numberOfPages);
		setIndex({
			start: numberOfPages * limitOfPages - limitOfPages,
			end: numberOfPages * limitOfPages,
		});
		setPagesIndex({
			start: numberOfPages - pagesLimit,
			end: numberOfPages,
		});
		moveToUp();
	}

	function handlePageClick(pageNumber) {
		setIndex({
			start: pageNumber * limitOfPages - limitOfPages,
			end: pageNumber * limitOfPages,
		});
		setCurrentPage(pageNumber);
		moveToUp();
	}

	useEffect(() => {
		if (currentPage - 1 === data.length / limitOfPages) {
			setCurrentPage(Math.ceil(data.length / limitOfPages));
		}

		if (currentPage === pagesIndex.end && currentPage !== numberOfPages) {
			setPagesIndex({
				start: currentPage - 2,
				end: currentPage - 2 + pagesLimit,
			});
		} else if (
			currentPage - 1 === pagesIndex.start &&
			currentPage - pagesLimit >= 0
		) {
			setPagesIndex({
				start: currentPage + 1 - pagesLimit,
				end: currentPage + 1,
			});
		}

		if (currentPage - pagesLimit < 0) {
			setPagesIndex({
				start: 0,
				end: pagesLimit,
			});
		}
	}, [isDataLoading, data, currentPage]);

	return isDataLoading ? (
		<Spinner />
	) : (
		<main>
			<div className="main-page-cards-wrapper">
				{splitData.map((obj, i) => {
					return (
						<Card
							key={obj.image}
							data={obj}
							onDelete={() => {
								const card =
									document.querySelectorAll('.card-wrapper');
								card[i].classList.add(
									'card-wrapper-delete-animation'
								);
								setTimeout(() => {
									handleDelete(obj);
								}, 250);
							}}
						/>
					);
				})}
			</div>
			<div className="page-view-wrapper">
				<div className="buttons-previous-container">
					<button
						disabled={currentPage === 1}
						onClick={handleFirstPageClick}
					>
						Первая
					</button>
					<button
						disabled={currentPage === 1}
						onClick={handlePreviousPageClick}
					>
						Предыдущая
					</button>
				</div>
				<div className="pages-view-container">
					{pagesArray
						.slice(pagesIndex.start, pagesIndex.end)
						.map((number) => {
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
				<div className="buttons-next-container">
					<button
						disabled={currentPage === numberOfPages}
						onClick={handleNextPageClick}
					>
						Следующая
					</button>
					<button
						disabled={currentPage === numberOfPages}
						onClick={handleLastPageClick}
					>
						Последняя
					</button>
				</div>
			</div>
		</main>
	);
}

export default CardView;
