import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './routes/routes'

const rootElement: any = document.getElementById('root')
const root: any = createRoot(rootElement)

root.render(
    <BrowserRouter>
        <AppRoutes />
    </BrowserRouter>,
)
