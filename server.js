const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const dirRouter = require('./routes/dir/directory');
const rolesRouter = require('./routes/roles/roles');
const authMiddleware = require('./middleware/auth_middleware');


dotenv.config()

const app = express();
const port = process.env.PORT;


// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for all routes
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});


// Define a simple route

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/auth",userRouter)

app.use("/*",authMiddleware)
// Use the directory and file routes
app.use('/directories', dirRouter);
// roles
app.use("/roles", rolesRouter)
// User router



// Define a route to handle POST requests


// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});