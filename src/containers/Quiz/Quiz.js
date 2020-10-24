import React, { Component } from 'react'
import Axios from '../../axios/axios-quiz'
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'

class Quiz extends Component {
	state = {
		results: {},
		isFifnished: false,
		activeQuestion: 0,
		answerState: null,
		quiz: [],
		loading: true
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

	async componentDidMount() {
		try {
			const response = await Axios.get(`/quizes/${this.props.match.params.id}.json`)

			const quiz = response.data

			this.setState({
				quiz,
				loading: false
			})
		} catch (e) {
			console.log(e)
		}
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					{
						this.state.loading
							? <Loader />
							:	<>
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
								</>
					}
					
				</div>
			</div>
		)
	}
}

export default Quiz