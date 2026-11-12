import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './mobile.css'
import App from './App.jsx'

// Laptop layout (1536px wide) is the reference design.
// On wider or narrower desktop screens the whole page is scaled so it looks exactly the same.
// Tablets and phones (1024px and below) use their own mobile layout instead.
const DESIGN_WIDTH = 1280;
const MOBILE_MAX = 1024;

function fitToScreen() {
  const root = document.documentElement;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const z = w > MOBILE_MAX ? w / DESIGN_WIDTH : 1;
  root.style.zoom = z === 1 ? '' : z;
  root.style.setProperty('--vw', (w / z / 100) + 'px');
  root.style.setProperty('--vh', (h / z / 100) + 'px');
}
fitToScreen();
window.addEventListener('resize', fitToScreen);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)