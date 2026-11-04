import { useState, useEffect } from 'react'
import KanbanBoard from './components/KanbanBoard'
import FilterBar from './components/FilterBar'
import FocusSidebar from './components/FocusSidebar'
import TaskModal from './components/TaskModal'
import { seedTasks, CATEGORIES, STATUSES } from './data/seed'

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('bcc-tasks')
    return stored ? JSON.parse(stored) : seedTasks
  })
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [editingTask, setEditingTask] = useState(null)

  useEffect(() => {
    localStorage.setItem('bcc-tasks', JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks((prev) => [...prev, { ...task, id: crypto.randomUUID() }])
  }

  const updateTask = (updated) => {
    setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    setEditingTask(null)
  }

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
    setEditingTask(null)
  }

  const moveTask = (id, newStatus) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    )
  }

  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-brand-accent">
            Business Command Center
          </h1>
          <p className="text-brand-soft text-sm">
            AI projects · social &amp; website · clothing merch
          </p>
        </div>
        <button
          onClick={() => setEditingTask({})}
          className="rounded-lg bg-brand-accent px-4 py-2 font-semibold text-brand-bg hover:opacity-90"
        >
          + New task
        </button>
      </header>

      <FilterBar
        categories={CATEGORIES}
        selected={categoryFilter}
        onChange={setCategoryFilter}
        search={search}
        onSearch={setSearch}
      />

      <div className="mt-6 flex flex-col gap-6 lg:flex-row">
        <div className="flex-1 overflow-x-auto">
          <KanbanBoard
            statuses={STATUSES}
            tasks={tasks}
            categoryFilter={categoryFilter}
            search={search}
            onMove={moveTask}
            onEdit={setEditingTask}
          />
        </div>
        <FocusSidebar tasks={tasks} onEdit={setEditingTask} />
      </div>

      {editingTask && (
        <TaskModal
          task={editingTask}
          categories={CATEGORIES}
          statuses={STATUSES}
          onSave={editingTask.id ? updateTask : addTask}
          onClose={() => setEditingTask(null)}
          onDelete={editingTask.id ? () => deleteTask(editingTask.id) : null}
        />
      )}
    </div>
  )
}