import fp from 'fastify-plugin'
import type { FastifyPluginAsync } from 'fastify'
import fastifyIp from 'fastify-ip'

export interface FastifyIPOptions {
  order?: string[] | string
  strict?: boolean
  isAWS?: boolean
}

declare module 'fastify' {
  interface FastifyRequest {
    isIP(pseudo: string): boolean
    isIPv4(pseudo: string): boolean
    isIPv6(pseudo: string): boolean
    inferIPVersion(pseudo: string): 0 | 4 | 6
  }
}

const ipPlugin: FastifyPluginAsync = fp(async (app, options) => {
  // @ts-expect-error it works as expected but this package typed poorly - @TODO: fix the types
  await app.register(fastifyIp, {
    strict: false,
    isAWS: false,
  })
})

export default ipPlugin
