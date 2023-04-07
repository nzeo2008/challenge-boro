import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import { TOKEN_STORAGE } from '../../constants/tokenConstants';
import {
	saveDataToLocalStorage,
	getDataFromLocalStorage,
} from '../../services/tokenStorage.service';
import { useContext } from 'react';
import { DataContext } from '../../App';
import { moveToUp } from '../../services/common.service';
import './cardview.css';

function CardView() {
	const {
		data,
		isDataLoading,
		setData,
		index,
		setIndex,
		splitData,
		currentPage,
		limitOfCards,
		setPagesIndex,
		pagesIndex,
		setCurrentPage,
	} = useContext(DataContext);

	function handlePreviousPageClick() {
		setIndex((prevState) => ({
			start: prevState.start - limitOfCards,
			end: prevState.end - limitOfCards,
		}));
		setCurrentPage(currentPage - 1);
		moveToUp();
	}

	// Уданение карточки
	const handleDelete = (currentObj) => {
		const filteredData = data.filter((obj) => {
			return obj.image !== currentObj.image;
		});

		setData(filteredData);

		if (splitData.length === 1 && index.start) {
			handlePreviousPageClick();
			setPagesIndex({
				start: pagesIndex.start - 1,
				end: pagesIndex.end - 1,
			});
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
		</main>
	);
}

export default CardView;
