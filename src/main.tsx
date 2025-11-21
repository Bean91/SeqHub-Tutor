import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import MultipleChoice from './MultipleChoice.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MultipleChoice title={"Multiple Choice"} />
  </StrictMode>,
)
