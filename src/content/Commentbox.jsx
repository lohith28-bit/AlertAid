import React, { useState } from "react";
import './commentbox.css'

const Commentbox = () => {
	const [comments, setComments] = useState([]);
	const [newComment, setNewComment] = useState("");

	const handleChange = (e) => {
		setNewComment(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setComments([...comments, newComment]);
		setNewComment("");
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<textarea
					value={newComment}
					onChange={handleChange}
					placeholder="Add a comment..."
				/>
				<button type="submit">Send</button>
			</form>
			<ul>
				{comments.map((comment, index) => (
					<li key={index}>You sent :  <b>{comment}</b></li>
				))}
			</ul>
		</div>
	);
};

export default Commentbox;
