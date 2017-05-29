import React from 'react'
import { render } from 'react-dom'
import {
	HashRouter as Router,
	Route,
	Link
} from 'react-router-dom'
import * as storage from 'common/storage'


import Favorites from 'favorites'
import Login from 'login'
import Mentions from 'mentions'
import Post from 'post'
import Signout from 'signout'
import Timeline from 'timeline'
import User from 'user'


const Nav = () => (
	storage.get('token') !== undefined &&
	<div id="navbar" className="nav">
		<Link to="/" replace>Home</Link> <div className="nav_divider"> | </div>
		<Link to="/mentions" replace>Mentions</Link> <div className="nav_divider"> | </div>
		<Link to="/favorites" replace>Favorites</Link> <div className="nav_divider"> | </div>
		<Link to="/signout" replace>Sign Out</Link>
	</div>
)


const App = () => (
	<Router>
		<div>
			<Route exact={true} path='/' component={Timeline} />
			<Route path='/mentions' component={Mentions} />
			<Route path='/favorites' component={Favorites} />
			<Route path='/signout' component={Signout} />

			<Route path='/user/:username' component={User} />
			<Route path='/post/:id' component={Post} />

			<Route path='/login' component={Login} />

			<Nav />

		</div>
	</Router>
)
render(<App />, document.getElementById('app'))
