import TriangleIcon from '../TriangleIcon/TriangleIcon';
import './radiobutton.css';

function RadioButton({
	innerText,
	name,
	id,
	htmlFor,
	onChoice,
	sorting,
	showIcon = false,
}) {
	return (
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
			{showIcon && (
				<TriangleIcon
					checked={!!document.getElementById(id)?.checked}
					rotate={sorting === 'DESC' ? true : false}
				/>
			)}
		</li>
	);
}

export default RadioButton;
