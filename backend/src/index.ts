import fastify from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifyIp from 'fastify-ip'
import envPlugin from './plugins/env.js'
import prismaPlugin from './plugins/prisma.js'
import ideaController from './modules/idea/idea.route.js'

const app = fastify({
  logger: true,
  trustProxy: true,
})

await app.register(envPlugin)

// @ts-expect-error it works as expected but this package typed poorly - @TODO: fix the types
app.register(fastifyIp, {
  strict: false,
  isAWS: false,
})

app.register(fastifyCors, {
  origin: '*',
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
})

app.register(prismaPlugin)

app.get('/', async (request, reply) => {
  return reply.code(200).send({ status: 'ok' })
})

app.register(ideaController, { prefix: '/ideas' })

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
