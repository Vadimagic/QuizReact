import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import classes from './Drawer.module.css'

class Drawer extends Component {
	renderLinks(links) {
		return links.map((link, index) => {
			return (
				<li key={index}>
					<NavLink 
						to={link.to} 
						exact={link.exact}
						activeClassName={classes.active}
						onClick={this.props.onClose}
					>
						{link.label}
					</NavLink>
				</li>
			)
		})
	}
	
	render() {
		const cls = [classes.Drawer]

		if (!this.props.isOpen) {
			cls.push(classes.close)
		}

		const links = [
			{to: '/', label: "Список", exact: true}
		]

		if (this.props.isAuthenticated) {
			links.push({to: '/quiz-creator', label: "Создать тест", exact: true})
			links.push({to: '/logout', label: "Выйти", exact: true})
		} else {
			links.push({to: '/auth', label: "Авторизация", exact: true})
		}

		return (
			<>
				<nav className={cls.join(" ")}>
					<ul>
						{this.renderLinks(links)}
					</ul>
				</nav>
				{this.props.isOpen ? <Backdrop onClick={this.props.onClose} /> : null}
			</>
			
		)
	}
}

export default Drawer