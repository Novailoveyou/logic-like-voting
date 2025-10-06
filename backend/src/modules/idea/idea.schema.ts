import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const ideaSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string' },
    },
  },
} as const satisfies FastifySchema

export default ideaSchema
