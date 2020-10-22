import React from 'react'
import classes from './FinishedQuiz.module.css'

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
								<strong>{quizItem.id + 1}.</strong>&nbsp;
								{quizItem.question}
								<i className={cls.join(" ")}/>
							</li>
						)
					})
				}
			</ul>
			<p>Правильно {successCount} изи {props.quiz.length}</p>

			<div>
				<button onClick={props.onRetry}>Повторить</button>
			</div>
		</div>
	)
}

export default FinishedQuiz