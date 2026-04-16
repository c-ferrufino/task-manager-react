import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import TaskCounter from './components/TaskCounter'

type Task = { id: number; text: string; completed: boolean }

const API = import.meta.env.VITE_API_URL ?? 'http://localhost:3000'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  // Cargar todas las tareas desde el backend
  function fetchTasks() {
    fetch(`${API}/tasks`)
      .then((res) => res.json())
      .then((data: Task[]) => {
        setTasks(data)
      })
      .catch((error) => console.error('Error fetching tasks:', error))
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  // Crea una tarea en el backend y recarga la lista
  function addTask(text: string) {
    fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, completed: false }),
    })
      .then(() => fetchTasks())
      .catch((error) => console.error('Error adding task:', error))
  }

  // Elimina una tarea en el backend y recarga la lista
  function deleteTask(id: number) {
    fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
      .then(() => fetchTasks())
      .catch((error) => console.error('Error deleting task:', error))
  }

  // Actualiza completed en el backend y recarga la lista
  function toggleTask(id: number) {
    const task = tasks.find((t) => t.id === id)
    if (!task) return
    fetch(`${API}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    })
      .then(() => fetchTasks())
      .catch((error) => console.error('Error updating task:', error))
  }

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  return (
    <>
      <Header />
      <main>
        <div className="app">
          <TaskInput onAdd={addTask} />
          <TaskCounter total={tasks.length} completedCount={completedTasks.length} pendingCount={pendingTasks.length} />
          {tasks.length === 0 ? null : (
            <>
              <TaskList
                tasks={pendingTasks}
                onDelete={deleteTask}
                onToggle={toggleTask}
                title="Pendientes"
              />
              <TaskList
                tasks={completedTasks}
                onDelete={deleteTask}
                onToggle={toggleTask}
                title="Completadas"
              />
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

export default App
