import React from 'react'
import {
	BrowserRouter,
  Redirect,
	withRouter
} from 'react-router-dom'
import * as storage from 'common/storage'


export default class Signout extends React.Component {

	constructor() {
		super()

		storage.delete('token')
	}

	render() {
		return (
			<Redirect to={{
				pathname: '/'
			}}/>
		)
	}
}
