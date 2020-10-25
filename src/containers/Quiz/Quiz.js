import React, { Component } from 'react'
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById } from '../../redux/actions/quiz'

class Quiz extends Component {
	onAnswerClickHandler = (answerId) => {
		if (this.props.answerState) {
			const key = Object.keys(this.props.answerState)[0]
			if (this.props.answerState[key] === 'success') {
				return 
			}
		}

		const question = this.props.quiz[this.props.activeQuestion]
		const results = this.props.results

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
						activeQuestion: this.props.activeQuestion + 1,
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
		return this.props.activeQuestion + 1 === this.props.quiz.length
	}

	retryHandler = () => {
		this.setState({
			results: {},
			isFifnished: false,
			activeQuestion: 0,
			answerState: null
		})
	}

	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					{
						this.props.loading && !this.props.quiz
							? <Loader />
							:	<>
									<h1>Ответьте на все вопросы</h1>
									{	
										this.props.isFifnished
										? <FinishedQuiz
												results={this.props.results}
												quiz={this.props.quiz}
												onRetry={this.retryHandler}
											/>
										: <ActiveQuiz 
											answers={this.props.quiz[this.props.activeQuestion].answers}
											number={this.props.activeQuestion + 1}
											question={this.props.quiz[this.props.activeQuestion].question}
											onAnswerClick={this.onAnswerClickHandler}
											quizLength={this.props.quiz.length}
											state={this.props.answerState}
										/>
									}
								</>
					}
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		results: state.quiz.results,
		isFifnished: state.quiz.isFifnished,
		activeQuestion: state.quiz.activeQuestion,
		answerState: state.quiz.answerState,
		quiz: state.quiz.quiz,
		loading: state.quiz.loading
	}
}

function mapDispatchToProps(dispatch) {
	return {
		fetchQuizById: id => dispatch(fetchQuizById(id)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)