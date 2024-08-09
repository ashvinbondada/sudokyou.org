import React from 'react'
import ReactDOM from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

// import App from './App.jsx'
import './main.css'
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
