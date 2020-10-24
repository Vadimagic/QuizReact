import axios from 'axios'

export default axios.create({
	baseURL: 'https://quizreactjs.firebaseio.com/'
})