import React, { Component, Fragment } from 'react'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import { createControl } from '../../form/formFramework'
import classes from './QuizCreator.module.css'

function createOptionControl(number) {
	return createControl({
		label: `Вариант ${number}`,
		errorMessage: 'Значение не может быть пустым',
		id: number
	}, {
		required: true
	})
}

function createFormControls() {
	return {
		question: createControl({
			label: 'Введите вопрос',
			errorMessage: 'Вопрос не может быть пустым'
		}, {
			required: true
		}),
		option1: createOptionControl(1),
		option2: createOptionControl(2),
		option3: createOptionControl(3),
		option4: createOptionControl(4)
	}
}

export default class QuizCreator extends Component {

	state = {
		quiz: [],
		formControls : createFormControls()
	}

	submitHandler = e => {
		e.preventDefault()
	}

	addQuestionHandler = () => {

	}

	createQuizHandler = () => {

	}

	validateControl(value, validation) {
		if (!validation) {
			return true
		}

		let isValid = true;
		value = value.trim()	

		if (validation.required) {
			isValid = value !== '' && isValid
		}

		return isValid;
	}

	changeHandler = (value, controlName) => {
		const formControls = {...this.state.formControls}
		const control = formControls[controlName]

		control.value = value
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

	renderControls() {
		return Object.keys(this.state.formControls).map((controlName, index) => {
			const control = this.state.formControls[controlName]
			return (
				<Fragment key={controlName + index}>
					<Input 
						label={control.label}
						value={control.value}
						errorMessage={control.errorMessage}
						valid={control.valid}
						touched={control.touched}
						shouldValidate={!!control.validation}
						onChange={(event) => this.changeHandler(event.target.value, controlName)}
					/>
					{index === 0 ? <hr/> : null}
				</Fragment>
			)
		})
	}
	
	render() {
		return (
			<div className={classes.QuizCreator}>
				<div>
					<h1>Создание теста</h1>

					<form onSubmit={this.submitHandler}>
						
						{this.renderControls()}
						<select></select>
						<Button
							type='primary'
							onClick={this.addQuestionHandler}
						>
							Добавить вопрос
						</Button>

						<Button
							type='success'
							onClick={this.createQuizHandler}
						>
							Создать тест
						</Button>
					</form>
				</div>
			</div>
		)
	}
}