import React, { useState } from 'react';
import { getAllProducts, getSingleProduct } from '../API/ProductsAPI';

export const MyContext = React.createContext();

export const MyProvider = (props) => {
	const [products, setProducts] = useState(null);
	const [singleProduct, setSingleProduct] = useState(null);

	const getAllProductsAction = async () => {
		const products = await getAllProducts();
		setProducts(products)
	};

	const getSingleProductAction = async (id) => {
		const product = await getSingleProduct(id);
		setSingleProduct(product);
	};

	const removeSingleProductAction = () => {
		setSingleProduct(null);
	};

	return (
		<MyContext.Provider
			value={{
				getAllProducts: () => getAllProductsAction(),
				products,
				singleProduct,
				getSingleProduct: (id) => getSingleProductAction(id),
				removeSingleProduct: () => removeSingleProductAction(),
			}}
		>
			{props.children}
		</MyContext.Provider>
	)
};

export default MyProvider;
