import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider"
import MainStore from './store/MainStore';
import { Provider } from 'react-redux';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <BrowserRouter>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Provider store={MainStore}>
    <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>
  </StrictMode>,
)
