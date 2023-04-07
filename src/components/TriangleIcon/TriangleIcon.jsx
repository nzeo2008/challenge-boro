import triangleLogo from '../../assets/triangle-256.png';
import './triangle.icon.css';

function TriangleIcon({ rotate, checked }) {
	return (
		<div
			className='triangle-icon-conteiner'
			style={
				// Показ/сокрытие иконки треугольника и разворот в зависимости от условий
				checked
					? rotate
						? { transform: 'rotate(0deg)' }
						: { transform: 'rotate(180deg)' }
					: { visibility: 'hidden' }
			}
		>
			<img src={triangleLogo} alt='triangle' />
		</div>
	);
}

export default TriangleIcon;
