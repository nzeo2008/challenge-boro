import './card.css';
import { API_ENDPOINTS } from '../../constants/urlConstants';

function Card({ image, onDelete }) {
	return (
		<div className="card-wrapper">
			<button className="card-wrapper-close-button" onClick={onDelete}>
				X
			</button>
			<div className="card-wrapper-image-container">
				<img
					src={API_ENDPOINTS.GET_IMAGE + image}
					loading="lazy"
					alt={image}
				/>
			</div>
			<div className="card-wrapper-text-block">
				Lorem ipsum dolor sit, amet consectetur adipisicing elit.
				Accusantium assumenda sunt deleniti!
			</div>
		</div>
	);
}

export default Card;
