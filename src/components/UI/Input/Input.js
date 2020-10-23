import React from 'react'
import classes from './Input.module.css'

function isInvalid({valid, touched, shouldValidate}) {
	return !valid && shouldValidate && touched
}

const Input = props => {
	const inputType = props.type || 'text',
			cls = [classes.Input],
			htmlFor = `${inputType}-${Math.random()}`,
			valid = isInvalid(props)

	if (valid) {
		cls.push(classes.invalid)
	}
	
	return (
		<div className={cls.join(' ')}>
			<label htmlFor={htmlFor}>{props.label}</label>
			<input 
				type={inputType}
				id={htmlFor}
				value={props.value}
				onChange={props.onChange}
			/>
			{
				valid
					? <span>{props.errorMessage || "Введите верное значение"}</span> 
					: null
			}
		</div>
	)
}

export default Input