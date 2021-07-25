const path = require('path');
const dotenv = require('dotenv');

dotenv.config({
	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

const env = {
	NODE_ENV: process.env.NODE_ENV,
	PORT: process.env.PORT,
	MONGODB_URL: process.env.MONGODB_URL,
	SESSION_EXPIRATION: process.env.SESSION_EXPIRATION
};

module.exports = env;
