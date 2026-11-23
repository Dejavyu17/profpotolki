import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Legal from './components/Legal.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Legal doc={document.body.dataset.doc} />
  </StrictMode>,
)
