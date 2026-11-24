import {useState} from 'react';

const bots=[
  {name:'Boss Bot',emoji:'👑',role:'Team manager',description:'Keeps the whole team focused, spots blockers, and reports what needs your attention.',focus:'Team priorities',color:'gold',responsibilities:['Review overall project progress','Identify blockers and high-priority work','Prepare a weekly recognition and progress summary'],assignment:'All workstreams'},
  {name:'Tasky',emoji:'📋',role:'Task coordinator',description:'Keeps assignments, task status, and next steps organized.',focus:'Task board',color:'teal',responsibilities:['Review planned and in-progress tasks','Help identify the next actionable step','Keep task details and status clear'],assignment:'Task board'},
  {name:'Deadline Bot',emoji:'⏰',role:'Deadline watcher',description:'Highlights overdue work and upcoming due dates before they sneak up.',focus:'Due dates',color:'blue',responsibilities:['Review tasks with due dates','Highlight overdue and upcoming work','Help prioritize deadline-sensitive tasks'],assignment:'Tasks with due dates'},
  {name:'Doc Bot',emoji:'📁',role:'Document organizer',description:'Helps keep business files, records, and important resources in order.',focus:'Documents',color:'gold',responsibilities:['Plan a clear folder structure','Help organize business documents and media','Track document-center improvements'],assignment:'Document and Media Center'},
  {name:'Scout',emoji:'🔎',role:'Opportunity researcher',description:'Will research potential customers, partners, and growth opportunities.',focus:'Growth research',color:'teal',responsibilities:['Research relevant tools and opportunities','Collect sources for review','Summarize findings and practical next steps'],assignment:'Research tasks'},
  {name:'Brainy',emoji:'📊',role:'Business analyst',description:'Will prepare a competitor and business-gap review every two weeks.',focus:'Biweekly review',color:'blue',responsibilities:['Review project progress and gaps','Compare options and business workflows','Prepare evidence-based recommendations'],assignment:'Planning and analysis'},
  {name:'Maily',emoji:'💌',role:'Outreach assistant',description:'Will prepare personalized customer emails for your review before sending.',focus:'Email drafts',color:'gold',responsibilities:['Organize email workflow requirements','Prepare draft replies for approval','Track follow-ups after Gmail integration'],assignment:'Email workspace'},
  {name:'Cheer Bot',emoji:'🎉',role:'Celebration captain',description:'Recognizes completed work, streaks, new customers, and important milestones.',focus:'Wall of wins',color:'teal',responsibilities:['Celebrate completed tasks','Recognize milestones and consistent progress','Keep the accomplishments wall encouraging'],assignment:'Completed tasks and daily log'}
];
export default function BotTeam({tasks=[],logs=[],onOpenTasks}){
 const [selectedBot,setSelectedBot]=useState(null);
 const open=tasks.filter(t=>t.status!=='Done');
 const done=tasks.filter(t=>t.status==='Done');
 const overdue=open.filter(t=>t.due_date&&t.due_date<new Date().toISOString().slice(0,10));
 const wins=logs.filter(l=>String(l.text||'').includes('🏆')).slice(0,8);
 const getAssigned=(bot)=>{
   if(bot.name==='Boss Bot')return tasks;
   if(bot.name==='Tasky')return tasks.filter(t=>t.status!=='Done');
   if(bot.name==='Deadline Bot')return tasks.filter(t=>t.due_date);
   if(bot.name==='Doc Bot')return tasks.filter(t=>/document|media|file|drive/i.test(t.title+' '+(t.notes||'')));
   if(bot.name==='Scout')return tasks.filter(t=>/research|resource|marketing|funding/i.test(t.title+' '+(t.category||'')));
   if(bot.name==='Brainy')return tasks.filter(t=>/plan|dashboard|monetization|strategy|review/i.test(t.title+' '+(t.category||'')));
   if(bot.name==='Maily')return tasks.filter(t=>/email|gmail|outreach/i.test(t.title+' '+(t.notes||'')));
   return done;
 };
 return <div className="bot-team">
  <section className="bot-welcome">
   <div className="bot-crown">👑</div>
   <div><p className="bot-kicker">YOUR FRIENDLY AI MANAGEMENT TEAM</p><h2>Meet the Bot Squad!</h2><p>Little helpers. Big purpose. One team working toward your goals.</p></div>
   <div className="boss-message"><strong>Boss Bot says:</strong><br/>“Hi! Let's make today count. Every step forward matters!”</div>
  </section>
  <div className="bot-summary"><div><small>Open tasks</small><strong>{open.length}</strong></div><div><small>Completed</small><strong>{done.length}</strong></div><div><small>Needs attention</small><strong>{overdue.length}</strong></div><div><small>Celebrated wins</small><strong>{wins.length}</strong></div></div>
  <div className="bot-section-heading"><div><p className="bot-kicker">THE CREW</p><h2>Meet your assistants</h2></div><span className="bot-status">Interactive profiles · staged rollout</span></div>
  <div className="bot-grid">{bots.map((bot,i)=><button type="button" className={'bot-card '+bot.color+' bot-card-button'} key={bot.name} onClick={()=>setSelectedBot(bot)} aria-label={'Open '+bot.name+' workspace'}>
   <div className="bot-card-top"><div className="bot-avatar" aria-hidden="true">{bot.emoji}</div><span className="bot-number">BOT {String(i+1).padStart(2,'0')}</span></div>
   <h3>{bot.name}</h3><strong className="bot-role">{bot.role}</strong><p>{bot.description}</p><div className="bot-focus"><span>FOCUS</span>{bot.focus}</div>
   <span className="bot-state">{i<4?'Dashboard helper':'Planned automation'}</span><span className="bot-open-hint">Open workspace →</span>
  </button>)}</div>
  <section className="bot-wall">
   <div className="bot-section-heading"><div><p className="bot-kicker">EVERY STEP COUNTS</p><h2>🏆 Wall of Accomplishments</h2></div><button className="gold" onClick={onOpenTasks}>View tasks</button></div>
   <p className="bot-wall-intro">We celebrate progress, not perfection. Every recorded win deserves recognition.</p>
   {wins.length?<div className="bot-wins">{wins.map((w,i)=><article key={w.id||i}><span>🏅</span><div><strong>{w.text.replace(/^🏆\s*/,'')}</strong><small>{w.date||'Achievement recorded'}</small></div></article>)}</div>:<div className="bot-empty"><span>✨</span><strong>Your first celebration is waiting!</strong><p>Complete a task and Cheer Bot will add your win here.</p></div>}
  </section>
  <p className="bot-footnote">Workspace status: profiles and task summaries are interactive. Research, Gmail, external actions, and autonomous automation are not connected yet. Boss Bot must request approval before major changes, security or permission changes, spending, or publishing/deploying significant updates. Email sending always requires your approval.</p>
  {selectedBot&&<div className="bot-workspace-shade" role="presentation" onClick={()=>setSelectedBot(null)}><section className="bot-workspace" role="dialog" aria-modal="true" aria-labelledby="bot-workspace-title" onClick={e=>e.stopPropagation()}>
    <div className="bot-workspace-heading"><div className="bot-avatar">{selectedBot.emoji}</div><div><p className="bot-kicker">ASSISTANT WORKSPACE</p><h2 id="bot-workspace-title">{selectedBot.name}</h2><strong>{selectedBot.role}</strong></div><button type="button" className="bot-close" onClick={()=>setSelectedBot(null)} aria-label="Close workspace">×</button></div>
    <p className="bot-workspace-description">{selectedBot.description}</p>
    <div className="bot-workspace-stats"><div><small>Related tasks</small><strong>{getAssigned(selectedBot).length}</strong></div><div><small>Open tasks</small><strong>{getAssigned(selectedBot).filter(t=>t.status!=='Done').length}</strong></div><div><small>Completed</small><strong>{getAssigned(selectedBot).filter(t=>t.status==='Done').length}</strong></div></div>
    <h3>Responsibilities</h3><ul>{selectedBot.responsibilities.map(item=><li key={item}>{item}</li>)}</ul>
    <h3>Current assignments</h3><p className="bot-assignment-label">{selectedBot.assignment}</p>
    {getAssigned(selectedBot).length?<div className="bot-assigned-list">{getAssigned(selectedBot).slice(0,6).map(task=><article key={task.id}><span>{task.title}</span><small>{task.status} · {task.priority||'normal'} priority</small></article>)}</div>:<p className="bot-no-assignments">No matching tasks yet. New related tasks will appear here as the plan grows.</p>}
    <div className="bot-workspace-note"><strong>What this bot can do right now</strong><p>This workspace reads your saved task and accomplishment data. It does not independently run background jobs or contact people. Those integrations will be added and tested separately.</p></div>
    <div className="bot-workspace-actions"><button type="button" onClick={()=>{setSelectedBot(null);onOpenTasks?.()}}>Open task board</button><button type="button" className="gold" onClick={()=>setSelectedBot(null)}>Close workspace</button></div>
  </section></div>}
 </div>
}
