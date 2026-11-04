import TaskCard from './TaskCard'

const STATUS_COLORS = {
  Planned: 'border-slate-500',
  'In Progress': 'border-yellow-400',
  'Launched/Done': 'border-green-400'
}

export default function Column({ status, tasks, onMove, onEdit }) {
  return (
    <div className="w-72 shrink-0 rounded-xl bg-brand-card p-3">
      <h2
        className={`mb-3 border-b pb-2 text-sm font-semibold uppercase tracking-wide ${STATUS_COLORS[status]}`}
      >
        {status} ({tasks.length})
      </h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onMove={onMove}
            onEdit={onEdit}
          />
        ))}
        {tasks.length === 0 && (
          <p className="py-6 text-center text-xs text-brand-soft">No tasks</p>
        )}
      </div>
    </div>
  )
}