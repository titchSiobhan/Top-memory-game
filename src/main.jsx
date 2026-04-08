import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import GetCard from './cards.jsx'

//https://api.thecatapi.com/v1/images/search?limit=10
createRoot(document.getElementById('root')).render(
  <StrictMode>
  <GetCard />
  
  </StrictMode>,
)
