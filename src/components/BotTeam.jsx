const bots=[
  {name:'Boss Bot',emoji:'👑',role:'Team manager',description:'Keeps the whole team focused, spots blockers, and reports what needs your attention.',focus:'Team priorities',color:'gold'},
  {name:'Tasky',emoji:'📋',role:'Task coordinator',description:'Keeps assignments, task status, and next steps organized.',focus:'Task board',color:'teal'},
  {name:'Deadline Bot',emoji:'⏰',role:'Deadline watcher',description:'Highlights overdue work and upcoming due dates before they sneak up.',focus:'Due dates',color:'blue'},
  {name:'Doc Bot',emoji:'📁',role:'Document organizer',description:'Helps keep business files, records, and important resources in order.',focus:'Documents',color:'gold'},
  {name:'Scout',emoji:'🔎',role:'Opportunity researcher',description:'Will research potential customers, partners, and growth opportunities.',focus:'Growth research',color:'teal'},
  {name:'Brainy',emoji:'📊',role:'Business analyst',description:'Will prepare a competitor and business-gap review every two weeks.',focus:'Biweekly review',color:'blue'},
  {name:'Maily',emoji:'💌',role:'Outreach assistant',description:'Will prepare personalized customer emails for your review before sending.',focus:'Email drafts',color:'gold'},
  {name:'Cheer Bot',emoji:'🎉',role:'Celebration captain',description:'Recognizes completed work, streaks, new customers, and important milestones.',focus:'Wall of wins',color:'teal'}
];
export default function BotTeam({tasks=[],logs=[],onOpenTasks}){
 const open=tasks.filter(t=>t.status!=='Done');
 const done=tasks.filter(t=>t.status==='Done');
 const overdue=open.filter(t=>t.due_date&&t.due_date<new Date().toISOString().slice(0,10));
 const wins=logs.filter(l=>String(l.text||'').includes('🏆')).slice(0,8);
 return <div className="bot-team">
  <section className="bot-welcome">
   <div className="bot-crown">👑</div>
   <div><p className="bot-kicker">YOUR FRIENDLY AI MANAGEMENT TEAM</p><h2>Meet the Bot Squad!</h2><p>Little helpers. Big purpose. One team working toward your goals.</p></div>
   <div className="boss-message"><strong>Boss Bot says:</strong><br/>“Hi Christina! Let's make today count. Every step forward matters!”</div>
  </section>
  <div className="bot-summary"><div><small>Open tasks</small><strong>{open.length}</strong></div><div><small>Completed</small><strong>{done.length}</strong></div><div><small>Needs attention</small><strong>{overdue.length}</strong></div><div><small>Celebrated wins</small><strong>{wins.length}</strong></div></div>
  <div className="bot-section-heading"><div><p className="bot-kicker">THE CREW</p><h2>Meet your assistants</h2></div><span className="bot-status">Team plan · staged rollout</span></div>
  <div className="bot-grid">{bots.map((bot,i)=><article className={'bot-card '+bot.color} key={bot.name}>
   <div className="bot-card-top"><div className="bot-avatar" aria-hidden="true">{bot.emoji}</div><span className="bot-number">BOT {String(i+1).padStart(2,'0')}</span></div>
   <h3>{bot.name}</h3><strong className="bot-role">{bot.role}</strong><p>{bot.description}</p><div className="bot-focus"><span>FOCUS</span>{bot.focus}</div>
   <span className="bot-state">{i<4?'Dashboard helper':'Planned automation'}</span>
  </article>)}</div>
  <section className="bot-wall">
   <div className="bot-section-heading"><div><p className="bot-kicker">EVERY STEP COUNTS</p><h2>🏆 Wall of Accomplishments</h2></div><button className="gold" onClick={onOpenTasks}>View tasks</button></div>
   <p className="bot-wall-intro">We celebrate progress, not perfection. Every recorded win deserves recognition.</p>
   {wins.length?<div className="bot-wins">{wins.map((w,i)=><article key={w.id||i}><span>🏅</span><div><strong>{w.text.replace(/^🏆\s*/,'')}</strong><small>{w.date||'Achievement recorded'}</small></div></article>)}</div>:<div className="bot-empty"><span>✨</span><strong>Your first celebration is waiting!</strong><p>Complete a task and Cheer Bot will add your win here.</p></div>}
  </section>
  <p className="bot-footnote">Automation note: these are the first dashboard profiles. Competitor research, customer discovery, and email automation will be connected in later phases. Email sending and paid services will always require your approval.</p>
 </div>
}