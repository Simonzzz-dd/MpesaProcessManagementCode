const User = require('../models/user'); // Adjust the path as needed
const jwt = require('jsonwebtoken')
const logUserAction = require("../controllers/generic_functions/user_logs")

 const createToken = (_id) => {
  return jwt.sign({_id}, process.env.SECRET, { expiresIn: '30m' })
}

// login a user
const login = async (req, res) => {
  const {email, password} = req.body
  
  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    logUserAction(user._id, "User Auth", `login from ${req.headers['x-forwarded-for'] || req.ip || req.connection.remoteAddress}`)
    res.status(200).json({email, token, id: user._id})
  } catch (error) {
    res.status(404).json({error: error.message})
  }
}

// signup a user
const signup = async (req, res) => {
  const {email, password, username} = req.body

  try {
    const user = await User.signup(email, password, username)

    // create a token
    const token = createToken(user._id)

    res.status(200).json({email, token, id: user._id})
  } catch (error) {
    res.status(400).json({error: error.message})
  }
}

module.exports = { signup, login }
