import React from 'react';
import '../index.css';

const Die = (props) => {
	const number = Number(props.number);
	const classes = props.selected ? "die selected" : "die";
	switch(number) {
		case 0: return (
			<svg className={classes}>
			</svg>
		);
		case 1:
			return (
				<svg className={classes} onClick={props.onClick}>
					<circle cx="36" cy="36" r="5" fill="white" />
				</svg>
			);
		case 2:
			return (
				<svg className={classes} onClick={props.onClick}>
					<circle cx="18" cy="18" r="5" fill="white" />
					<circle cx="54" cy="54" r="5" fill="white" />
				</svg>
			);
		case 3:
			return (
				<svg className={classes} onClick={props.onClick}>
					<circle cx="18" cy="18" r="5" fill="white" />
					<circle cx="36" cy="36" r="5" fill="white" />
					<circle cx="54" cy="54" r="5" fill="white" />
				</svg>
			);
		case 4:
			return (
				<svg className={classes} onClick={props.onClick}>
					<circle cx="18" cy="18" r="5" fill="white" />
					<circle cx="18" cy="54" r="5" fill="white" />
					<circle cx="54" cy="18" r="5" fill="white" />
					<circle cx="54" cy="54" r="5" fill="white" />
				</svg>
			);
		case 5:
			return (
				<svg className={classes} onClick={props.onClick}>
					<circle cx="18" cy="18" r="5" fill="white" />
					<circle cx="18" cy="54" r="5" fill="white" />
					<circle cx="36" cy="36" r="5" fill="white" />
					<circle cx="54" cy="18" r="5" fill="white" />
					<circle cx="54" cy="54" r="5" fill="white" />
				</svg>
			);
		case 6:
			return (
				<svg className={classes} onClick={props.onClick}>
					<circle cx="18" cy="18" r="5" fill="white" />
					<circle cx="18" cy="36" r="5" fill="white" />
					<circle cx="18" cy="54" r="5" fill="white" />
					<circle cx="54" cy="18" r="5" fill="white" />
					<circle cx="54" cy="36" r="5" fill="white" />
					<circle cx="54" cy="54" r="5" fill="white" />
				</svg>
			);
		default:
			return <svg className={classes}></svg>;
	}
}

export default Die;