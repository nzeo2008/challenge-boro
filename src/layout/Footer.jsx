import { useContext } from 'react';
import { DataContext } from '../App';
import Button from '../components/Button/Button';
import { moveToUp } from '../services/common.service';
import './footer.css';

function Footer() {
	const { prevPage, nextPage, data, index, changeToTreeView } =
		useContext(DataContext);
	return (
		<footer className="footer-wrapper">
			<Button
				className="footer-wrapper-button"
				disabled={changeToTreeView || index.start === 0}
				onClick={() => {
					prevPage();
					moveToUp();
				}}
			>
				Предыдущая страница
			</Button>

			<Button
				className="footer-wrapper-button"
				disabled={changeToTreeView || index.end >= data.length - 1}
				onClick={() => {
					nextPage();
					moveToUp();
				}}
			>
				Следующая страница
			</Button>
		</footer>
	);
}

export default Footer;
