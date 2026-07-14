import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import TaskInput from './TaskInput'

describe('TaskInput', () => {
  it('envía el texto ingresado al agregar una tarea', async () => {
    // Arrange
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const usuario = userEvent.setup()

    // Act
    const input = screen.getByLabelText('Nueva tarea')
    await usuario.type(input, 'Comprar pan')
    await usuario.click(screen.getByText('Agregar'))

    // Assert
    expect(onAdd).toHaveBeenCalledWith('Comprar pan')
  })

  it('no agrega nada si el campo está vacío', async () => {
    const onAdd = vi.fn()
    render(<TaskInput onAdd={onAdd} />)
    const usuario = userEvent.setup()

    await usuario.click(screen.getByText('Agregar'))

    expect(onAdd).not.toHaveBeenCalled()
  })
})
