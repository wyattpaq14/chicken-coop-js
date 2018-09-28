import { Router } from 'express'

import doorRouter from './door.router'
import userRouter from './user.router'

const routes = () => {
  const router = new Router()

  router.get('/', (req, res) => {
    res.status(200).json({ connected: 'OK!' })
  })
  

  // TODO: Use glob to import all of the files in the ./api/ dir
  router.use('/', doorRouter())
  router.use('/', userRouter())

  return router
}

export default routes