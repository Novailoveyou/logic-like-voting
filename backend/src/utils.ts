import type { FastifyRequest } from 'fastify'

export const checkIsLimit = (value: number) => value >= 10

export const getClientIP = (request: FastifyRequest) => {
  const forwarded = request.headers['x-forwarded-for']
  if (forwarded) {
    const ips = Array.isArray(forwarded) ? forwarded[0] : forwarded
    const output = ips?.split(',')[0]?.trim()
    if (output) output
  }

  // Fallback to socket remote address
  return request.socket.remoteAddress || request.ips?.[0] || request.ip
}
