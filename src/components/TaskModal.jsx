import { useState } from 'react'

export default function TaskModal({
  task,
  categories,
  statuses,
  onSave,
  onClose,
  onDelete,
}) {
  const [form, setForm] = useState({
    id: task.id || null,
    title: task.title || '',
    category: task.category || categories[0],
    status: task.status || statuses[0],
    priority: task.priority || 'medium',
    tool: task.tool || '',
    dueDate: task.dueDate || '',
    notes: task.notes || '',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title.trim()) return
    onSave({ ...form, title: form.title.trim() })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-slate-700 bg-brand-card p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-white">
            {task.id ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="text-brand-soft hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-sm">
          <div>
            <label className="mb-1 block text-brand-soft">Title *</label>
            <input
              type="text"
              required
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g., Design hoodie mockup"
              className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-brand-soft">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-brand-soft">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
              >
                {statuses.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-brand-soft">Priority</label>
              <select
                value={form.priority}
                onChange={(e) => setForm({ ...form, priority: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
              >
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-brand-soft">Due Date</label>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-brand-soft">
              AI Tool / Platform
            </label>
            <input
              type="text"
              value={form.tool}
              onChange={(e) => setForm({ ...form, tool: e.target.value })}
              placeholder="ChatGPT, Midjourney, Shopify, Instagram..."
              className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-brand-soft">
              Prompts &amp; Notes
            </label>
            <textarea
              rows={3}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Prompts, links, or checklist notes..."
              className="w-full rounded-lg border border-slate-700 bg-brand-bg px-3 py-2 text-white focus:border-brand-accent focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            {onDelete ? (
              <button
                type="button"
                onClick={onDelete}
                className="rounded-lg bg-red-500/20 px-3 py-2 font-medium text-red-400 hover:bg-red-500/30"
              >
                Delete
              </button>
            ) : (
              <div />
            )}

            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="rounded-lg bg-brand-accent px-4 py-2 font-semibold text-brand-bg hover:opacity-90"
              >
                Save Task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}