import Door from '../models/door'
import server from '../server.js'

const createDoor = (req, res) => {
  if (req.body) {
    let door = new Door(req.body)
    Door.addDoor(door)
      .then(newDoor => {
        serverLog()
        res.status(200).json({ status: 200, data: newDoor, message: 'Door added!' })
      }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
      })
  } else throw new Error('unsuccessful. please check for valid input')
}

const getDoors = (req, res) => {
  Door.getAllDoors()
    .then(doors => {
      res.status(200).json({ status: 200, data: doors, message: 'Retreived doors!' })
    }).catch(err => {
      res.status(500).json({ status: 500, message: err.message })
    })
}

const getDoor = (req, res) => {
  if (req.body) {
    const { id } = req.params
    Door.getDoorById(id)
      .then(door => {
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
      door['isOpened'] = 1
      Door.updateDoor(id, door)
        .then(updatedDoor => {
          server.logger.info('Door has been closed.')
          res.status(200).json({ status: 200, data: updatedDoor, message: 'Opened door!' })
        }).catch(err => {
          res.status(500).json({ status: 500, message: err.message })
          server.logger.error(err.message)
        })

    }
    else if (action == 'close') {
      door['isOpened'] = 0
      Door.updateDoor(id, door)
        .then(updatedDoor => {
          server.logger.info('Door has been closed.')
          res.status(200).json({ status: 200, data: updatedDoor, message: 'Closed door!' })
        }).catch(err => {
          res.status(500).json({ status: 500, message: err.message })
          server.logger.error(err.message)
        })
    } else res.status(401).json({ status: 401, message: 'Door action is not defined!' })

  } else throw new Error('Error, please check for valid input')
}



export default {
  createDoor, getDoor, getDoors, updateDoor
}