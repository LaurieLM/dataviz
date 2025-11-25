import { createRoot } from 'react-dom/client'
import AppHome from './pages/Home.js'
import AppAbout from './pages/About.js'
import AppGraphics from './pages/Graphics.js'


createRoot(document.getElementById('root')!).render(
    <AppGraphics />
)