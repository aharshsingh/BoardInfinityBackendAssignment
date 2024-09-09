const express = require('express');
const { APP_PORT } = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const cors = require("cors");
const { Sequelize } = require('sequelize');

const connection = async ()=>{
    const sequelize = new Sequelize('database', 'username', 'password', {
        host: 'localhost',
        dialect: 'postgres'
      });
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
};

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}`);
});
