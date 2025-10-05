import type { FastifyPluginAsync } from 'fastify'
import fp from 'fastify-plugin'
import fastifyEnv, { type FastifyEnvOptions } from '@fastify/env'

const envOptions = {
  dotenv: true,
  schema: {
    type: 'object',
    required: ['PORT'],
    properties: {
      HOST: { type: 'string', default: 'localhost' },
      PORT: { type: 'number', default: 1337 },
      DATABASE_URL: {
        type: 'string',
      },
      NODE_ENV: {
        type: 'string',
        default: 'development',
        enum: ['development', 'production', 'test'],
      },
    },
  },
} as const satisfies FastifyEnvOptions

type Envs = typeof envOptions.schema extends { properties: infer P }
  ? {
      [K in keyof P]: P[K] extends { type: 'string' }
        ? string
        : P[K] extends { type: 'number' }
        ? number
        : P[K] extends { type: 'boolean' }
        ? boolean
        : unknown
    }
  : never

declare module 'fastify' {
  interface FastifyInstance {
    getTypedEnvs: () => Envs
  }
}

const envPlugin: FastifyPluginAsync = fp(async (app, options) => {
  await app.register(fastifyEnv, envOptions)

  app.decorate('getTypedEnvs', () => app.getEnvs<Envs>())
})

export default envPlugin
