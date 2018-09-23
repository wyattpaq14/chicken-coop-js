import Door from '../models/door'

const createDoor = (req, res) => {
  if (req.body) {
    let channel = new Channel(req.body)
    Channel.addChannel(channel)
      .then(newChannel => {
        res.status(200).json({ status: 200, data: newChannel, message: 'Ok' })
      }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
      })
  } else throw new Error('unsuccessful. please check for valid input')
}

const getDoors = (req, res) => {
  Channel.getAllChannels()
    .then(activeChannel => {
      res.status(200).json({ status: 200, data: activeChannel, message: 'Ok' })
    }).catch(err => {
      res.status(500).json({ status: 500, message: err.message })
    })
}

const getDoor = (req, res) => {
  if (req.body) {
    const { id } = req.params
    Channel.getChannelById(id)
      .then(newChannel => {
        res.status(200).json({ status: 200, data: newChannel, message: 'Ok' })
      }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
      })
  } else throw new Error('unsuccessful. please check for valid input')
}

const openDoor = (req, res) => {
  if (req.body) {
    const channel = {}
    Object.keys(req.body).forEach(key => {
      channel[key] = req.body[key]
    })
    const { id } = req.params
    Channel.updateChannel(id, channel)
      .then(newChannel => {
        res.status(200).json({ status: 200, data: newChannel, message: 'Ok' })
      }).catch(err => {
        res.status(500).json({ status: 500, message: err.message })
      })
  } else throw new Error('unsuccessful. please check for valid input')
}

const closeDoor = (req, res) => {
    if (req.body) {
      const channel = {}
      Object.keys(req.body).forEach(key => {
        channel[key] = req.body[key]
      })
      const { id } = req.params
      Channel.updateChannel(id, channel)
        .then(newChannel => {
          res.status(200).json({ status: 200, data: newChannel, message: 'Ok' })
        }).catch(err => {
          res.status(500).json({ status: 500, message: err.message })
        })
    } else throw new Error('unsuccessful. please check for valid input')
  }

export default {
  newChannel, returnAllChannels, returnSpecificChannel, updateSpecificChannel
}