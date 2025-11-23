import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../styles/globals.css' // Importa o CSS global
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)