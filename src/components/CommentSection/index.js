import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Button, Comment, Divider, Form, Header, Message } from 'semantic-ui-react';

import { getCommentsByProductId, getObject, setObject } from '../../helpers/Storage';

const CommentText = ({text}) => (
	<>
		<Comment>
			<Comment.Content>
				<Comment.Text>{text}</Comment.Text>
			</Comment.Content>
		</Comment>
		<Divider/>
	</>
);

const ValidationMessage = () => (
	<Message negative size='tiny'>
		<Message.Header>This field is required</Message.Header>
	</Message>
)

const CommentSection = ({ productId, ...props }) => {
	const [comments, setComments] = useState(null);
	const [comment, setComment] = useState('');
	const [error, setError] = useState(false);


	useEffect(() => {
		const comments = getCommentsByProductId(productId);
		setComments(comments);
	}, [productId]);

	const onSubmitHandler = () => {
		if (comment) {
			const allComments = getObject('comments');
			const newComments = [...allComments];

			const commentObject = {
				productId: productId,
				text: comment,
				id: v4(),
			};

			newComments.push(commentObject);
			setObject('comments', newComments);

			setComment('');
			setComments(getCommentsByProductId(productId));
		} else {
			setError(true);
		}
	};

	const onChangeHandler = (e, {value}) => {
		if (value.length === 1) {
			setError(false);
		}
		setComment(value)
	};

	return (
		<Comment.Group>
			<Header as='h3' dividing>Comments</Header>

			{comments && comments.map(c => <CommentText text={c.text} key={c.id}/> )}

			<Form reply onSubmit={onSubmitHandler}>
				<Form.TextArea onChange={onChangeHandler} value={comment} error={error}/>
				{ error && <ValidationMessage/>}
				<Button content='Add Comment' labelPosition='left' icon='edit' primary />
			</Form>
		</Comment.Group>
	)
};

export default CommentSection;
