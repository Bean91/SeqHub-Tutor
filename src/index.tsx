import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './style.css'
import Navbar from './Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar location={"Home"} />
  </StrictMode>,
)
