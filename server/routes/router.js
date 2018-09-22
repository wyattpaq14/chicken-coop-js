import { Router } from 'express'

// import channelRouter from './api/channel.router'
// import messageRouter from './api/message.router'
// import userRouter from './api/user.router'
// import authRouter from './api/auth.router'

const routes = () => {
  const router = new Router()

  router.get('/', (req, res) => {
    res.status(200).json({ connected: 'OK!' })
  })

  // TODO: Use glob to import all of the files in the ./api/ dir
  //   router.use('/api', channelRouter())
  //   router.use('/api', messageRouter())
  //   router.use('/api', userRouter())
  //   router.use('/api', authRouter())

  return router
}

export default routes