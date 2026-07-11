import { useState } from 'react'
import { esTextoTareaValido } from '../utils/validaciones'
import './TaskInput.css'

type TaskInputProps = {
  onAdd: (text: string) => void
}

function TaskInput({ onAdd }: Readonly<TaskInputProps>) {
  const [text, setText] = useState('')

  return (
    <form
      className="task-input"
      onSubmit={(e) => {
        e.preventDefault()
        if (!esTextoTareaValido(text)) return
        onAdd(text.trim())
        setText('')
      }}
    >
      <input
        type="text"
        aria-label="Nueva tarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button
        type="submit"
        disabled={!esTextoTareaValido(text)}
        title={!esTextoTareaValido(text) ? 'Primero ingresa una tarea' : ''}
      >
        Agregar
      </button>
    </form>
  )
}

export default TaskInput
