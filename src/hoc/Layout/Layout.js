import React, { Component } from 'react'
import { connect } from 'react-redux'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import classes from './Layout.module.css'

class Layout extends Component {
	state = {
		menu: false
	}

	toggleMenuHandler = () => {
		this.setState({
			menu: !this.state.menu
		})
	}

	render() {
		return (
			<div className={classes.Layout}>

				<Drawer
					isOpen={this.state.menu}
					onClose={this.toggleMenuHandler}
					isAuthenticated={this.props.isAuthenticated}
				/>

				<MenuToggle
					onToggle={this.toggleMenuHandler}
					isOpen={this.state.menu}
				/>

				<main>
					{this.props.children}
				</main>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		isAuthenticated: !!state.auth.token
	}
}

export default connect(mapStateToProps)(Layout)