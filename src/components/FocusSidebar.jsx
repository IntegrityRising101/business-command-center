export default function FocusSidebar({ tasks, onEdit }) {
  const today = new Date().toISOString().slice(0, 10)

  const focusTasks = tasks.filter(
    (t) =>
      t.status !== 'Launched/Done' &&
      (t.priority === 'high' || (t.dueDate && t.dueDate <= today))
  )

  return (
    <aside className="w-full shrink-0 rounded-xl border border-slate-800 bg-brand-card p-4 lg:w-80">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-semibold text-brand-accent">Focus Today</h2>
        <span className="rounded-full bg-slate-800 px-2.5 py-0.5 font-mono text-xs text-brand-soft">
          {focusTasks.length}
        </span>
      </div>

      <p className="mb-4 text-xs text-brand-soft">
        High-priority items and tasks due today or overdue.
      </p>

      {focusTasks.length === 0 ? (
        <p className="rounded-lg border border-dashed border-slate-700 p-4 text-center text-xs text-brand-soft">
          All caught up! Nothing urgent right now.
        </p>
      ) : (
        <div className="flex flex-col gap-2.5">
          {focusTasks.map((task) => (
            <button
              key={task.id}
              type="button"
              onClick={() => onEdit(task)}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-left text-sm transition hover:border-brand-accent"
            >
              <p className="font-medium leading-snug text-white">{task.title}</p>
              <div className="mt-1.5 flex items-center justify-between text-xs text-brand-soft">
                <span>{task.category}</span>
                {task.dueDate && <span>📅 {task.dueDate}</span>}
              </div>
            </button>
          ))}
        </div>
      )}
    </aside>
  )
}