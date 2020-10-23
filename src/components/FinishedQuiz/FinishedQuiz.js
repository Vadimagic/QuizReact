import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from '../UI/Button/Button'
import { Link } from 'react-router-dom'

const FinishedQuiz = (props) => {
	const successCount = Object.keys(props.results).reduce((s, item) => props.results[item] === "success" ? s + 1 : s, 0)

	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				{
					props.quiz.map((quizItem) => {
						const cls = [
							'fa',
							props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
							classes[props.results[quizItem.id]]
						]
						return (
							<li key={quizItem.id}>
								<i className={cls.join(" ")}/>&nbsp;
								<strong>{quizItem.id}.</strong>&nbsp;
								{quizItem.question}
							</li>
						)
					})
				}
			</ul>
			<p>Правильно {successCount} из {props.quiz.length}</p>

			<div>
				<Button onClick={props.onRetry}>Повторить</Button>
				<Link to="/">
					<Button type={'primary'}>Перейти в список тестов</Button>
				</Link>
			</div>
		</div>
	)
}

export default FinishedQuiz