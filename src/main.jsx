import React from 'react'
import ReactDOM from 'react-dom/client'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import NotFoundPage from './pages/NotFoundPage'


import './index.css'

const router = createBrowserRouter([
  {
    path: '/food-planner-dummy/',
    element: <HomePage />,
  },
  {
    path: '/food-planner-dummy/recipes',
    element: <RecipesPage />,
  },
  {
    path: '/food-planner-dummy/*',
    element: <NotFoundPage />,
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
