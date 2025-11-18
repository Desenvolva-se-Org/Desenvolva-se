import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Mude esta linha:
import './index.css' // <-- Remover ou comentar
// Para esta:
import './styles/globals.css' // <-- NOVA IMPORTAÇÃO
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)