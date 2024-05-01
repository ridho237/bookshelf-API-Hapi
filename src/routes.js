const {
	addBook,
	getAllBooks,
	getBookById,
	editBook,
	deleteBook,
} = require('./handler');

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: addBook,
	},
	{
		method: 'GET',
		path: '/books',
		handler: getAllBooks,
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: getBookById,
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: editBook,
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: deleteBook,
	},
];

module.exports = routes;
