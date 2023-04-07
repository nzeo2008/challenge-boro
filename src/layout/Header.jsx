import { useContext, useEffect } from 'react';
import { DataContext } from '../App';
import {
	moveToUp,
	setRadioButtonCheckedProp,
} from '../services/common.service';
import RadioButton from '../components/RadioButton/RadioButton';
import Button from '../components/Button/Button';
import './header.css';
import SortingMenu from './SortingMenu';

function Header() {
	const {
		resetData,
		setIndex,
		limitOfCards,
		setChangeToTreeView,
		changeToTreeView,
		setCurrentPage,
	} = useContext(DataContext);

	// Функция для сброса данных
	const onReset = () => {
		// Возвращение на страницу с карточками
		setIndex({
			start: 0,
			end: limitOfCards,
		});
		resetData();
		moveToUp();
		// Установка radiobutton в нужные положения
		setRadioButtonCheckedProp('name', 'radio', false, true);
		setRadioButtonCheckedProp('id', 'tree-view', false, true);
		setRadioButtonCheckedProp('id', 'card-view', true, false);
		setCurrentPage(1);
	};

	// Установка первоначального значения у radiobutton на карточки
	useEffect(() => {
		setRadioButtonCheckedProp('id', 'card-view', true, false);
	}, []);

	return (
		<header className="header-wrapper">
			<div className="header-view-wrapper">
				<RadioButton
					innerText="Вид карточек"
					name="header-radio"
					id="card-view"
					htmlFor="card-view"
					onChoice={() => {
						setChangeToTreeView(false);
					}}
					checked="checked"
				/>
				<RadioButton
					innerText="Bид дерева"
					name="header-radio"
					id="tree-view"
					htmlFor="tree-view"
					onChoice={() => {
						setChangeToTreeView(true);
					}}
				/>
			</div>
			{!changeToTreeView && <SortingMenu />}
			{!changeToTreeView && (
				<Button
					className="header-wrapper-reset-button"
					onClick={onReset}
					disabled={changeToTreeView}
				>
					Сбросить
				</Button>
			)}
		</header>
	);
}

export default Header;
