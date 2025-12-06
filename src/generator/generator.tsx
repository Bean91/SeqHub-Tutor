import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../style.css'
import CourseList from './CourseList'
import Navbar from '../Navbar'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Navbar location={"Generator"} />
    <CourseList />
  </StrictMode>,
)
