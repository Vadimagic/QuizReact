import React, { Component } from 'react'
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
	state = {
		results: {},
		isFifnished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [
			{
				question: "Когда вышел ES6?",
				rightAnswerId: 2,
				id: 1,
				answers: [
					{text: '2013', id: 1},
					{text: '2015', id: 2},
					{text: '2017', id: 3},
					{text: 'Он ещё не вышел', id: 4},
				]
			},
			{
				question: "React - это?",
				rightAnswerId: 3,
				id: 2,
				answers: [
					{text: 'Фреймворк', id: 1},
					{text: 'Плагин', id: 2},
					{text: 'Библиотека', id: 3},
					{text: 'Фэйсбук', id: 4},
				]
			},
			{
				question: "Самый быстрый язык программирования, из работающих в браузере?",
				rightAnswerId: 3,
				id: 3,
				answers: [
					{text: 'С++', id: 1},
					{text: 'Python', id: 2},
					{text: 'JavaScript', id: 3},
					{text: 'TypeScript', id: 4},
				]
			},
			{
				question: "JQuery - это?",
				rightAnswerId: 1,
				id: 4,
				answers: [
					{text: 'Библиотека', id: 1},
					{text: 'Плагин', id: 2},
					{text: 'Фреймворк', id: 3},
					{text: 'Движок JS', id: 4},
				]
			},
		]
	}

	onAnswerClickHandler = (answerId) => {
		if (this.state.answerState) {
			const key = Object.keys(this.state.answerState)[0]
			if (this.state.answerState[key] === 'success') {
				return 
			}
		}

		const question = this.state.quiz[this.state.activeQuestion]
		const results = this.state.results

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}

			this.setState({
				answerState: {[answerId]: 'success'},
				results
			})

			const timeout = setTimeout(() => {
				if (this.isQuizFinish()) {
					this.setState({
						isFifnished: true
					})
				} else {
					this.setState({
						activeQuestion: this.state.activeQuestion + 1,
						answerState: null
					})
				}

				clearTimeout(timeout)
			}, 1000)
			
		} else {
			results[question.id] = 'error'
			this.setState({
				answerState: {[answerId]: 'error'},
				results
			})
		}
	}

	isQuizFinish() {
		return this.state.activeQuestion + 1 === this.state.quiz.length
	}

	retryHandler = () => {
		this.setState({
			results: {},
			isFifnished: false,
			activeQuestion: 0,
			answerState: null
		})
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					{	
						this.state.isFifnished
						? <FinishedQuiz
								results={this.state.results}
								quiz={this.state.quiz}
								onRetry={this.retryHandler}
							/>
						: <ActiveQuiz 
							answers={this.state.quiz[this.state.activeQuestion].answers}
							number={this.state.activeQuestion + 1}
							question={this.state.quiz[this.state.activeQuestion].question}
							onAnswerClick={this.onAnswerClickHandler}
							quizLength={this.state.quiz.length}
							state={this.state.answerState}
						/>
					}
					
				</div>
			</div>
		)
	}
}

export default Quiz