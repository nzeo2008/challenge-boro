import { getDateFromTimestamp, getSize } from '../../services/common.service';
import { API_ENDPOINTS } from '../../constants/urlConstants';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import './nodecard.css';

function NodeCard({ node, dataRef }) {
	const [showNode, setShowNode] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleImageClick = () => {
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<li ref={dataRef}>
				<button
					onClick={() => {
						return setShowNode((prevState) => !prevState);
					}}
				>
					{showNode ? '-' : '+'}
				</button>
				<span>{node.name}</span>
				<div className={showNode ? 'card-node' : 'card-node-hidden'}>
					<div>
						<div className="card-node-img-section">
							<span>Image:</span>
							<div
								className="card-node-img-section-container"
								onClick={handleImageClick}
							>
								<img
									src={API_ENDPOINTS.GET_IMAGE + node.image}
									loading="lazy"
									alt={node.image}
								/>
							</div>
						</div>
						<span>Filesize: {getSize(node.filesize)}</span>
						<span>
							Date: {getDateFromTimestamp(node.timestamp)}
						</span>
					</div>
				</div>
			</li>
			<Modal
				isOpen={showModal}
				onClose={handleCloseModal}
				image={API_ENDPOINTS.GET_IMAGE + node.image}
			/>
		</>
	);
}

export default NodeCard;
