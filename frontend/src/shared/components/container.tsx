import { cn } from '@/shared/lib/utils'
import type { ComponentProps } from 'react'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'

// eslint-disable-next-line react-refresh/only-export-components
export const containerVariants = cva('', {
  variants: {
    variant: {
      default: 'relative z-20 w-full px-5 max-w-[90rem] mx-auto',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type ContainerProps = Pick<ComponentProps<'div'>, 'className' | 'children'> &
  VariantProps<typeof containerVariants>

/**
 * @description Container component to wrap content and center it
 */
export function Container({ className, children, variant }: ContainerProps) {
  return (
    <div className={cn(containerVariants({ variant, className }))}>
      {children}
    </div>
  )
}
