const PRIORITY_COLORS = {
  high: 'bg-red-500',
  medium: 'bg-yellow-400',
  low: 'bg-green-400'
}

export default function TaskCard({ task, onMove, onEdit }) {
  return (
    <div
      className="cursor-pointer rounded-lg border border-slate-700 bg-slate-800 p-3 text-sm shadow hover:border-brand-accent"
      onClick={() => onEdit(task)}
    >
      <div className="flex items-start justify-between gap-2">
        <span
          className={`mt-1 h-2 w-2 shrink-0 rounded-full ${PRIORITY_COLORS[task.priority]}`}
          title={`Priority: ${task.priority}`}
        />
        <p className="flex-1 font-medium leading-snug">{task.title}</p>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-brand-soft">
        <span className="rounded bg-slate-700 px-2 py-0.5">{task.category}</span>
        {task.tool && (
          <span className="rounded bg-slate-700 px-2 py-0.5">{task.tool}</span>
        )}
        {task.dueDate && <span>📅 {task.dueDate}</span>}
      </div>

      <div className="mt-2 flex gap-1">
        {['Planned', 'In Progress', 'Launched/Done']
          .filter((s) => s !== task.status)
          .map((s) => (
            <button
              key={s}
              onClick={(e) => {
                e.stopPropagation()
                onMove(task.id, s)
              }}
              className="rounded bg-slate-700 px-2 py-1 text-xs hover:bg-slate-600"
            >
              → {s}
            </button>
          ))}
      </div>
    </div>
  )
}