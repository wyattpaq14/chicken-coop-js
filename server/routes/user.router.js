import { Router } from 'express'
import UserController from '../controllers/user.controller'

const routes = () => {
  const router = new Router()

  router.post('/user', UserController.newUser)
  router.get('/users', UserController.getUsers)
  router.get('/user/:id', UserController.getUserById)
  router.put('/user/:id', UserController.updateUserById)
  router.get('/user/channels/:id', UserController.getMemberChannels)

  return router
}

export default routes