import EmptyState from './EmptyState'

type TaskCounterProps = {
  total: number
  completedCount: number
  pendingCount: number
}

function TaskCounter({ total, completedCount, pendingCount }: Readonly<TaskCounterProps>) {
  if (total === 0) {
    return <EmptyState />
  }

  return (
    <div className="task-counter">
      <span>Total: {total}</span>
      <span>Pendientes: {pendingCount}</span>
      <span>Completadas: {completedCount}</span>
    </div>
  )
}

export default TaskCounter
