import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage'
import './App.css'

function App() {
  return (
    <>
      <HomePage />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#fff',
            color: '#1a1d2e',
            borderRadius: '0.75rem',
            padding: '1rem',
            fontSize: '0.875rem',
            fontWeight: 500,
          },
          success: {
            iconTheme: {
              primary: '#D71920',
              secondary: '#fff',
            },
          },
        }}
      />
    </>
  )
}

export default App
