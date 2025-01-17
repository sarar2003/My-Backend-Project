let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs'); 
let { JWT_SECRET } = require('../config'); 

let generateToken = (user) => {
  let payload = { id: user.id }; 
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); 
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = { 
      id: 1, 
      username: 'testuser', 
      email: 'test@example.com', 
      password: 'hashed_password'
    }; 
    const isMatch = await bcrypt.compare(password, user.password); 
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    let token = generateToken(user);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10); 
    let user = { 
      id: 2, 
      username: username, 
      email: email, 
      password: hashedPassword 
    }; 
    let token = generateToken(user);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};