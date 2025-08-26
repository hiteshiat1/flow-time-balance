import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Debug React initialization
console.log('Initializing React application...');

const rootElement = document.getElementById("root");
if (!rootElement) {
  throw new Error('Root element not found');
}

// Remove StrictMode temporarily to isolate the issue
createRoot(rootElement).render(<App />);
