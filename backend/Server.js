const express = require('express');
const { APP_PORT } = require('./config');
const routes = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(APP_PORT, () => {
    console.log(`Listening on ${APP_PORT}`);
});
