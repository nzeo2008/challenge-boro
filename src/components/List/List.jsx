import './list.css';

function List({ children, label }) {
	return (
		<section className="radio-buttons-list-wrapper">
			<span>{label}</span>
			<ul>{children}</ul>
		</section>
	);
}

export default List;
