# Bookshelf-App backend Using Hapi

## Important Instalation

In this project you should install some dependencies to run perfectly, you can run:

### `npm install nodemon --save-dev`
### `npm install eslint --save-dev`
### `npm install nanoid@3.x.x `
### `npm install @hapi/hapi`

## Running Apps

To run this backend server you can run:

### `npm start` (without nodemon)
### `npm run start-dev` (with nodemon)

## Note

My code uses Eslint with the style guide format (standard).
The reason I chose standard is because when using the (Airbnb) version, I had trouble in the
#### const __filename = fileURLToPath(import.meta.url);
in the eslint.config.mjs file
but when I use the version (standard) and I run eslint. --fix it works
and there are no errors in eslint whether my knowledge is lacking or indeed that's my limit

## Testing API

For example you can try this code on this postman test file 
you can import to your postman collection and environment:

(https://github.com/dicodingacademy/a261-backend-pemula-labs/raw/099-shared-files/BookshelfAPITestCollectionAndEnvironment.zip)
