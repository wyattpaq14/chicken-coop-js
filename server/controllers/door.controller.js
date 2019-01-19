import Door from '../models/door'
import server from '../server.js'
import gpio from 'rpi-gpio'

const createDoor = (req, res) => {
  if (req.body) {
    let door = new Door(req.body)
    Door.addDoor(door)
      .then(newDoor => {
        server.logger.info('Door has been created.')
        res.status(200).json({ status: 200, data: newDoor, message: 'Door added!' })
      }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
        server.logger.error(err.message)
      })
  } else throw new Error('unsuccessful. please check for valid input')
}

const getDoors = (req, res) => {
  Door.getAllDoors()
    .then(doors => {
      server.logger.info('Doors has been retreived.')
      res.status(200).json({ status: 200, data: doors, message: 'Retreived doors!' })
    }).catch(err => {
      res.status(500).json({ status: 500, message: err.message })
      server.logger.error(err.message)
    })
}

const getDoor = (req, res) => {
  if (req.body) {
    const { id } = req.params
    Door.getDoorById(id)
      .then(door => {
        server.logger.info('Door has been retreived.')
        res.status(200).json({ status: 200, data: door, message: 'Retreived door!' })
      }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
        server.logger.error(err.message)
      })
  } else throw new Error('unsuccessful. please check for valid input')
}

const updateDoor = (req, res) => {
  if (req.body) {
    const door = {}

    // Retreive request data required for door operation
    const { id } = req.body
    const { action } = req.body

    Object.keys(req.body).forEach(key => {
      door[key] = req.body[key]
    })

    if (action == 'open') {
      door['isOpened'] = true
      Door.updateDoor(id, door)
        .then(updatedDoor => {
          raiseDoor(7000)
          server.logger.info('Door has been opened.')
          res.status(200).json({ status: 200, data: updatedDoor, message: 'Opened door!' })
        }).catch(err => {
          res.status(500).json({ status: 500, message: err.message })
          server.logger.error(err.message)
        })
    }
    else if (action == 'close') {
      door['isOpened'] = false
      Door.updateDoor(id, door)
        .then(updatedDoor => {
          lowerDoor(6300)
          server.logger.info('Door has been closed.')
          res.status(200).json({ status: 200, data: updatedDoor, message: 'Closed door!' })
        }).catch(err => {
          res.status(500).json({ status: 500, message: err.message })
          server.logger.error(err.message)
        })
    } else res.status(401).json({ status: 401, message: 'Door action is not defined!' })

  } else throw new Error('Error, please check for valid input')
}

const stop = () => {
  gpio.setup(16, gpio.DIR_LOW)
  gpio.setup(18, gpio.DIR_LOW)
}

const raiseDoor = (val) => {
  gpio.setup(16, gpio.DIR_HIGH)
  gpio.setup(18, gpio.DIR_LOW)
  setTimeout(stop, val)
}

const lowerDoor = (val) => {
  gpio.setup(16, gpio.DIR_LOW)
  gpio.setup(18, gpio.DIR_HIGH)
  setTimeout(stop, val)
}



export default {
  createDoor, getDoor, getDoors, updateDoor
}
