import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/shared/components/theme-provider'

import { Toggle } from '@/shared/components/ui/toggle'
import { cn } from '@/shared/lib/utils'

/**
 * @description ModeToggle component to toggle between light and dark themes
 */
export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const handleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Toggle
      pressed={theme === 'light'}
      onPressedChange={handleTheme}
      aria-label='Переключить тему'>
      <Sun className={cn('hidden dark:inline-block w-[1.2rem] h-[1.2rem]')} />
      <Moon className={cn('dark:hidden inline-block w-[1.2rem] h-[1.2rem]')} />
      <span className='sr-only'>Переключить тему</span>
    </Toggle>
  )
}
