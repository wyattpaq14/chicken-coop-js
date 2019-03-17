import User from '../models/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const signUp = async (req, res) => {
  try {
    if (!req.body) throw new Error('No data sent.')
    const { username, password, email, firstName, lastName } = req.body
    if (!/\S+@\S+\.\S+/.test(email)) throw new Error('Invalid Email sent.')
    if (!username) throw new Error('Username not sent.')
    if (!password) throw new Error('Password not sent.')
    if (!firstName) throw new Error('First Name not sent.')
    if (!lastName) throw new Error('Last Name not sent.')
    const hashPass = await bcrypt.hash(password, 10)
    const newUser = new User({
      firstName,
      lastName,
      email,
      username,
      password: hashPass,
      isActive: true
    })
    await User.addUser(newUser)
    res.json({status: 200, message: 'User saved successfully.'})
  } catch (error) {
    if (error.code === 11000) res.json({ status: 500, message: 'An account for that username or email already exists.' })
    else res.json({ status: 500, message: 'Sign Up failed. Try again.', error })
  }
}

const logIn = async (req, res) => {
  try {
    if (!req.body) throw new Error('No data sent.')
    const { usernameEmail, password } = req.body
    if (!usernameEmail) throw new Error('Username or Email not sent.')
    if (!password) throw new Error('Password not sent.')
    let user = null
    let error = null
    user = await User.getByEmail(usernameEmail)
    if (!user) user = await User.getByUsername(usernameEmail)
    if (!user) {
      error = new Error('There is no user with that username or email.')
      error.code = 1234
      throw error
    }
    console.log(user)
    let valid = await bcrypt.compare(password, user.password)
    if (valid) {
      const token = jwt.sign(user.toObject(), process.env.TOKEN_SECRET)
      res.json({ status: 200, token, user, message: 'Login successful!' })
    } else {
      error = new Error('Incorrect password.')
      error.code = 4321
      throw error
    }
  } catch (error) {
    console.log(error)
    if (error.code === 1234) res.json({ status: 500, message: error.message })
    else if (error.code === 4321) res.json({ status: 500, message: error.message })
    else res.json({ status: 500, message: 'Login failed. Try again.', error })
  }
}

const validate = async (req, res, next) => {
  try {
    // Get token from 'token' header
    const token = req.get('token')
    if (!token) {
      throw new Error('No token found. Set header: token')
    } else {
      let decoded = jwt.verify(token, process.env.TOKEN_SECRET)
      if (!decoded) {
        throw new Error('Invalid token.')
      }
      let user = await User.findById(decoded._id)
      if (!user) {
        throw new Error('Unauthorized.')
      }
      next()
    }
  } catch (error) {
    res.json({ status: 404, message: error.message })
  }
}

export default {
  logIn,
  signUp,
  validate
}