import SortingMenu from './SortingMenu';
import { useContext } from 'react';
import { DataContext } from '../App';
import './footer.css';

function Footer() {
	const { changeToTreeView } = useContext(DataContext);
	return (
		<footer className="footer-wrapper">
			{!changeToTreeView && <SortingMenu />}
		</footer>
	);
}

export default Footer;
