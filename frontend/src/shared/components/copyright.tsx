import type { ComponentProps } from 'react'
import { Year } from './year'
import { License } from './license'
import { cn } from '@/shared/lib/utils'

type CopyrightProps = Pick<ComponentProps<'small'>, 'className'> & {
  name: string
  license?: Omit<ComponentProps<typeof License>, 'children'>
}

/**
 * @description A component to display copyright information with a link to the license.
 */
export function Copyright({ name, license, className }: CopyrightProps) {
  return (
    <small className={cn(className)}>
      <License {...license}>
        <span>&copy;</span> <Year year={new Date().getFullYear()} />{' '}
        <span>{name}</span>
      </License>
    </small>
  )
}
