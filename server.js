const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const dotenv = require('dotenv');
const dirRouter = require('./routes/dir/directory');
const rolesRouter = require('./routes/roles/roles');
const authMiddleware = require('./middleware/auth_middleware');
const getUploadedFileById = require('./controllers/dir/get_uploaded_file');
const User = require('./models/user');
const http = require('http');
const socketIO = require('socket.io');
const { socketAuthMiddleware } = require('./middleware/io_middleware');
const pdf_router = require('./routes/pdf_service/pdf_router');
const updateProgressStatus = require('./func/update_pdf_io_status');
const pdf_router_get = require('./routes/pdf_service/pdf_router_get');
const faceRecogRedirect = require('./routes/face_recognition_redirect/facerecog');

dotenv.config()

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
        origin: "*", // Allow all origins
        methods: ["GET", "POST"],
        credentials: true

    }
});

const port = process.env.PORT;

// Middleware to parse JSON requests
app.use(bodyParser.json());

// Middleware to parse URL-encoded requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use("/facerecog",faceRecogRedirect)

// Socket.IO connection handling
io.on('connection', async (socket) => {

    try {
        if (socket.handshake.auth.connection == 'pdf_service' || socket.handshake.query.connection == 'pdf_service') {
            socket.on("conversion_status", async (data) => {
                console.log("Received status update", data)
                await updateProgressStatus(data, socket)
            })


        } else {
            await socketAuthMiddleware(socket);
            console.log(socket.user)
            socket.joinUserRoom(socket.user._id.toString());
        }
    } catch (e) {
        console.log('Error connecting ', e)
    }

    app.use("/pdf", pdf_router)
    app.use("/pdf-get", pdf_router_get)
  

    // Handle errors
    socket.on('error', (error) => {
        console.error('Socket error:', error);
        socket.emit('error', {
            type: 'SOCKET_ERROR',
            message: 'An error occurred',
            details: error.message
        });
    });

    // Handle client disconnect
    socket.on('disconnect', () => {
        console.log('Client disconnected', socket.id);

        // Notify all connected clients about the disconnection
        io.emit('user_disconnected', {
            userId: socket.id,
            message: `User ${socket.id} disconnected`
        });
    });
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(async () => {
    const email = await User.findOne({ email: "ivan.simon@testAD.voda" });
    if (!email) {
        const newUser = new User({
            username: "ivan.TestUser",
            email: "ivan.simon@vm.co.mz",
            department: "IT",
            ticketId: "default",
            roles: ["Admin"],
            status: "Active"
        });
        await newUser.save();
        console.log('Created default admin user');
        
    }
    console.log('Connected to MongoDB');
}).catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Define routes


app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use("/auth", userRouter);
  // routes
  

// Get Uploaded file
app.get('/directories/uploaded-file/:id', getUploadedFileById);

app.use("/*", authMiddleware);

app.use('/directories', dirRouter);
app.use("/roles", rolesRouter);

// Start the server (using 'server' instead of 'app')
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});