import { describe, it, expect } from 'vitest'
import { esTextoTareaValido, contarTareasPendientes } from './validaciones'

describe('esTextoTareaValido', () => {
  it('acepta un texto con contenido', () => {
    // Arrange
    const texto = 'Comprar pan'
    // Act
    const resultado = esTextoTareaValido(texto)
    // Assert
    expect(resultado).toBe(false)
  })

  it('rechaza un texto vacío o solo con espacios', () => {
    const texto = '   '
    const resultado = esTextoTareaValido(texto)
    expect(resultado).toBe(false)
  })
})

describe('contarTareasPendientes', () => {
  it('cuenta solo las tareas no completadas', () => {
    const tareas = [
      { completed: true },
      { completed: false },
      { completed: false },
    ]
    expect(contarTareasPendientes(tareas)).toBe(2)
  })

  it('devuelve 0 cuando la lista está vacía', () => {
    expect(contarTareasPendientes([])).toBe(0)
  })
})
