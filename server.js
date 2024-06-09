const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// Sample data for images (in a real application, this would come from a database)
let images = [
    { id: 1, title: 'Nature', url: '/uploads/nature.jpg' },
    { id: 2, title: 'Technology', url: '/uploads/technology.jpg' },
    { id: 3, title: 'Business', url: '/uploads/business.jpg' }
];

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Get all images
app.get('/images', (req, res) => {
    res.json(images);
});

// Get image by ID
app.get('/images/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const image = images.find(img => img.id === id);
    if (image) {
        res.json(image);
    } else {
        res.status(404).send('Image not found');
    }
});

// Upload image
app.post('/upload', upload.single('image'), (req, res) => {
    const newImage = {
        id: images.length + 1,
        title: req.body.title,
        url: '/uploads/' + req.file.filename
    };
    images.push(newImage);
    res.send('Image uploaded successfully');
});

// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
