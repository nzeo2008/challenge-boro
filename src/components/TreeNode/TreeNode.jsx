import { useState } from 'react';
import { API_ENDPOINTS } from '../../constants/urlConstants';
import { getDateFromTimestamp } from '../../services/common.service';
import Modal from '../Modal/Modal';
import './treenode.css';

function TreeNode({ node, index }) {
	const [showNode, setShowNode] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleImageClick = () => {
		setShowModal((prevState) => !prevState);
	};

	const handleCloseModal = () => {
		setShowModal(false);
	};

	return (
		<>
			<button
				onClick={() => {
					return setShowNode((prevState) => !prevState);
				}}
			>
				{showNode ? '-' : '+'}
			</button>
			<span>{index + 1}: </span>
			<li className={showNode ? 'tree-node' : 'tree-node-hidden'}>
				<div>
					<div className="tree-node-img-section">
						<span>Image:</span>
						<div
							className="tree-node-img-section-container"
							onClick={handleImageClick}
						>
							<img
								src={API_ENDPOINTS.GET_IMAGE + node.image}
								loading="lazy"
								alt={node.image}
							/>
						</div>
					</div>
					<span>Filesize: {node.filesize}</span>
					<span>Date: {getDateFromTimestamp(node.timestamp)}</span>
					<span>Category: {node.category}</span>
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

export default TreeNode;
