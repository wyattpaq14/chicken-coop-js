const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DoorSchema = new Schema({
  isOpened: Boolean
})

DoorSchema.statics.addDoor = (door) => {
  return new Promise((resolve, reject) => {
    door.save((err, item) => {
      if (err) reject(err)
      else resolve(item)
    })
  })
}

DoorSchema.statics.updateDoor = (_id, door) => {
  return new Promise((resolve, reject) => {
    Door.findByIdAndUpdate(_id, { $set: door }, { new: true }, (err, item) => {
      if (err) reject(err)
      else resolve(item)
    })
  })
}

DoorSchema.statics.getAllDoors = () => {
  return new Promise((resolve, reject) => {
    Door.find((err, doors) => {
      if (err) reject(err)
      else resolve(doors)
    })
  })
}

DoorSchema.statics.getDoorById = (_id) => {
  return new Promise((resolve, reject) => {
    Door.findOne({_id}, (err, item) => {
      if (err) reject(err)
      else resolve(item)
    })
  })
}




const Door = mongoose.model('Door', DoorSchema)
export default Door