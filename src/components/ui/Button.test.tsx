import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Button from './Button'

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>)
}

describe('Button', () => {
  it('renders children correctly', () => {
    renderWithRouter(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    renderWithRouter(<Button onClick={handleClick}>Click me</Button>)

    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders as disabled when disabled prop is true', () => {
    renderWithRouter(<Button disabled>Disabled</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
  })

  it('shows loading spinner when loading is true', () => {
    renderWithRouter(<Button loading>Loading</Button>)

    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveAttribute('aria-busy', 'true')
  })

  it('renders as a link when "to" prop is provided', () => {
    renderWithRouter(<Button to="/sessions">Go to Sessions</Button>)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', '/sessions')
  })

  it('renders as an external link when "href" prop is provided', () => {
    renderWithRouter(<Button href="https://example.com">External Link</Button>)

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('href', 'https://example.com')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noopener noreferrer')
  })

  it('applies variant styles correctly', () => {
    const { rerender } = renderWithRouter(<Button variant="primary">Primary</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-[#E21D1D]')

    rerender(<BrowserRouter><Button variant="secondary">Secondary</Button></BrowserRouter>)
    expect(screen.getByRole('button')).toHaveClass('bg-white/10')

    rerender(<BrowserRouter><Button variant="ghost">Ghost</Button></BrowserRouter>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent')
  })

  it('applies size styles correctly', () => {
    const { rerender } = renderWithRouter(<Button size="sm">Small</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'py-2', 'text-xs')

    rerender(<BrowserRouter><Button size="lg">Large</Button></BrowserRouter>)
    expect(screen.getByRole('button')).toHaveClass('px-8', 'py-4', 'text-base')
  })

  it('applies custom className', () => {
    renderWithRouter(<Button className="custom-class">Custom</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
