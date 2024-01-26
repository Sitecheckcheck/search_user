import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import '@testing-library/jest-dom/extend-expect'
import { App } from './App'
import { ItemUser } from './ItemUser'

test('Example 1 renders successfully', () => {
    render(<App />)

    expect(screen.getByText(/Search the user:/i)).toBeInTheDocument()
})

const el = {
    login: 'Vasya',
}

test('List renders successfully', () => {
    render(<ItemUser item={el} />)
    expect(screen.getByText(/Vasya/i)).toBeInTheDocument()
})
