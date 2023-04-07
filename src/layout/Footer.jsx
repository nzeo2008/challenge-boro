import { useContext } from 'react';
import PaginationList from './../components/PaginationList/PaginationList';
import { DataContext } from './../App';
import './footer.css';

function Footer() {
	const { changeToTreeView, data } = useContext(DataContext);
	return (
		<footer className='footer-wrapper'>
			{!changeToTreeView && data.length !== 0 && <PaginationList />}
		</footer>
	);
}

export default Footer;
