import Card from '../Card/Card';
import Spinner from '../Spinner/Spinner';
import { TOKEN_STORAGE } from '../../constants/tokenConstants';
import { saveDataToLocalStorage } from '../../services/tokenStorage.service';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../App';
import './cardview.css';

function CardView() {
	const {
		data,
		isDataLoading,
		setData,
		splitDataRef,
		index,
		setIndex,
		splitData,
	} = useContext(DataContext);

	// Уданение карточки
	const handleDelete = (image) => {
		const filteredData = data.filter((obj) => {
			return obj.image !== image;
		});

		splitDataRef.current = filteredData;
		setData(filteredData);
		saveDataToLocalStorage(TOKEN_STORAGE.USER_DATA, filteredData);
		if (index.start) {
			setIndex((prevSate) => ({
				start: prevSate.start - 1,
				end: prevSate.end - 1,
			}));
		}
	};

	useEffect(() => {
		if (!isDataLoading) {
			splitDataRef.current = data;
		}
	}, [isDataLoading, data, splitDataRef]);

	return isDataLoading ? (
		<Spinner />
	) : (
		<main className="main-page-cards-wrapper">
			{splitData.map((obj, i) => {
				return (
					<Card
						key={obj.image}
						image={obj.image}
						onDelete={() => {
							const card =
								document.querySelectorAll('.card-wrapper');
							card[i].classList.add(
								'card-wrapper-delete-animation'
							);
							setTimeout(() => {
								handleDelete(obj.image);
							}, 250);
						}}
					/>
				);
			})}
		</main>
	);
}

export default CardView;
