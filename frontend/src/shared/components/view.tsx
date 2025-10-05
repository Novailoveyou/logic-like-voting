import type { ComponentProps } from 'react'
import { APP_NAME } from '@/shared/constants'
import { Copyright } from './copyright'
import { ModeToggle } from './mode-toggle'
import { Link } from 'react-router'
import { Container } from './container'

type ViewProps = Pick<ComponentProps<'div'>, 'children'>

/**
 * @description View component to display view content
 */
export function View({ children }: ViewProps) {
  return (
    <div className='flex flex-col gap-8 p-4 min-h-screen'>
      <header>
        <Container className='flex flex-wrap justify-start items-center gap-4'>
          <div className='flex items-center gap-2'>
            <ModeToggle />
          </div>
          <Link to='/'>{APP_NAME}</Link>
        </Container>
      </header>
      <main>{children}</main>
      <footer>
        <Container>
          <Copyright name={APP_NAME} />
        </Container>
      </footer>
    </div>
  )
}
