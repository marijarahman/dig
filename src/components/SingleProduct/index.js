import React from 'react';
import { Card, Image, Label } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';

import './SingleProduct.scss';

const SingleProduct = ({ product, ...props }) => {
	const { title, images, price, id } = product;

	return (
		<Card onClick={() => {props.history.push(`/products/${id}`)}} fluid color='blue'>
			<Image src={images[0].thumb} wrapped ui={false} size={'small'}/>
			<Card.Content>
				<Card.Header>{title}</Card.Header>
				<Card.Description>
					<Label as='span' color='blue' tag>
						{price}$
					</Label>
				</Card.Description>
			</Card.Content>
		</Card>
	)
};

export default withRouter(SingleProduct);
