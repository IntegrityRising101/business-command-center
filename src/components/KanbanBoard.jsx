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