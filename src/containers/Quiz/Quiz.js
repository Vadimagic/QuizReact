import React, { Component } from 'react'
import classes from "./Quiz.module.css"
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from '../../components/UI/Loader/Loader'
import { connect } from 'react-redux'
import { fetchQuizById, quizAnswerClick, retryQuiz} from '../../redux/actions/quiz'

class Quiz extends Component {
	componentDidMount() {
		this.props.fetchQuizById(this.props.match.params.id)
	}

	componentWillUnmount() {
		this.props.retryQuiz()
	}

	render() {
		return (
			<div className={classes.Quiz}>
				<div className={classes.QuizWrapper}>
					{
						this.props.loading || !this.props.quiz
							? <Loader />
							:	<>
									<h1>Ответьте на все вопросы</h1>
									{	
										this.props.isFifnished
										? <FinishedQuiz
												results={this.props.results}
												quiz={this.props.quiz}
												onRetry={this.props.retryQuiz}
											/>
										: <ActiveQuiz 
											answers={this.props.quiz[this.props.activeQuestion].answers}
											number={this.props.activeQuestion + 1}
											question={this.props.quiz[this.props.activeQuestion].question}
											onAnswerClick={this.props.quizAnswerClick}
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
		quizAnswerClick: answerId => dispatch(quizAnswerClick(answerId)),
		retryQuiz: () => dispatch(retryQuiz())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)