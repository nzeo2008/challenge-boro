import List from '../components/List/List';
import RadioButton from '../components/RadioButton/RadioButton';
import { useContext, useRef } from 'react';
import { DataContext } from '../App';
import { sortData } from '../services/common.service';
import { getDataFromLocalStorage } from '../services/tokenStorage.service';
import { TOKEN_STORAGE } from '../constants/tokenConstants';
import './aside.css';

function AsideMenu() {
	const { setData, setShowMenu, showMenu } = useContext(DataContext);

	const sortingOrderRef = useRef('DESC');

	const handleSort = (key) => {
		sortingOrderRef.current =
			sortingOrderRef.current === 'DESC' ? 'ASC' : 'DESC';

		const data = getDataFromLocalStorage(TOKEN_STORAGE.USER_DATA);

		const sortedData = sortData(data, key, sortingOrderRef.current);
		setData(sortedData);
	};

	return (
		<aside>
			<div
				className={
					showMenu
						? 'sorting-menu--wrapper'
						: 'sorting-menu--wrapper-hidden'
				}
			>
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
							sortingOrdrerRef={sortingOrderRef}
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
							sortingOrdrerRef={sortingOrderRef}
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
							sortingOrdrerRef={sortingOrderRef}
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
							sortingOrdrerRef={sortingOrderRef}
						/>
					</div>
				</List>
				<div
					className="sorting-menu-wrapper-closing"
					onClick={() => {
						setShowMenu(false);
					}}
				></div>
			</div>
			<div
				onClick={() => {
					setShowMenu(true);
				}}
				className={
					showMenu ? 'aside-menu-button-hidden' : 'aside-menu-button'
				}
			>
				<div className="aside-menu-button-picture"></div>
			</div>
		</aside>
	);
}

export default AsideMenu;
