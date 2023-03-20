import './modal.css';

function Modal({ isOpen, onClose, image }) {
	return (
		<>
			{isOpen && (
				<div className="modal-overlay" onClick={onClose}>
					<div className="modal-container">
						<div
							className="modal-content"
							onClick={(event) => event.stopPropagation()}
						>
							<img src={image} alt={image} loading="lazy" />
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default Modal;
