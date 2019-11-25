import React from 'react'
import {
	BrowserRouter,
  Redirect,
	withRouter
} from 'react-router-dom'
import * as storage from 'common/storage'


export default class Login extends React.Component {

	constructor() {
		super()

		this.state = {
			loggedIn: false,
			token: ''
		}
	}

	appToken = (e) => {
		this.setState({
			token: e.target.value
		})
	}


	save = (e) => {
		if ( this.state.token.length ) {
			storage.set('token', this.state.token)
			this.setState({
				loggedIn: true
			})
		}
	}



	render() {
		if ( this.state.loggedIn ) {
			return (
				<Redirect to={{
					pathname: '/'
				}}/>
			)
		}
		return (
			<div>
				<h1></h1>
				<p>
					Enter a micro.blog app token below to login in.
				</p>

				<div className="form-group">
					<input type="text" placeholder="Enter App Token" className="form-control" onChange={this.appToken} />
				</div>
				<button className="btn btn-default" onClick={this.save}>Login</button>

				<hr />

				<p>
					To get your app token, or create one specific to this application go to your
					account page on micro.blog and click "Edit Apps". Go directly to
					the <a href="https://micro.blog/account/apps">Edit Apps page</a>, and use an
					existing token or create a new one. <br />
					<small><em>* We recommend creating a new one specifc to this application.</em></small>
				</p>
			</div>
		)
	}
}
