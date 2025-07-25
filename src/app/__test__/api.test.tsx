/**
 * @jest-environment jsdom
 */

import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

describe('Home', () => {
  it('has edit button', () => {
    render(<Home />)
 
    const editBtn = screen.getByLabelText('Edit List')
 
    expect(editBtn).toBeInTheDocument()
  })
})