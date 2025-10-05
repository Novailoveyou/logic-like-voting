import type { ComponentProps } from 'react'
import { ExternalLink } from './external-link'
import { cn } from '@/shared/lib/utils'

type License = {
  label: string
  href: `https://${string}`
  short: string
}

export const LICENSES = {
  'CC BY 4.0': {
    label: 'Creative Commons Attribution 4.0 International (CC BY 4.0)',
    href: 'https://creativecommons.org/licenses/by/4.0/',
    short: 'CC BY 4.0',
  },
  'CC BY-NC-ND 4.0': {
    label:
      'Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0)',
    href: 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
    short: 'CC BY-NC-ND 4.0',
  },
} as const satisfies Record<License['short'], License>

type LicenseProps = Pick<
  ComponentProps<typeof ExternalLink>,
  'children' | 'className' | 'onClick'
> & {
  license?:
    | (License['href'] & {})
    | (typeof LICENSES)[keyof typeof LICENSES]['href']
}

/**
 * @description A component to display a link to a license.
 * @see https://creativecommons.org/
 * @todo add support for different licenses
 */
export function License({
  className,
  children,
  license = 'https://creativecommons.org/licenses/by-nc-nd/4.0/',
  onClick,
}: LicenseProps) {
  return (
    <ExternalLink
      rel='license'
      href={license}
      className={cn(className)}
      onClick={onClick}>
      {children}
    </ExternalLink>
  )
}
