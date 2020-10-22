import React from 'react'
import classes from './AnswersList.module.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
	<ul className={classes.AnswersList}>
		{props.answers.map((answer) => {
			return (
				<AnswerItem 
					answer={answer} 
					key={answer.id}
					onAnswerClick={props.onAnswerClick}
				/>
			)
		})}
	</ul>
)

export default AnswersList