import './TaskCard.css'

type TaskCardProps = {
  id: number
  text: string
  completed: boolean
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

function TaskCard({ id, text, completed, onDelete, onToggle }: Readonly<TaskCardProps>) {
  return (
    <li className="task-card">
      <span className={`task-card__text${completed ? ' task-card__text--completed' : ''}`}>
        {text}
      </span>
      {!completed ? (
        <button className="task-card__complete" onClick={() => onToggle(id)}>
          Completar
        </button>
      ) : (
        <button className="task-card__undo" onClick={() => onToggle(id)}>
          Deshacer
        </button>
      )}
      <button className="task-card__delete" onClick={() => onDelete(id)}>
        Eliminar
      </button>
    </li>
  )
}

export default TaskCard
