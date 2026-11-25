import React from 'react';

const dateLabel = value => {
  if (!value) return 'No due date';
  const parsed = new Date(value + 'T12:00:00');
  return Number.isNaN(parsed.getTime()) ? value : parsed.toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});
};

export default function BossBriefing({tasks=[],logs=[],onOpenTasks,onOpenBotTeam}) {
  const today = new Date().toISOString().slice(0,10);
  const open = tasks.filter(task => task.status !== 'Done');
  const completed = tasks.filter(task => task.status === 'Done');
  const overdue = open.filter(task => task.due_date && task.due_date < today).sort((a,b)=>a.due_date.localeCompare(b.due_date));
  const dueSoon = open.filter(task => task.due_date && task.due_date >= today).sort((a,b)=>a.due_date.localeCompare(b.due_date)).slice(0,5);
  const approval = open.filter(task => task.approval_required);
  const unassigned = open.filter(task => !task.assigned_to);
  const topTasks = [...open].sort((a,b)=>{
    const rank = task => (task.due_date && task.due_date < today ? 0 : task.priority === 'high' ? 1 : task.due_date ? 2 : task.priority === 'medium' ? 3 : 4);
    return rank(a)-rank(b) || String(a.due_date||'9999').localeCompare(String(b.due_date||'9999'));
  }).slice(0,3);
  const assignedBots = [...new Set(open.map(task=>task.assigned_to).filter(Boolean))];
  const weekStart = Date.now() - 7*24*60*60*1000;
  const datedCompletions = completed.filter(task=>task.completed_at && !Number.isNaN(Date.parse(task.completed_at))).sort((a,b)=>Date.parse(b.completed_at)-Date.parse(a.completed_at));
  const winsThisWeek = datedCompletions.filter(task=>Date.parse(task.completed_at)>=weekStart);
  const recentWins = datedCompletions.slice(0,5);
  const completedToday = datedCompletions.filter(task=>String(task.completed_at).slice(0,10)===today).length;
  const completionDate = value => new Date(value).toLocaleDateString(undefined,{month:'short',day:'numeric',year:'numeric'});

  return <main className="boss-briefing">
    <section className="boss-briefing-hero">
      <div className="boss-briefing-crown">👑</div>
      <div className="boss-briefing-title">
        <p className="bot-kicker">INTEGRITY RISING · OWNER BRIEFING</p>
        <h2>Good day, Boss!</h2>
        <p>Your daily snapshot of priorities, assignments, approvals, and progress.</p>
        <small>{new Date().toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric',year:'numeric'})}</small>
      </div>
    </section>
    <section className="boss-briefing-stats" aria-label="Workspace summary">
      <article><small>Open tasks</small><strong>{open.length}</strong></article>
      <article><small>Overdue</small><strong className={overdue.length?'attention-number':''}>{overdue.length}</strong></article>
      <article><small>Need owner approval</small><strong>{approval.length}</strong></article>
      <article><small>Unassigned</small><strong>{unassigned.length}</strong></article>
    </section>
    <section className="boss-briefing-grid">
      <article className="boss-briefing-panel">
        <div className="boss-panel-heading"><div><p className="bot-kicker">FOCUS FIRST</p><h3>Top priorities</h3></div><button onClick={onOpenTasks}>Open tasks →</button></div>
        {topTasks.length ? <ol className="boss-priority-list">{topTasks.map(task=><li key={task.id}><div><strong>{task.title}</strong><small>{task.category||'General'} · {task.priority||'normal'} priority</small></div><span>{task.due_date?dateLabel(task.due_date):task.status}</span></li>)}</ol> : <p className="boss-empty">No open tasks. Enjoy the breathing room! 🎉</p>}
      </article>
      <article className="boss-briefing-panel">
        <div className="boss-panel-heading"><div><p className="bot-kicker">OWNER IN CONTROL</p><h3>Approval watch</h3></div><span className="boss-count">{approval.length}</span></div>
        {approval.length ? <ul className="boss-plain-list">{approval.slice(0,5).map(task=><li key={task.id}><strong>{task.title}</strong><small>{task.assigned_to||'No helper assigned'} · approval flag is on</small></li>)}</ul> : <p className="boss-empty">No open tasks are currently flagged for owner approval.</p>}
      </article>
      <article className="boss-briefing-panel">
        <div className="boss-panel-heading"><div><p className="bot-kicker">DEADLINE WATCH</p><h3>Overdue & coming up</h3></div><span className="boss-count">{overdue.length+dueSoon.length}</span></div>
        {[...overdue,...dueSoon].slice(0,6).length ? <ul className="boss-plain-list">{[...overdue,...dueSoon].slice(0,6).map(task=><li key={task.id}><strong>{task.title}</strong><small className={overdue.includes(task)?'attention-text':''}>{overdue.includes(task)?'Overdue':'Due'} · {dateLabel(task.due_date)}</small></li>)}</ul> : <p className="boss-empty">No dated tasks need attention right now.</p>}
      </article>
      <article className="boss-briefing-panel">
        <div className="boss-panel-heading"><div><p className="bot-kicker">TEAM SNAPSHOT</p><h3>Bot assignments</h3></div><button onClick={onOpenBotTeam}>Meet the team →</button></div>
        <p className="boss-team-summary">{assignedBots.length} helper role{assignedBots.length===1?'':'s'} currently assigned work.</p>
        {assignedBots.length ? <ul className="boss-plain-list">{assignedBots.map(bot=><li key={bot}><strong>{bot}</strong><small>{open.filter(task=>task.assigned_to===bot).length} open assignment(s)</small></li>)}</ul> : <p className="boss-empty">No open tasks are assigned to a helper yet.</p>}
      </article>
    </section>
    <section className="boss-briefing-panel boss-accomplishments">
      <div className="boss-panel-heading"><div><p className="bot-kicker">PROGRESS COUNTS</p><h3>Wins & recent activity</h3></div><span className="boss-count">{completed.length} completed</span></div>
      <p className="boss-team-summary">{winsThisWeek.length} task{winsThisWeek.length===1?'':'s'} completed in the last 7 days.</p>
      {recentWins.length ? <ul className="boss-plain-list">{recentWins.map(task=><li key={task.id}><strong>🏆 {task.title}</strong><small>{task.category||'General'} · Completed {completionDate(task.completed_at)}</small></li>)}</ul> : <p className="boss-empty">Your next completed task will appear here with its saved completion date. Every step forward counts! ✨</p>}
      <p className="boss-briefing-footnote">Completed today: {completedToday} task(s). Weekly wins are calculated from saved completion timestamps, not daily notes. This panel summarizes your saved workspace; it does not independently execute bot assignments.</p>
    </section>
    <section className="boss-briefing-footer">
      <div><strong>Boss Bot's operating rule</strong><p>Recommendations and tracking only. Owner approval is required for sensitive changes, spending, external messages, permissions, and significant publishing or deployment.</p></div>
      <span>Daily briefing panel · live task data</span>
    </section>
  </main>;
}
