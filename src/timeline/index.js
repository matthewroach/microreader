import React from 'react'
import {
	BrowserRouter,
  Redirect,
	withRouter
} from 'react-router-dom'
import * as storage from 'common/storage'


import Login from '../login'
import PostItem from './PostItem'


export default class Timeline extends React.Component {

	constructor() {
		super()

		this.state = {
			newItems: 0,
			loading: true
		}

		if ( storage.get('token') ) {
			this.loadTimeline()
		}
	}


	componentWillUnmount() {
		clearInterval(this.interval)
	}


	startInterval() {
		this.interval = setInterval(this.checkForNew, 120000)
	}


	checkForNew = () => {
		const sinceId = this.state.timeline.items[0].id
		clearInterval(this.interval)

		fetch(`https://micro.blog/posts/check?since_id=${sinceId}`, {
			headers: {
				'Authorization': `Token ${storage.get('token')}`
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.setState({
				newItems: response.count
			}, this.startInterval)
		})
	}


	loadTimeline = () => {
		clearInterval(this.interval)

		fetch('https://micro.blog/posts/all', {
			headers: {
				'Authorization': `Token ${storage.get('token')}`
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.setState({
				newItems: 0,
				loading: false,
				timeline: response
			}, this.startInterval)
		})
	}


	renderNewAlert() {
		if ( this.state.newItems > 0 ) {
			return (
				<div className="alert alert-info" role="alert" onClick={this.loadTimeline}>
					<b>{this.state.newItems}</b> {this.state.newItems > 1 ? 'new posts.': 'new post'}
				</div>
			)
		}
	}


	renderPosts() {
		return (
			<div className="posts">
				{this.state.timeline.items.map((item, i) => {
					return <PostItem {...item} key={item.id} />
				})}
			</div>
		)
	}


	render() {
		if ( !storage.get('token') ) {
			return (
				<Redirect to={{
					pathname: '/login'
				}}/>
			)
		}

		if ( !this.state.loading ) {
			return (
				<div>
				{this.renderNewAlert()}
				{this.renderPosts()}
				</div>
			)
		} else {
			return (
				<h2>Loading</h2>
			)
		}
	}
}
