import type { ComponentProps, JSX } from 'react'
import { cn } from '@/shared/lib/utils'

type TypographyProps = Pick<
  ComponentProps<keyof JSX.IntrinsicElements>,
  'className' | 'children'
>

export function H1({ className, children }: TypographyProps) {
  return (
    <h1
      className={cn(
        'mb-6 font-extrabold text-4xl text-center text-balance tracking-tight scroll-m-20',
        className,
      )}>
      {children}
    </h1>
  )
}

export function H2({ className, children }: TypographyProps) {
  return (
    <h2
      className={cn(
        'first:mt-0 mb-4 pb-2 border-b font-semibold text-3xl tracking-tight scroll-m-20',
        className,
      )}>
      {children}
    </h2>
  )
}

export function H3({ className, children }: TypographyProps) {
  return (
    <h3
      className={cn(
        'mb-3 font-semibold text-2xl tracking-tight scroll-m-20',
        className,
      )}>
      {children}
    </h3>
  )
}

export function H4({ className, children }: TypographyProps) {
  return (
    <h4
      className={cn(
        'mb-2 font-semibold text-xl tracking-tight scroll-m-20',
        className,
      )}>
      {children}
    </h4>
  )
}

export function P({ className, children }: TypographyProps) {
  return <p className={cn('leading-7', className)}>{children}</p>
}

export function Blockquote({ className, children }: TypographyProps) {
  return (
    <blockquote className={cn('mt-6 pl-6 border-l-2 italic', className)}>
      {children}
    </blockquote>
  )
}
