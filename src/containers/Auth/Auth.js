import React, { Component } from 'react'
import axios from 'axios'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { validate } from '../../form/formFramework'
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
					required: true,
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
					required: true,
					minLength: 6,
					maxLength: 16
				}
			}
		}
	}

	loginHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}

		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDn9eADGYm5-w4g3AP9EMIQiKrBQ0b8_Y0', authData)

			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	registerHandler = async () => {
		const authData = {
			email: this.state.formControls.email.value,
			password: this.state.formControls.password.value,
			returnSecureToken: true
		}

		try {
			const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDn9eADGYm5-w4g3AP9EMIQiKrBQ0b8_Y0', authData)

			console.log(response.data)
		} catch (e) {
			console.log(e)
		}
	}

	submitHandler = e => {
		e.preventDefault()
	}

	onChangeHandler = (value, controlName) => {
		const formControls = {...this.state.formControls}
		const control = formControls[controlName]

		control.value = value
		control.touched = true
		control.valid = validate(control.value, control.validation)

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
					shouldValidate={!!control.validation}
					onChange={(event) => this.onChangeHandler(event.target.value, controlName)}
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