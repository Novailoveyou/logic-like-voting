import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import envPlugin from './plugins/env.js'
import prismaPlugin from './plugins/prisma.js'
import ideaController from './modules/ideas/idea.route.js'
import userController from './modules/users/user.route.js'
import voteController from './modules/votes/vote.route.js'

const app = fastify({
  logger: true,
})

await app.register(envPlugin)

app.register(fastifyCors, {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
})

app.register(prismaPlugin)

app.get('/', async (request, reply) => {
  return reply.code(200).send({ status: 'ok' })
})

app.register(ideaController, { prefix: '/ideas' })

app.register(userController, { prefix: '/users' })

app.register(voteController, { prefix: '/votes' })

await app.listen(
  { host: app.getTypedEnvs().HOST, port: app.getTypedEnvs().PORT },
  (err, address) => {
    if (err) {
      app.log.error(err)
      process.exit(1)
    }
    app.log.info(`Server listening at ${address}`)
  },
)
