import loadingSpinner from '../../assets/ZKZg.gif';
import './spinner.css';

function Spinner() {
	return (
		<section className="spinner-wrapper">
			<div>
				<img src={loadingSpinner} alt="loading-spinner.gif" />
			</div>
		</section>
	);
}

export default Spinner;
