const mongoose = require('mongoose')
const Schema = mongoose.Schema

let UserSchema = new Schema({
  firstName: {
    type: String,
    trim: true
  },
  lastName: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    required: true
  },
  isActive: Boolean,
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  }

})

UserSchema.statics.addUser = (user) => {
  return new Promise((resolve, reject) => {
    user.save((err, user) => {
      if (err) reject(err)
      else resolve(user)
    })
  })
}

UserSchema.statics.updateUser = (id, user) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(id, user, { new: true }, (err, user) => {
      if (err) reject(err)
      else resolve(user)
    })
  })
}

UserSchema.statics.getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) reject(err)
      else resolve(users)
    })
  })
}

UserSchema.statics.getUserChannels = () => {
  return new Promise((resolve, reject) => {
    User.find((err, users) => {
      if (err) reject(err)
      else resolve(users)
    })
  })
}

UserSchema.statics.getUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findById(id, (err, user) => {
      if (err) reject(err)
      else resolve(user)
    })
  })
}

UserSchema.statics.getByEmail = (email) => {
  return new Promise((resolve, reject) => {
    User.findOne({ email }, (err, user) => {
      if (err) reject(err)
      else resolve(user)
    })
  })
}

UserSchema.statics.getByUsername = (username) => {
  return new Promise((resolve, reject) => {
    User.findOne({ username }, (err, user) => {
      if (err) reject(err)
      else resolve(user)
    })
  })
}

const User = mongoose.model('User', UserSchema)
export default User