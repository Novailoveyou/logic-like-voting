import type { ComponentProps } from 'react'
import type { ErrorBoundary } from 'react-error-boundary'

export function FallbackRender({
  error,
  resetErrorBoundary,
}: ComponentProps<
  Required<ComponentProps<typeof ErrorBoundary>>['fallbackRender']
>) {
  const handleReset = () => resetErrorBoundary()
  return (
    <div role='alert'>
      <p>Что-то пошло не так:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
      <button type='button' onClick={handleReset}>
        Попробовать снова
      </button>
    </div>
  )
}
