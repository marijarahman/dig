import React, { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { Button, Comment, Divider, Form, Header } from 'semantic-ui-react';

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

const CommentSection = ({ productId, ...props }) => {
	const [comments, setComments] = useState(null);
	const [comment, setComment] = useState('');

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
		}
	};

	const onChangeHandler = (e, {value}) => setComment(value);

	return (
		<Comment.Group>
			<Header as='h3' dividing>Comments</Header>

			{comments && comments.map(c => <CommentText text={c.text} key={c.id}/> )}

			<Form reply onSubmit={onSubmitHandler}>
				<Form.TextArea onChange={onChangeHandler} value={comment}/>
				<Button content='Add Comment' labelPosition='left' icon='edit' primary />
			</Form>
		</Comment.Group>
	)
};

export default CommentSection;
