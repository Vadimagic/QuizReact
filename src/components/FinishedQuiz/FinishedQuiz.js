import React from 'react'
import classes from './FinishedQuiz.module.css'

const FinishedQuiz = () => {
	return (
		<div className={classes.FinishedQuiz}>
			<ul>
				<li>
					<strong>1.</strong>
					How are you?
					<i className={`fa fa-times ${classes.error}`} />
				</li>
				<li>
					<strong>2.</strong>
					How are you?
					<i className={`fa fa-check ${classes.success}`} />
				</li>
			</ul>
			<p>Правильно 4 изи 10</p>

			<div>
				<button>Повторить</button>
			</div>
		</div>
	)
}

export default FinishedQuiz