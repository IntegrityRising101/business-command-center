const groups = [
  { name: 'Business Command Center', category: 'Operations', note: 'Core dashboard, document center, Program Manager Bot, and business operations.' },
  { name: 'Wellness & Growth App', category: 'Wellness App', note: 'Wellness tools, community, Academy, authentication, and privacy checks.' },
  { name: 'Books & Publishing', category: 'Books', note: 'Legacy Within and The Architecture Is Yours.' },
  { name: 'Integrity Rising Academy', category: 'Academy', note: 'Courses, modules, workbooks, and product listings.' },
  { name: 'Website & Storefronts', category: 'Website', note: 'WordPress, Gumroad, Stan Store, Google Site, and Fourthwall.' },
  { name: 'Marketing & Content', category: 'Marketing', note: 'Social content calendar, free creator resources, and campaigns.' },
  { name: 'Merchandise', category: 'Merch', note: 'Branded products, designs, and storefront listings.' },
];

export default function MasterPlan({ tasks = [], onOpenTasks }) {
  const open = tasks.filter(task => task.status !== 'Done');
  const done = tasks.filter(task => task.status === 'Done');
  const inProgress = tasks.filter(task => task.status === 'In Progress');
  const high = open.filter(task => task.priority === 'high');
  return (
    <section className="panel master-plan">
      <div className="paneltop">
        <div>
          <p className="eyebrow">OWNER OVERVIEW</p>
          <h2>Integrity Rising Master Plan</h2>
          <p className="muted">One place to see priorities and progress across your business.</p>
        </div>
        <button className="gold" onClick={onOpenTasks}>Open Task Board →</button>
      </div>
      <div className="stats">
        <div><small>Open tasks</small><strong>{open.length}</strong></div>
        <div><small>In progress</small><strong>{inProgress.length}</strong></div>
        <div><small>High priority</small><strong>{high.length}</strong></div>
        <div><small>Completed</small><strong>{done.length}</strong></div>
      </div>
      <div className="master-plan-grid">
        {groups.map(group => {
          const items = tasks.filter(task => task.category === group.category);
          const completed = items.filter(task => task.status === 'Done').length;
          const active = items.filter(task => task.status !== 'Done').length;
          return (
            <article className="master-plan-card" key={group.name}>
              <div className="master-plan-card-head">
                <h3>{group.name}</h3>
                <span>{completed}/{items.length} done</span>
              </div>
              <p>{group.note}</p>
              <div className="master-plan-track"><span style={{ width: items.length ? `${completed / items.length * 100}%` : '0%' }} /></div>
              <small>{active} open task{active === 1 ? '' : 's'}</small>
              <button onClick={() => onOpenTasks(group.category)}>View tasks →</button>
            </article>
          );
        })}
      </div>
      <div className="master-plan-links">
        <a href="https://github.com/IntegrityRising101/business-command-center/blob/main/docs/MASTER_TASK_LIST.md" target="_blank" rel="noreferrer">Full Master Business Task List ↗</a>
        <a href="https://github.com/IntegrityRising101/business-command-center/blob/main/docs/PROJECT_PROGRESS.md" target="_blank" rel="noreferrer">Detailed Project Progress ↗</a>
        <a href="https://github.com/IntegrityRising101/Project-Haven-DV-Support-Hidden-Secret-App" target="_blank" rel="noreferrer">Project Haven repository ↗</a>
      </div>
      <p className="muted master-plan-note">Progress counts reflect tasks currently saved in this workspace. Project Haven safety-gate work is tracked in the full master list until its task board is connected.</p>
    </section>
  );
}
