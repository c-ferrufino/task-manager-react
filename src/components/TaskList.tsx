import TaskCard from './TaskCard'

type Task = {
  id: number
  text: string
  completed: boolean
}

type TaskListProps = {
  tasks: Task[]
  onDelete: (id: number) => void
  onToggle: (id: number) => void
  title?: string
}

function TaskList({ tasks, onDelete, onToggle, title }: Readonly<TaskListProps>) {
  if (tasks.length === 0) return null

  return (
    <section className="task-section">
      {title && <h2 className="task-section__title">{title}</h2>}
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            id={task.id}
            text={task.text}
            completed={task.completed}
            onDelete={onDelete}
            onToggle={onToggle}
          />
        ))}
      </ul>
    </section>
  )
}

export default TaskList
