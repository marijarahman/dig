import React, { useContext, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import {Item, Button, Icon, Header, Segment, Label} from 'semantic-ui-react';

import CommentSection from '../../components/CommentSection';
import Gallery from '../../components/Gallery';
import { MyContext } from '../../context/MyProvider';

import './Product.scss';

const Product = (props) => {
	const contextValue = useContext(MyContext);
	const productId = props.match.params.id;

	useEffect(() => {
		contextValue.getSingleProduct(productId);
	}, [productId]);

	const onGoBackHandler = () => {
		props.history.goBack();
		contextValue.removeSingleProduct(productId);
	};

	return (
		<Segment basic>
			<Button icon onClick={onGoBackHandler} basic color='grey'>
				<Icon name='chevron left'/> Back
			</Button>
			<MyContext.Consumer>
				{({singleProduct}) => (
					<Segment basic padded={'very'}>
						{singleProduct && (
							<>
								<Item.Group>
									<Item>
										<Item.Content>
											<Header size='large' as='h1'>{singleProduct.title}</Header>
											<Item.Meta>
												<Label as='span' color='blue' tag>
													{singleProduct.price}$
												</Label>
											</Item.Meta>
											<Item.Meta>Description</Item.Meta>
											<Item.Description>
												<p>{singleProduct.description}</p>
											</Item.Description>
											<Item.Meta>Specification</Item.Meta>
											<Item.Description>
												<p>{singleProduct.specification}</p>
											</Item.Description>
											<Gallery images={singleProduct.images} />
										</Item.Content>
									</Item>
								</Item.Group>
								<CommentSection productId={productId}/>
							</>
						)}
					</Segment>
				)}
			</MyContext.Consumer>
		</Segment>
	)
};

export default withRouter(Product);
