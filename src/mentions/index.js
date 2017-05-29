import React from 'react'
import {
  Link
} from 'react-router-dom'
import * as storage from 'common/storage'

import PostItem from '../timeline/PostItem'

export default class Mentions extends React.Component {

	constructor(props) {
		super(props)

		this.state = {
			loading: true
		}

		this.loadData()
	}


	loadData() {
		fetch(`https://micro.blog/posts/mentions`, {
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
