<<<<<<< HEAD
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connection
 mongoose.connect('mongodb://127.0.0.1:27017/auth_demo')
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error('MongoDB connection error:', err));

// User schema


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    res.json({ success: true, message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Username already exists' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// const PORT = process.env.PORT || 3000;
const PORT=3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
=======
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('public'));

// MongoDB connection
 mongoose.connect('mongodb://127.0.0.1:27017/auth_demo')
   .then(() => console.log('MongoDB connected'))
   .catch(err => console.error('MongoDB connection error:', err));

// User schema


const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});
const User = mongoose.model('User', userSchema);

// Signup route
app.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hash });
    await user.save();
    res.json({ success: true, message: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ success: false, message: 'Username already exists' });
  }
});

// Login route
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    res.json({ success: true, message: 'Login successful' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// const PORT = process.env.PORT || 3000;
const PORT=3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
>>>>>>> f9db7ef612d53c7ccbfe831f2fc50857ec577c34
