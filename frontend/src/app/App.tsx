import { ThemeProvider } from '@/shared/components/theme-provider'
import { StoreProvider } from './store'
import { BrowserRouter, Routes, Route } from 'react-router'
import { HomeView } from '@/views/home-view'
import { ErrorBoundary } from 'react-error-boundary'
import { FallbackRender } from '@/shared/components/error'
import { SWRConfig } from 'swr'
import { Toaster } from '@/shared/components/ui/sonner'
import { toast } from 'sonner'

function App() {
  return (
    <ErrorBoundary fallbackRender={FallbackRender}>
      <SWRConfig
        value={{
          loadingTimeout: 3000,
          onLoadingSlow: () => {
            toast('Медленное соединение...', {
              id: 'c4189505-4f9e-42f1-8795-6f0f268ab4bc',
              description: 'Пожалуйста, ожидайте',
              dismissible: true,
              duration: 3000,
            })
          },
          onSuccess: () => {
            toast.dismiss('c4189505-4f9e-42f1-8795-6f0f268ab4bc')
          },
          onError: () => {
            toast.dismiss('c4189505-4f9e-42f1-8795-6f0f268ab4bc')
          },
        }}>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <StoreProvider>
            <BrowserRouter>
              <Routes>
                <Route index element={<HomeView />} />
              </Routes>
            </BrowserRouter>
            <Toaster />
          </StoreProvider>
        </ThemeProvider>
      </SWRConfig>
    </ErrorBoundary>
  )
}

export default App
