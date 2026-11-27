import {useMemo,useState} from 'react';
import BossBriefing from './BossBriefing';

const REPORT_PREFIX='OWNER_OFFICE_REPORT::';
const todayKey=()=>new Date().toISOString().slice(0,10);
const dayStart=(date)=>{const d=new Date(date);d.setHours(0,0,0,0);return d};
const dateLabel=value=>{if(!value)return 'Date not recorded';const d=new Date(value);return Number.isNaN(d.getTime())?String(value):d.toLocaleString(undefined,{dateStyle:'medium',timeStyle:value.includes('T')?'short':undefined})};
const inRange=(value,start,end)=>{if(!value)return false;const d=new Date(value);return !Number.isNaN(d.getTime())&&d>=start&&d<end};

function buildSecretaryReport(tasks,type){
 const now=new Date();
 const start=type==='daily'?dayStart(now):new Date(now.getTime()-7*24*60*60*1000);
 const end=new Date(now.getTime()+1);
 const completed=tasks.filter(t=>t.status==='Done'&&inRange(t.completed_at,start,end)).sort((a,b)=>new Date(b.completed_at)-new Date(a.completed_at));
 const unverified=tasks.filter(t=>t.status==='Done'&&!t.completed_at);
 const open=tasks.filter(t=>t.status!=='Done');
 const overdue=open.filter(t=>t.due_date&&t.due_date<todayKey()).sort((a,b)=>a.due_date.localeCompare(b.due_date));
 const upcoming=open.filter(t=>t.due_date&&t.due_date>=todayKey()).sort((a,b)=>a.due_date.localeCompare(b.due_date)).slice(0,8);
 const approvals=open.filter(t=>t.approval_required);
 const missingOwners=open.filter(t=>!t.assigned_to);
 return {
  id:crypto.randomUUID(),type,generated_at:now.toISOString(),period_start:start.toISOString(),period_end:end.toISOString(),
  totals:{verified_completions:completed.length,unverified_done:unverified.length,in_progress:open.filter(t=>t.status==='In Progress').length,planned:open.filter(t=>t.status!=='In Progress').length,overdue:overdue.length,upcoming:upcoming.length,owner_approvals:approvals.length,unassigned:missingOwners.length},
  completed:completed.map(t=>({id:t.id,title:t.title,project:t.category||'General',assignee:t.assigned_to||'Not assigned',completed_at:t.completed_at,evidence:t.evidence_url||t.deliverable_url||null,follow_up:t.follow_up||null})),
  unverified:unverified.map(t=>({id:t.id,title:t.title,project:t.category||'General',assignee:t.assigned_to||'Not assigned',reason:'Marked Done, but no completion timestamp is saved. Verify before counting as a confirmed accomplishment.'})),
  in_progress:open.filter(t=>t.status==='In Progress').map(t=>({id:t.id,title:t.title,project:t.category||'General',assignee:t.assigned_to||'Unassigned',due_date:t.due_date||null})),
  overdue:overdue.map(t=>({id:t.id,title:t.title,project:t.category||'General',assignee:t.assigned_to||'Unassigned',due_date:t.due_date})),
  upcoming:upcoming.map(t=>({id:t.id,title:t.title,project:t.category||'General',assignee:t.assigned_to||'Unassigned',due_date:t.due_date})),
  approvals:approvals.map(t=>({id:t.id,title:t.title,assignee:t.assigned_to||'Unassigned'})),
  unassigned:missingOwners.map(t=>({id:t.id,title:t.title,project:t.category||'General'}))
 };
}

export default function OwnerOffice({tasks=[],logs=[],onOpenTasks,onOpenBotTeam,onSaveReport}){
 const [reportType,setReportType]=useState('daily');
 const [selected,setSelected]=useState(null);
 const [notice,setNotice]=useState('');
 const history=useMemo(()=>logs.filter(l=>String(l.text||'').startsWith(REPORT_PREFIX)).map(l=>{try{return {logId:l.id,date:l.date,report:JSON.parse(l.text.slice(REPORT_PREFIX.length))}}catch{return null}}).filter(Boolean).sort((a,b)=>new Date(b.report.generated_at)-new Date(a.report.generated_at)),[logs]);
 const open=tasks.filter(t=>t.status!=='Done');
 const overdue=open.filter(t=>t.due_date&&t.due_date<todayKey());
 const approvals=open.filter(t=>t.approval_required);
 const generate=async()=>{const report=buildSecretaryReport(tasks,reportType);await onSaveReport(REPORT_PREFIX+JSON.stringify(report));setSelected(report);setNotice(reportType==='daily'?'Daily Secretary report saved to report history.':'Weekly Secretary report saved to report history.')};
 const report=selected||history[0]?.report;
 const showReport=r=>setSelected(r);
 return <main className="owner-office">
  <section className="owner-office-hero"><div><p className="bot-kicker">INTEGRITY RISING · PRIVATE OWNER WORKSPACE</p><h2>Owner Office</h2><p>Your central place for oversight, verified accomplishments, approvals, and follow-through.</p></div><div className="owner-office-mark">✦</div></section>
  <section className="owner-office-stats" aria-label="Owner overview">
   <article><small>Open work</small><strong>{open.length}</strong></article><article><small>Overdue</small><strong className={overdue.length?'attention-number':''}>{overdue.length}</strong></article><article><small>Awaiting approval</small><strong>{approvals.length}</strong></article><article><small>Verified completed</small><strong>{tasks.filter(t=>t.status==='Done'&&t.completed_at).length}</strong></article>
  </section>
  <section className="owner-office-grid">
   <article className="owner-office-panel owner-office-secretary"><div className="owner-office-heading"><div><p className="bot-kicker">ADMINISTRATIVE REPORTING</p><h3>🗂️ Secretary Bot</h3></div><span className="owner-office-status">Free · task-record based</span></div><p>Secretary Bot reports only what is recorded in your saved task data. Missing dates are flagged for verification—not counted as confirmed wins.</p><div className="owner-office-actions"><select aria-label="Report period" value={reportType} onChange={e=>setReportType(e.target.value)}><option value="daily">Daily report</option><option value="weekly">Last 7 days report</option></select><button className="gold" onClick={generate}>Generate report</button></div>{notice&&<p className="owner-office-notice" role="status">{notice}</p>}</article>
   <article className="owner-office-panel"><div className="owner-office-heading"><div><p className="bot-kicker">TEAM LEADERSHIP</p><h3>👑 Boss Bot</h3></div><button onClick={onOpenBotTeam}>Open bot team →</button></div><p>Boss Bot remains responsible for priorities, workload, blockers, and team recommendations.</p><button className="owner-office-secondary" onClick={()=>onOpenTasks()}>Review task board →</button></article>
  </section>
  <section className="owner-office-panel"><div className="owner-office-heading"><div><p className="bot-kicker">OWNER ATTENTION</p><h3>Decisions and follow-ups</h3></div><button onClick={onOpenTasks}>Open tasks →</button></div>
   <div className="owner-office-attention"><div><strong>{approvals.length}</strong><span>open tasks flagged for owner approval</span></div><div><strong>{overdue.length}</strong><span>overdue open tasks</span></div><div><strong>{open.filter(t=>!t.assigned_to).length}</strong><span>open tasks without an assignee</span></div></div>
   {approvals.slice(0,5).map(t=><div className="owner-office-list-row" key={t.id}><span><b>{t.title}</b><small>{t.assigned_to||'No assignee'} · owner review required</small></span><button onClick={onOpenTasks}>Review</button></div>)}
   {!approvals.length&&<p className="muted">No open tasks are currently flagged for owner approval.</p>}
  </section>
  <section className="owner-office-panel"><div className="owner-office-heading"><div><p className="bot-kicker">VERIFIED ADMINISTRATIVE RECORD</p><h3>{report?report.type==='daily'?'Daily Secretary Report':'Weekly Secretary Report':'Secretary report preview'}</h3></div>{report&&<span className="owner-office-status">Generated {dateLabel(report.generated_at)}</span>}</div>
   {report?<><div className="owner-office-stats owner-office-report-stats"><article><small>Verified completions</small><strong>{report.totals.verified_completions}</strong></article><article><small>Needs verification</small><strong>{report.totals.unverified_done}</strong></article><article><small>In progress</small><strong>{report.totals.in_progress}</strong></article><article><small>Approvals</small><strong>{report.totals.owner_approvals}</strong></article></div>
    <h4>Confirmed completed work</h4>{report.completed.length?report.completed.map(t=><div className="owner-office-list-row" key={t.id}><span><b>{t.title}</b><small>{t.project} · {t.assignee} · {dateLabel(t.completed_at)}</small>{t.evidence&&<small>Evidence: {t.evidence}</small>}{t.follow_up&&<small>Follow-up: {t.follow_up}</small>}</span><button onClick={onOpenTasks}>Task board</button></div>):<p className="muted">No verified completions in this reporting period.</p>}
    {report.unverified.length>0&&<><h4>Needs verification — not counted as completed</h4>{report.unverified.map(t=><div className="owner-office-list-row owner-office-warning" key={t.id}><span><b>{t.title}</b><small>{t.project} · {t.assignee}</small><small>{t.reason}</small></span><button onClick={onOpenTasks}>Check record</button></div>)}</>}
    <div className="owner-office-report-columns"><div><h4>In progress</h4>{report.in_progress.length?report.in_progress.map(t=><p key={t.id}>{t.title} <small>· {t.assignee}</small></p>):<p className="muted">No tasks currently in progress.</p>}</div><div><h4>Overdue</h4>{report.overdue.length?report.overdue.map(t=><p key={t.id}>{t.title} <small>· due {t.due_date}</small></p>):<p className="muted">No overdue work.</p>}</div></div>
   </>:<p className="muted">Generate a daily or weekly report to create your first saved report. The preview will distinguish verified completions from missing or incomplete records.</p>}
  </section>
  <section className="owner-office-panel"><div className="owner-office-heading"><div><p className="bot-kicker">SAVED UPDATES</p><h3>Report history</h3></div><span className="owner-office-status">{history.length} saved</span></div>{history.length?history.map(item=><button className={'owner-office-history '+((report?.id===item.report.id)?'selected':'')} key={item.logId} onClick={()=>showReport(item.report)}><span><b>{item.report.type==='daily'?'Daily report':'Weekly report'}</b><small>{dateLabel(item.report.generated_at)} · {item.report.totals.verified_completions} verified completion(s)</small></span><span>View →</span></button>):<p className="muted">Saved reports will appear here after you generate one. Reports are stored in your signed-in account's private daily log.</p>}</section>
  <section className="owner-office-footnote"><b>How the two assistants work together</b><p>Boss Bot recommends what to prioritize. Secretary Bot records what the task data verifies. Neither bot sends messages, publishes content, spends money, changes permissions, or performs sensitive actions without your authorization.</p><p>Privacy: reports are saved in the existing account-scoped Daily Log table protected by its user-level Row Level Security policies. No new paid AI service or database migration is required.</p></section>
  <BossBriefing tasks={tasks} logs={logs.filter(l=>!String(l.text||'').startsWith(REPORT_PREFIX))} onOpenTasks={onOpenTasks} onOpenBotTeam={onOpenBotTeam}/>
 </main>;
}
