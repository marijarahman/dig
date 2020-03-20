export const setObject = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};

export const getObject = (key) => {
	const value = localStorage.getItem(key);
	return value ? JSON.parse(value) : [];
};

export const getCommentsByProductId = (id) => {
	const comments = getObject('comments');
	return comments ? comments.filter(c => c.productId === id) : [];
};
