import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import classes from './Auth.module.css'

export default class Auth extends Component {

	state = {
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

	onChangeHandler = (event, controlName) => {
		console.log(`${controlName}: ${event.target.value} : ${typeof(event.target.value)} : ${event.target.value[event.target.value.length - 1]}`)
		const stateCopy = this.state;
		stateCopy.formControls[controlName].value = event.target.value;
		this.setState(stateCopy)
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
						>
							Войти
						</Button>
						<Button 
							type="primary" 
							onClick={this.registerHandler}
						>
							Зарегистрироваться
						</Button>
					</form>
				</div>
			</div>
		)
	}
}