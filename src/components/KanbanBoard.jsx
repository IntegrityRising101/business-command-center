import TaskCard from './TaskCard'

export default function KanbanBoard({
  statuses,
  tasks,
  categoryFilter,
  search,
  onMove,
  onEdit,
}) {
  const query = search.trim().toLowerCase()

  const filteredTasks = tasks.filter((t) => {
    const matchesCategory =
      categoryFilter === 'All' || t.category === categoryFilter
    const matchesSearch =
      !query ||
      t.title.toLowerCase().includes(query) ||
      (t.tool && t.tool.toLowerCase().includes(query)) ||
      (t.notes && t.notes.toLowerCase().includes(query))
    return matchesCategory && matchesSearch
  })

  return (
    <div className="grid min-w-[720px] grid-cols-3 gap-4">
      {statuses.map((status) => {
        const columnTasks = filteredTasks.filter((t) => t.status === status)
        return (
          <div
            key={status}
            className="flex flex-col rounded-xl border border-slate-800 bg-brand-card p-4"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold text-white">{status}</h2>
              <span className="rounded-full bg-slate-800 px-2.5 py-0.5 font-mono text-xs text-brand-soft">
                {columnTasks.length}
              </span>
            </div>

            <div className="flex flex-1 flex-col gap-3">
              {columnTasks.length === 0 ? (
                <p className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-brand-soft">
                  No tasks here yet
                </p>
              ) : (
                columnTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onMove={onMove}
                    onEdit={onEdit}
                  />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
import Column from './Column'

export default function KanbanBoard({
  statuses,
  tasks,
  categoryFilter,
  search,
  onMove,
  onEdit
}) {
  const filtered = tasks.filter((t) => {
    const matchCategory =
      categoryFilter === 'All' || t.category === categoryFilter
    const q = search.toLowerCase()
    const matchSearch =
      !q ||
      t.title.toLowerCase().includes(q) ||
      (t.tool && t.tool.toLowerCase().includes(q))
    return matchCategory && matchSearch
  })

  return (
    <div className="flex gap-4">
      {statuses.map((status) => (
        <Column
          key={status}
          status={status}
          tasks={filtered.filter((t) => t.status === status)}
          onMove={onMove}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}