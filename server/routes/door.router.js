import { Router } from 'express'
import DoorController from '../controllers/door.controller'

const routes = () => {
  const router = new Router()

  router.get('/doors', DoorController.getDoors)
  router.get('/door/:id', DoorController.getDoor)
  router.post('/door', DoorController.createDoor)
  router.put('/door', DoorController.updateDoor)
  return router
}

export default routes