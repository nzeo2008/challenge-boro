import './card.css';
import { API_ENDPOINTS } from '../../constants/urlConstants';
import { getDateFromTimestamp, getSize } from '../../services/common.service';

function Card({ data, onDelete }) {
	return (
		<div className="card-wrapper">
			<button className="card-wrapper-close-button" onClick={onDelete}>
				X
			</button>
			<div className="card-wrapper-image-container">
				<img
					src={API_ENDPOINTS.GET_IMAGE + data.image}
					loading="lazy"
					alt={data.image}
				/>
			</div>

			<div className="card-wrapper-text-block">
				<span> Name: {data.name}</span>
				<span> Category: {data.category}</span>
				<span> Filesize: {getSize(data.filesize)}</span>
				<span> Date: {getDateFromTimestamp(data.timestamp)}</span>
			</div>
		</div>
	);
}

export default Card;
