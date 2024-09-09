const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    APP_PORT : process.env.APP_PORT,
    JWT_SECRET : process.env.JWT_SECRET
}