import PropTypes from 'prop-types';

function Button({ children, ...props }) {
	return <button {...props}>{children}</button>;
}

Button.propTypes = {
	children: PropTypes.node.isRequired,
	onClick: PropTypes.func.isRequired,
	disabled: PropTypes.bool,
	className: PropTypes.string,
};

export default Button;
