
import { createRoot } from 'react-dom/client'
import './index.css'
import { Toaster } from "./components/ui//toaster"

import App from './App.jsx'
import { store } from './store/index.js'
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <BrowserRouter >
    <Provider store={store}>
      <App />
      <Toaster />
    </Provider>


  </BrowserRouter>


)
