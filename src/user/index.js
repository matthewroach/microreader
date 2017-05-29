import React from 'react'
import {
  Link
} from 'react-router-dom'
import * as storage from 'common/storage'

import PostItem from '../timeline/PostItem'


export default class User extends React.Component {

	constructor(props) {
		super(props)

		this.username = this.props.match.params.username
		this.state = {
			loading: true
		}

		this.loadData()
	}


	followUser = () => {
		let formData = new FormData()
		formData.append('username', this.username)

		const api = this.state.user._microblog.is_following ? 'unfollow' : 'follow'

		fetch(`https://micro.blog/users/${api}`, {
			method: 'POST',
			body: formData,
			headers: {
				'Authorization': `Token ${storage.get('token')}`
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.loadData()
		})

	}


	loadData() {
		fetch(`https://micro.blog/posts/${this.username}`, {
			headers: {
				'Authorization': `Token ${storage.get('token')}`
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.setState({
				loading: false,
				user: response
			})
		})
	}


	render() {
		if ( !this.state.loading ) {
			return (
				<div>
					<div className="alert alert-info" role="alert" id="timeline_info">
						<b>{this.state.user.author.name}</b> —&nbsp;
						<div id="follow_div">
							<a onClick={this.followUser}>{this.state.user._microblog.is_following ? 'Unfollow' : 'Follow'}</a>
						</div>

						<br />
							@{this.state.user._microblog.username}
						<br />

						<a href={this.state.user.author.url}>{this.state.user.author.url}</a>
					</div>

					<div className="posts">
						{this.state.user.items.map((item, i) => {
							return <PostItem {...item} key={item.id} />
						})}
					</div>
				</div>
			)
		} else {
			return (
				<h2>Loading</h2>
			)
		}
	}
}
