import React from 'react'
import ReactDOM from 'react-dom/client'
import Navbar from './components/Navbar'
import App from './App'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <div className='QuizApp'>
    <Navbar />
    <App />
  </div>
  </React.StrictMode>,
)
