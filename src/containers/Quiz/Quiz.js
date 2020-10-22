import React, { Component } from 'react'
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'

class Quiz extends Component {
	state = {
		activeAnswer: 0,
		quiz: [
			{
				question: "Какое у тебя настроение?",
				rightAnswerId: 1,
				answers: [
					{text: 'Отлично', id: 1},
					{text: 'Хорошо', id: 2},
					{text: 'Относительно', id: 3},
					{text: 'Плохо', id: 4},
				]
			}
		]
	}

	onAnswerClickHandler = answerId => {
		console.log('Answer Id: ', answerId)
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					<h1>Ответьте на все вопросы</h1>
					<ActiveQuiz 
						answers={this.state.quiz[0].answers}
						number={this.state.activeAnswer + 1}
						question={this.state.quiz[0].question}
						onAnswerClick={this.onAnswerClickHandler}
						quizLength={this.state.quiz.length}
					/>
				</div>
			</div>
		)
	}
}

export default Quiz