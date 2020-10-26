import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { validate } from '../../form/formFramework'
import classes from './Auth.module.css'
import { connect } from 'react-redux'
import {auth} from '../../redux/actions/auth'

class Auth extends Component {

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

	loginHandler = () => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			true
		)
	}

	registerHandler =() => {
		this.props.auth(
			this.state.formControls.email.value,
			this.state.formControls.password.value,
			false
		)
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

function mapDispatchToProps(dispatch) {
	return {
		auth: (email, password, isLogin) => dispatch(auth(email, password, isLogin))
	}
} 

export default connect(null, mapDispatchToProps)(Auth)