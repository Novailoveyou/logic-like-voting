import type { FastifySchema } from 'fastify'

/** @todo add responses schemas */
const voteSchema = {
  params: {
    type: 'object',
    required: ['ideaId'],
    properties: {
      ideaId: { type: 'string' },
    },
  },
} as const satisfies FastifySchema

export default voteSchema
