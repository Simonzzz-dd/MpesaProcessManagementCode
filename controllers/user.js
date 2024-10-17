const User = require('../models/user'); // Adjust the path as needed
const jwt = require('jsonwebtoken')
const logUserAction = require("../controllers/generic_functions/user_logs")

 const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '30m' })
}

// login a user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    // Create a token
    const token = createToken(user._id);

    // Log user action
    logUserAction(user._id, "User Auth", `login from ${req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress}`);

    // Fetch user roles
    const userWithRoles = await User.findById(user._id)
    

    res.status(200).json({
      email,
      token,
      id: user._id,
      roles: user.roles
    });

  } catch (error) {
    console.log(error.message);
    res.status(404).json({ error: error.message });
  }
};

// signup a user
const signup = async (req, res) => {
  const { email, username, department, ticketId } = req.body;

  try {
    const user = await User.signup(email, username, department, ticketId);
    
    res.status(201).json({
      message: 'User registered successfully. Please wait for account activation or contact support.',
      user: {
        email: user.email,
        username: user.username,
        department: user.department,
        status: user.status
      }
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = { signup, login }
