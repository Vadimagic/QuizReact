import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.module.css'

export default class Auth extends Component {

	state = {
		isFormValid: false, 
		formControls : {
			email: {
				value: '',
				type: 'email',
				label: 'Email',
				errorMessage: 'Введите корректный email',
				valid: false,
				touched: false,
				validation: {
					require: true,
					email: true
				}
			},
			password: {
				value: '',
				type: 'password',
				label: 'Пароль',
				errorMessage: 'Введите корректный пароль',
				valid: false,
				touched: false,
				validation: {
					require: true,
					minLength: 6,
					maxLength: 16
				}
			}
		}
	}

	loginHandler = () => {

	}

	registerHandler = () => {

	}

	submitHandler = e => {
		e.preventDefault()
	}

	validateControl(value, validation) {
		if (!validation) {
			return true
		}

		let isValid = true;
		value = value.trim()

		if (validation.require) {
			isValid = value !== '' && isValid
		}

		if (validation.email) {
			return /^(([^<>()\\.,;:\s@"]+(\.[^<>()\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-z\-0-9]+\.)+[a-z]{2,}))$/i.test(value) && isValid
		}

		if (validation.minLength) {
			isValid = value.length >= 6 && isValid
		}

		if (validation.maxLength) {
			isValid = value.length <= 20 && isValid
		}

		return isValid;
	}

	onChangeHandler = (event, controlName) => {
		const formControls = {...this.state.formControls}
		const control = formControls[controlName]

		control.value = event.target.value
		control.touched = true
		control.valid = this.validateControl(control.value, control.validation)

		const isFormValid = !Object.keys(formControls).reduce((valid, item) => {
			return valid || !formControls[item].valid
		} , false)

		this.setState({
			isFormValid,
			formControls
		})
	}

	renderInputs() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return (
				<Input 
					key={controlName + index}
					type={control.type}
					label={control.label}
					value={control.value}
					errorMessage={control.errorMessage}
					valid={control.valid}
					touched={control.touched}
					shouldValidate={control.validation.require}
					onChange={(event) => this.onChangeHandler(event, controlName)}
				/>
			)
		})
	}

	render() {
		return (
			<div className={classes.Auth}>
				<div>
					<h1>Авторизация</h1>

					<form onSubmit={this.submitHandler} className={classes.AuthForm}>
						{this.renderInputs()}
						<Button 
							type="success" 
							onClick={this.loginHandler}
							disabled={!this.state.isFormValid}
						>
							Войти
						</Button>
						<Button 
							type="primary" 
							onClick={this.registerHandler}
							disabled={!this.state.isFormValid}
						>
							Зарегистрироваться
						</Button>
					</form>
				</div>
			</div>
		)
	}
}