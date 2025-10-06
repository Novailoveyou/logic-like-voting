import type { FastifyRequest } from 'fastify'
// import proxyaddr from '@fastify/proxy-addr'

export const checkIsLimit = (value: number) => value >= 10

export const getClientIP = (request: FastifyRequest) => request.ip
// proxyaddr(request as unknown as any, 'uniquelocal')
