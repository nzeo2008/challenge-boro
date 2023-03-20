import TriangleIcon from '../TriangleIcon/TriangleIcon';
import './radiobutton.css';

function RadioButton({
	innerText,
	name,
	id,
	htmlFor,
	onChoice,
	sortingOrdrerRef,
	showIcon = false,
}) {
	return (
		<>
			<li className="form-radio">
				<input
					id={id}
					type="radio"
					name={name}
					onClick={() => {
						onChoice();
					}}
				/>
				<label htmlFor={htmlFor}>{innerText}</label>
			</li>
			{showIcon && (
				<TriangleIcon
					checked={!!document.getElementById(id)?.checked}
					rotate={sortingOrdrerRef.current === 'DESC' ? true : false}
				/>
			)}
		</>
	);
}

export default RadioButton;
