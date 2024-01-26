import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { App } from '../pages/App'
import { NotFound } from '../pages/notFoundPage'

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/search_user" element={<App />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
