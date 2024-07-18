import React from 'react'
import ReactDOM from 'react-dom/client'
import UserLayout from './layout/UserLayout.jsx'
import AdminLayout from './layout/AdminLayout.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AdminLayout />
  </React.StrictMode>,
)
