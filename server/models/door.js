const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DoorSchema = new Schema({
  isOpened: Boolean
})

DoorSchema.statics.addChannel = (channel) => {
  return new Promise((resolve, reject) => {
    channel.save((err, item) => {
      if (err) reject(err)
      else resolve(item)
    })
  })
}

DoorSchema.statics.updateChannel = (_id, channel) => {
  return new Promise((resolve, reject) => {
    Channel.findByIdAndUpdate(_id, { $set: channel }, { new: true }, (err, item) => {
      // findByIdAndUpdate(id, { $set: { size: 'large' }}, { new: true }
      if (err) reject(err)
      else resolve(item)
    })
  })
}



const Door = mongoose.model('Door', DoorSchema)
export default Door