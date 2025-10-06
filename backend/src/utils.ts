import type { FastifyRequest } from 'fastify'

export const checkIsLimit = (value: number) => value >= 10

export const getClientIP = (request: FastifyRequest) => request.ip
