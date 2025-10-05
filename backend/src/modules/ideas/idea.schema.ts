import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const ideaSchema = {
  post: {
    params: {
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string' },
      },
    },
  },
} as const satisfies Record<string, FastifySchema>

export default ideaSchema
