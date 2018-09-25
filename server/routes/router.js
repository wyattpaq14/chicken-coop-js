import { Router } from 'express'

import doorRouter from './door.router'

const routes = () => {
  const router = new Router()

  router.get('/', (req, res) => {
    res.status(200).json({ connected: 'OK!' })
  })
  

  // TODO: Use glob to import all of the files in the ./api/ dir
  router.use('/', doorRouter())

  return router
}

export default routes