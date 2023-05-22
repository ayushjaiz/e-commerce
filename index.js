const dotenv = require('dotenv')
dotenv.config();
const express = require('express')
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require('body-parser')

const dbConnect = require('./config/dbConnect');
const authRouter = require('./routes/authRoutes');
const { notFound, errorHandler } = require('./middlewares/errorHandler');

//database connection
dbConnect(process.env.MONGO_URL);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/user', authRouter);

//middleware
app.use(notFound);
app.use(errorHandler);

app.listen((PORT), () => {
    console.log(`Server runnning at http://localhost:${PORT}`)
})