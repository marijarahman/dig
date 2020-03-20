import React, { useEffect, useContext } from 'react';
import { Card } from 'semantic-ui-react'

import SingleProduct from '../../components/SingleProduct';
import { MyContext } from '../../context/MyProvider';

const Products = () => {
	const contextValue = useContext(MyContext);

	useEffect(() => {
		contextValue.getAllProducts()
	}, []);

	return (
		<Card.Group itemsPerRow={3}>
			<MyContext.Consumer>
				{context => (
					<>
						{context.products && context.products.map(p => <SingleProduct product={p} key={p.id}/>)}
					</>
				)}
			</MyContext.Consumer>
		</Card.Group>
	)
};

export default Products;
