const {nanoid} = require('nanoid');
const books = require('./books');

const addBook = (request, h) => {
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	if (!name) {
		const response = h.response({
			status: 'fail',
			message: 'Gagal menambahkan buku. Mohon isi nama buku',
		});
		response.code(400);
		return response;
	}

	if (readPage > pageCount) {
		const response = h.response({
			status: 'fail',
			message:
				'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
		});
		response.code(400);
		return response;
	}

	const finished = pageCount === readPage;

	const id = nanoid(16);
	const insertedAt = new Date().toISOString();
	const updateAt = insertedAt;

	const newBook = {
		id,
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		finished,
		reading,
		insertedAt,
		updateAt,
	};

	books.push(newBook);

	const response = h.response({
		status: 'success',
		message: 'Buku berhasil ditambahkan',
		data: {
			bookId: id,
		},
	});
	response.code(201);
	return response;
};

const getAllBooks = (request, h) => {
	let filter = [...books];

	const {name: queryName} = request.query;
	if (queryName) {
		const searchKeyword = queryName.toLowerCase();
		filter = filter.filter(bookItem =>
			bookItem.name.toLowerCase().includes(searchKeyword),
		);
	}

	const {reading} = request.query;
	if (reading !== undefined) {
		const isReading = parseInt(reading, 10) === 1;
		filter = filter.filter(bookItem => bookItem.reading === isReading);
	}

	const {finished} = request.query;
	if (finished !== undefined) {
		const isFinished = parseInt(finished, 10) === 1;
		filter = filter.filter(bookItem => bookItem.finished === isFinished);
	}

	const response = h.response({
		status: 'success',
		data: {
			books: filter.map(({id, name, publisher}) => ({id, name, publisher})),
		},
	});
	response.code(200);
	return response;
};

const getBookById = (request, h) => {
	const {id} = request.params;
	const book = books.find(bookItem => bookItem.id === id);

	if (book) {
		book.updatedAt = book.insertedAt;
		const response = h.response({
			status: 'success',
			data: {
				book,
			},
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku tidak ditemukan',
	});
	response.code(404);
	return response;
};

const editBook = (request, h) => {
	const {id} = request.params;
	const {
		name,
		year,
		author,
		summary,
		publisher,
		pageCount,
		readPage,
		reading,
	} = request.payload;

	const index = books.findIndex(bookItem => bookItem.id === id);

	if (index !== -1) {
		if (!name) {
			const response = h.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Mohon isi nama buku',
			});
			response.code(400);
			return response;
		}

		if (readPage > pageCount) {
			const response = h.response({
				status: 'fail',
				message:
					'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
			});
			response.code(400);
			return response;
		}

		books[index] = {
			...books[index],
			name,
			year,
			author,
			summary,
			publisher,
			pageCount,
			readPage,
			reading,
			updatedAt: new Date().toISOString(),
		};

		const response = h.response({
			status: 'success',
			message: 'Buku berhasil diperbarui',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Gagal memperbarui buku. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

const deleteBook = (request, h) => {
	const {id} = request.params;
	const index = books.findIndex(book => book.id === id);

	if (index !== -1) {
		books.splice(index, 1);
		const response = h.response({
			status: 'success',
			message: 'Buku berhasil dihapus',
		});
		response.code(200);
		return response;
	}

	const response = h.response({
		status: 'fail',
		message: 'Buku gagal dihapus. Id tidak ditemukan',
	});
	response.code(404);
	return response;
};

module.exports = {
	addBook,
	getAllBooks,
	getBookById,
	editBook,
	deleteBook,
};
