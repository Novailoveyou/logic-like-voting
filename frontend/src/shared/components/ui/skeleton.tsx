import { cn } from '@/shared/lib/utils'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <span
      data-slot='skeleton'
      className={cn(
        'inline-block bg-accent rounded-md animate-pulse',
        className,
      )}
      {...props}
    />
  )
}

export { Skeleton }
