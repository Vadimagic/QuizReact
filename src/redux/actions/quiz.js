import Axios from "../../axios/axios-quiz"
import { 
	FETCH_QUIZES_ERROR, 
	FETCH_QUIZES_START, 
	FETCH_QUIZES_SUCCESS, 
	FETCH_QUIZ_SUCCESS, 
	QUIZ_SET_STATE,
	FINISH_QUIZ,
	QUIZ_NEXT_QUESTION,
	QUIZ_RETRY
} from "./actionTypes"

export function fetchQuizes() {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const response = await Axios.get('/quizes.json')
			const quizes = []

			Object.keys(response.data).forEach((key, index) => {
				quizes.push({
					id: key,
					name: `Тест №${index + 1}`
				})
			})

			dispatch(fetchQuizesSuccess(quizes))

		} catch (e) {
			dispatch(fetchQuizesError(e))
		}
	}
}

export function fetchQuizById(quizId) {
	return async dispatch => {
		dispatch(fetchQuizesStart())
		try {
			const response = await Axios.get(`/quizes/${quizId}.json`)
			const quiz = response.data
			dispatch(fetchQuizSuccess(quiz))
		} catch (e) {
			dispatch(fetchQuizesError(e))
		}
	}
}

export function fetchQuizesStart() {
	return {
		type: FETCH_QUIZES_START
	}
}

export function quizSetState(answerState, results) {
	return {
		type: QUIZ_SET_STATE,
		answerState,
		results
	}
}

export function finishQuiz() {
	return {
		type: FINISH_QUIZ
	}
}

export function quizNextQuestion(questionNumber) {
	return {
		type: QUIZ_NEXT_QUESTION,
		number: questionNumber
	}
}

export function retryQuiz() {
	return {
		type: QUIZ_RETRY
	}
}

export function fetchQuizesSuccess(quizes) {
	return {
		type: FETCH_QUIZES_SUCCESS,
		quizes
	}
}

export function fetchQuizSuccess(quiz) {
	return {
		type: FETCH_QUIZ_SUCCESS,
		quiz
	}
}

export function fetchQuizesError(e) {
	return {
		type: FETCH_QUIZES_ERROR,
		error: e
	}
}

export function quizAnswerClick(answerId) {
	return async (dispatch, getState) => {
		const state =  getState().quiz

		if (state.answerState) {
			const key = Object.keys(state.answerState)[0]
			if (state.answerState[key] === 'success') {
				return 
			}
		}

		const question = state.quiz[state.activeQuestion]
		const results = state.results

		if (question.rightAnswerId === answerId) {
			if (!results[question.id]) {
				results[question.id] = 'success'
			}

			dispatch(quizSetState({[answerId]: 'success'}, results))

			const timeout = setTimeout(() => {
				if (isQuizFinish()) {
					dispatch(finishQuiz())
				} else {
					dispatch(quizNextQuestion(state.activeQuestion + 1))
				}

				clearTimeout(timeout)
			}, 1000)
			
		} else {
			results[question.id] = 'error'
			
			dispatch(quizSetState({[answerId]: 'error'}, results))
		}


		function isQuizFinish() {
			return state.activeQuestion + 1 === state.quiz.length
		}
	}
}