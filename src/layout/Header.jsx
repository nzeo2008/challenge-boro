import './header.css';
import { useContext, useEffect } from 'react';
import { DataContext } from '../App';
import {
	moveToUp,
	setRadioButtonCheckedProp,
} from '../services/common.service';
import RadioButton from '../components/RadioButton/RadioButton';

function Header() {
	const {
		resetData,
		setIndex,
		limitOfPages,
		setChangeToTreeView,
		setShowMenu,
	} = useContext(DataContext);

	// Функция для сброса данных
	const onReset = () => {
		// Возвращение на страницу с карточками
		setIndex((prevState) => ({
			start: 0,
			end: limitOfPages,
		}));
		resetData();
		moveToUp();
		// Установка radiobutton в нужные положения
		setRadioButtonCheckedProp('name', 'radio', false, true);
		setRadioButtonCheckedProp('id', 'tree-view', false, true);
		setRadioButtonCheckedProp('id', 'card-view', true, false);

		// Закрытие бокового меню и смена вида на карточки
		setShowMenu(false);
		setChangeToTreeView(false);
	};

	// Установка первоначального значения у radiobutton на карточки
	useEffect(() => {
		setRadioButtonCheckedProp('id', 'card-view', true, false);
	}, []);

	return (
		<header className="header-wrapper">
			<span>Boro Challenge</span>
			<div>
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
			<button className="header-wrapper-reset-button" onClick={onReset}>
				Сбросить
			</button>
		</header>
	);
}

export default Header;
