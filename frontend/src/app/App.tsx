import { ThemeProvider } from '@/shared/components/theme-provider'
import { StoreProvider } from './store'
import { BrowserRouter, Routes, Route } from 'react-router'
import { HomeView } from '@/views/home-view'

function App() {
  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<HomeView />} />
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </ThemeProvider>
  )
}

export default App
