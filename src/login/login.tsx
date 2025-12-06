import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style.css'
import LoginField from './LoginField.tsx'
import Navbar from '../Navbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar location={"Login"} />
    <LoginField />
  </StrictMode>,
)
