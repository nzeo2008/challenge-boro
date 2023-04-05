import List from '../components/List/List';
import RadioButton from '../components/RadioButton/RadioButton';
import { useContext } from 'react';
import { DataContext } from '../App';
import { sortData } from '../services/common.service';
import './sortingmenu.css';

function SortingMenu() {
	const { setData, data, sorting, setSorting, setIndex } =
		useContext(DataContext);

	const handleSort = (key) => {
		const sortedData = sortData(data, key, sorting);
		sorting === 'DESC' ? setSorting('ASC') : setSorting('DESC');
		setData(sortedData);
		setIndex((prevState) => ({ ...prevState }));
	};

	return (
		<section className="sorting-menu-wrapper">
			<List label="Сортировать по:">
				<div className="button-flex-container">
					<RadioButton
						id="radio-1"
						htmlFor="radio-1"
						innerText="Категории"
						name="radio"
						showIcon={true}
						onChoice={() => {
							handleSort('category');
						}}
						sorting={sorting}
					/>
				</div>
				<div className="button-flex-container">
					<RadioButton
						id="radio-2"
						htmlFor="radio-2"
						innerText="Дате"
						name="radio"
						showIcon={true}
						onChoice={() => {
							handleSort('timestamp');
						}}
						sorting={sorting}
					/>
				</div>
				<div className="button-flex-container">
					<RadioButton
						id="radio-3"
						htmlFor="radio-3"
						innerText="Названию"
						name="radio"
						showIcon={true}
						onChoice={() => {
							handleSort('name');
						}}
						sorting={sorting}
					/>
				</div>
				<div className="button-flex-container">
					<RadioButton
						id="radio-4"
						htmlFor="radio-4"
						innerText="Размеру файла"
						name="radio"
						showIcon={true}
						onChoice={() => {
							handleSort('filesize');
						}}
						sorting={sorting}
					/>
				</div>
			</List>
		</section>
	);
}

export default SortingMenu;
