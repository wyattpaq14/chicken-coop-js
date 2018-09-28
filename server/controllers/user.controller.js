
import User from '../models/user'
import server from '../server.js'

const newUser = (req, res) => {
  const user = new User(req.body)
  User.addUser(user)
    .then(newUser => {
      server.logger.info('User added.')
      res.status(200).json({ status: 200, data: newUser, message: 'Ok' })
    }).catch(err => {
      server.logger.error(err.message)
      res.status(500).json({ status: 500, message: err.message })
    })
}

const getUsers = (req, res) => {
  User.getAllUsers()
    .then(getUsers => {
      server.logger.info('Users retreived.')
      res.status(200).json({ status: 200, data: getUsers, message: 'Ok' })
    }).catch(err => {
      server.logger.error(err.message)
      res.status(500).json({ status: 500, message: err.message })
    })
}

const getUserById = (req, res) => {
  const { id } = req.params
  User.getUser(id)
    .then(getUserById => {
      server.logger.info('User retreived.')
      res.status(200).json({ status: 200, data: getUserById, message: 'Ok' })
    }).catch(err => {
      server.logger.error(err.message)
      res.status(500).json({ status: 500, message: err.message })
    })
}

const updateUserById = (req, res) => {
  if (req.body) {
    const user = {}
    Object.keys(req.body).forEach(key => {
      user[key] = req.body[key]
    })
    const { id } = req.params
    User.updateUser(id, user)
      .then(updateUser => {
        server.logger.info('User updated.')
        res.status(200).json({ status: 200, data: updateUser, message: 'Ok' })
      }).catch(err => {
        server.logger.error(err.message)
        res.status(500).json({ status: 500, message: err.message })
      })
  } else throw new Error('Error updating user!')
}

export default {
  newUser,
  getUsers,
  getUserById,
  updateUserById
}