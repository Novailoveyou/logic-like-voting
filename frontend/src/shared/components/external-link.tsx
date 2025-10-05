import type { ComponentProps } from 'react'
import { cn } from '@/shared/lib/utils'

type ExternalLinkPropsBase = ComponentProps<'a'>

type ExternalLinkProps = Omit<ExternalLinkPropsBase, 'target'> &
  Required<Pick<ExternalLinkPropsBase, 'href'>>

const REL_NOOPENER = 'noopener' satisfies ExternalLinkProps['rel']

const REL_NOREFFERER = 'noreferrer' satisfies ExternalLinkProps['rel']

const REL =
  `${REL_NOOPENER} ${REL_NOREFFERER}` satisfies ExternalLinkProps['rel']

/**
 * @description Get rel attribute for external link
 * @todo make this faster, prevent defaultRel poisoning
 */
const getExternalRel = (
  defaultRel: ExternalLinkProps['rel'] = REL,
): Required<ExternalLinkProps>['rel'] => {
  const relArr = defaultRel.split(' ')

  if (!relArr.includes('noopener')) relArr.push(REL_NOOPENER)

  if (!relArr.includes('noreferrer')) relArr.push(REL_NOREFFERER)

  return relArr.join(' ')
}

/**
 * @description ExternalLink component to display external link
 * @todo add support for Next.js Link component
 * @todo add confirmation modal before redirecting
 */
export function ExternalLink({
  href,
  rel: defaultRel = REL,
  children,
  className,
  ...props
}: ExternalLinkProps) {
  const rel = getExternalRel(defaultRel)

  return (
    <a
      rel={rel}
      target='_blank'
      href={href}
      className={cn('cursor-pointer', className)}
      {...props}>
      {children}
    </a>
  )
}
