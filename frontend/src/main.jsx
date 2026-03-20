import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import axios from 'axios'

// Configure API base URL for deployment
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
axios.defaults.baseURL = API_URL;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
