import { Router } from 'express'
import AuthController from '../controllers/auth.controller'

const routes = () => {
  const router = new Router()

  router.post('/auth/signup', AuthController.signUp)
  router.post('/auth/login', AuthController.logIn)

  return router
}

export default routes