const API_URL = 'http://private-5815fe-recommendationsknip.apiary-mock.com/products';

export const getAllProducts = () => {
	return fetch(API_URL).then(response => response.clone().json());
};

export const getSingleProduct = (id) => {
	return fetch(API_URL).then(r => r.clone().json())
	.then((json) => json.find(product => product.id === parseInt(id)));
};
