/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ user: { id: 1, name: 'John Fortnite' } }),
  })
);

describe('Home', () => {
  it('has edit button', () => {
    render(<Home />)
 
    const editBtn = screen.getByLabelText('Edit List')
 
    expect(editBtn).toBeInTheDocument()
  })
})