import { useState } from 'react'
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
        const trimmed = text.trim()
        if (!trimmed) return
        onAdd(trimmed)
        setText('')
      }}
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nueva tarea..."
      />
      <button
        type="submit"
        disabled={text.trim() === ''}
        title={text.trim() === '' ? 'Primero ingresa una tarea' : ''}
      >
        Agregar
      </button>
    </form>
  )
}

export default TaskInput
