import React from 'react'
import {
  Link
} from 'react-router-dom'
import * as storage from 'common/storage'


export default class PostItem extends React.Component {

	constructor(props) {
		super(props)

		this.replyText = `@${this.props.author._microblog.username} `
		this.count = this.replyText.length
		this.maxLength = 280

		this.state = {
			replying: false,
			favorite: props._microblog.is_favorite
		}
	}


	reply = (e) => {
		e.preventDefault()
		this.setState({
			replying: !this.state.replying
		})
	}


	favorite = () => {
		let formData = new FormData()
		formData.append('id', this.props.id)

		fetch(`https://micro.blog/posts/favorites`, {
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
			this.setState({
				favorite: true
			})
		})
	}


	unFavorite = () => {
		fetch(`https://micro.blog/posts/favorites/${this.props.id}`, {
			method: 'DELETE',
			headers: {
				'Authorization': `Token ${storage.get('token')}`
			}
		})
		.then((response) => {
			return response.json()
		})
		.then((response) => {
			this.setState({
				favorite: false
			})
		})
	}


	deletePost = () => {

	}


	setCount = (length) => {
		this.count = length
	}


	replyTextarea = (e) => {
		this.setState({
			replyText: e.target.value
		}, this.setCount(e.target.value.length))
	}


	saveReplyPost = () => {
		let formData = new FormData()
		formData.append('id', this.props.id)
		formData.append('text', this.state.replyText)

		fetch(`https://micro.blog/posts/reply`, {
			method: 'POST',
			body: formData,
			headers: {
				'Authorization': `Token ${storage.get('token')}`
			}
		})
		.then((response) => {
			const contentType = response.headers.get('content-type')
			if ( contentType && contentType.indexOf('application/json') !== -1 ) {
				return response.json()
			} else {
				throw new Error('Error replying, non JSON response')
			}
		})
		.then((response) => {
			this.setState({
				replying: false
			})
		})
		.catch((error) => {
			console.log(`Error with reply - ${error.message}`)
		})
	}



	/**
	 * Render Functions
	 */
	createMarkup() {
		return {
			__html: this.props.content_html
		}
	}


	renderReplyButton() {
		return (
			<a onClick={this.reply}>Reply</a>
		)
	}


	renderFavoriteButton() {
		if ( this.state.favorite ) {
			return (
				<a onClick={this.unFavorite}>UnFavorite</a>
			)
		} else {
			return (
				<a onClick={this.favorite}>Favorite</a>
			)
		}
	}


	renderDeleteButton() {
		return
		if ( this.props._microblog.is_deletable ) {
			return (
				<a href="#" onClick={this.deletePost}>Delete</a>
			)
		}
	}


	renderReplyBox() {
		if ( this.state.replying ) {
			return (
				<div className="post_replybox">
					<form className="form-horizontal" role="form">
						<div className="form-group">
							<div className="col-sm-12">
								<textarea className="form-control post_textarea" rows="3" onChange={this.replyTextarea} defaultValue={this.replyText} autoFocus></textarea>
							</div>
						</div>
						<div className="form-group">
							<div className="col-sm-12" style={{textAlign: 'right'}}>
								<span className={`${this.count > this.maxLength ? 'text-danger' : ''}`}>{this.count}/{this.maxLength}</span>
								<button type="reset" className="btn btn-default replybox_button" onClick={this.reply}>Cancel</button>
								<button type="submit" className="btn btn-default replybox_button" onClick={this.saveReplyPost} disabled={this.count > this.maxLength || this.count === 0}>Post</button>
							</div>
						</div>
					</form>
				</div>
			)
		}
	}


	render() {
		return (
			<div className="post">
				<div className="post_avatar">
					<Link to={`/user/${this.props.author._microblog.username}`} replace>
						<img src={this.props.author.avatar} width="48" height="48" />
					</Link>
				</div>
				<div className="post_content">
					<div className="post_username">
						<Link to={`/user/${this.props.author._microblog.username}`} replace>
							{this.props.author.name}
						</Link>
					</div>

					<div className="post_text" dangerouslySetInnerHTML={this.createMarkup()} />

					<div className="post_options">
						<div className="post_time">
							{this.props._microblog.date_relative}
						</div>

						{this.renderReplyButton()}
						{this.renderFavoriteButton()}
						{this.renderDeleteButton()}
					</div>

					{this.renderReplyBox()}

				</div>
			</div>
		)
	}


}

/**

	<div className="post_divider">|</div>
	<div className="post_reply"><a href="#">Reply</a></div>
	<div className="post_divider">|</div>
	<div className="post_favorite"><a href="#">Favorite</a></div>

 */
