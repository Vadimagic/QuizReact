import React, { Component } from 'react'
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
	state = {
		activeQuestion: 0,
		quiz: [
			{
				question: "Когда вышел ES6?",
				rightAnswerId: 2,
				id: 0,
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
				id: 1,
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
				id: 2,
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
				id: 3,
				answers: [
					{text: 'Библиотека', id: 1},
					{text: 'Плагин', id: 2},
					{text: 'Фреймворк', id: 3},
					{text: 'Движок JS', id: 4},
				]
			},
		]
	}

	onAnswerClickHandler = answerId => {
		console.log('Answer Id: ', answerId)

		this.setState({
			activeQuestion: this.state.activeQuestion + 1
		})
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					<ActiveQuiz 
						answers={this.state.quiz[this.state.activeQuestion].answers}
						number={this.state.activeQuestion + 1}
						question={this.state.quiz[this.state.activeQuestion].question}
						onAnswerClick={this.onAnswerClickHandler}
						quizLength={this.state.quiz.length}
					/>
				</div>
			</div>
		)
	}
}

export default Quiz