import type { ComponentProps } from 'react'
import { Year } from './year'
import { License } from './license'
import { cn } from '@/shared/lib/utils'
import { AUTHOR_EMAIL, AUTHOR_NAME, AUTHOR_URL } from '../constants'
import { ExternalLink } from './external-link'

type CopyrightProps = Pick<ComponentProps<'small'>, 'className'> & {
  name: string
  license?: Omit<ComponentProps<typeof License>, 'children'>
}

/**
 * @description A component to display copyright information with a link to the license.
 */
export function Copyright({ name, license, className }: CopyrightProps) {
  return (
    <small className={cn('flex flex-col flex-wrap gap-2', className)}>
      <License {...license}>
        <span>&copy;</span> <Year year={new Date().getFullYear()} />{' '}
        <span>{name}</span>
      </License>
      <ExternalLink href={AUTHOR_URL}>{AUTHOR_NAME}</ExternalLink>
      <a href={`mailto:${AUTHOR_EMAIL}`}>
        <span>{AUTHOR_EMAIL}</span>
      </a>
    </small>
  )
}
