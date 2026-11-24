import {useState} from 'react';

const bots=[
 {name:'Boss Bot',emoji:'👑',role:'Team manager',description:'Turns your saved task board into a clear owner briefing with priorities, blockers, and approval reminders.',focus:'Team priorities',color:'gold',responsibilities:['Review open and completed work','Identify urgent tasks, blockers, and approval flags','Summarize the next best owner action'],assignment:'All workstreams'},
 {name:'Tasky',emoji:'📋',role:'Task coordinator',description:'Finds unassigned work, organizes priorities, and recommends the next task to tackle.',focus:'Task board',color:'teal',responsibilities:['Review task assignments and status','Highlight unassigned tasks','Recommend a practical next action'],assignment:'Task board'},
 {name:'Deadline Bot',emoji:'⏰',role:'Deadline watcher',description:'Checks saved due dates and separates overdue work from upcoming deadlines.',focus:'Due dates',color:'blue',responsibilities:['Identify overdue tasks','List upcoming deadlines','Flag open tasks without due dates'],assignment:'Tasks with due dates'},
 {name:'Doc Bot',emoji:'📁',role:'Document organizer',description:'Builds a practical filing plan and identifies document-related work without moving or deleting files.',focus:'Documents',color:'gold',responsibilities:['Identify document and publishing tasks','Suggest a consistent folder structure','Flag document tasks that need an owner'],assignment:'Document and Media Center'},
 {name:'Scout',emoji:'🔎',role:'Opportunity researcher',description:'Prepares a focused research queue and records what evidence needs to be collected.',focus:'Growth research',color:'teal',responsibilities:['Identify research and growth questions','Prepare a source-collection checklist','Separate verified findings from ideas'],assignment:'Research tasks'},
 {name:'Brainy',emoji:'📊',role:'Business analyst',description:'Analyzes your current task-board mix and points out gaps using saved workspace data.',focus:'Business analysis',color:'blue',responsibilities:['Summarize project workload','Spot missing owners and due dates','Recommend evidence-based planning improvements'],assignment:'Planning and analysis'},
 {name:'Maily',emoji:'💌',role:'Outreach assistant',description:'Creates editable email drafts for your review. It never sends messages.',focus:'Email drafts',color:'gold',responsibilities:['Prepare a reusable outreach draft','Keep tone professional and human','Require owner approval before any sending integration'],assignment:'Email workspace'},
 {name:'Cheer Bot',emoji:'🎉',role:'Celebration captain',description:'Recognizes completed work, milestones, and consistent progress.',focus:'Wall of wins',color:'teal',responsibilities:['Celebrate completed tasks','Show recorded wins','Encourage progress, not perfection'],assignment:'Completed tasks and daily log'},
 {name:'Program Manager Bot',emoji:'🛠️',role:'Software project manager',description:'Reviews software-related tasks, testing needs, and release risks. It proposes fixes but does not change code or deploy.',focus:'Build and release health',color:'blue',responsibilities:['Triage software and testing tasks','Identify release blockers and missing checks','Request approval before risky changes or deployment'],assignment:'Software and app work'}
];

const today=()=>new Date().toISOString().slice(0,10);
const isOpen=t=>t.status!=='Done';
const priorityRank=t=>({high:0,medium:1,low:2}[String(t.priority||'').toLowerCase()]??3);
const dueLabel=t=>t.due_date||'No due date';
const includes=(t,re)=>re.test([t.title,t.category,t.notes].filter(Boolean).join(' '));

export default function BotTeam({tasks=[],logs=[],onOpenTasks,onAddLog}){
 const [selectedBot,setSelectedBot]=useState(null);
 const [report,setReport]=useState(null);
 const [draft,setDraft]=useState('');
 const [draftRecipient,setDraftRecipient]=useState('');
 const [draftPurpose,setDraftPurpose]=useState('Introduce Integrity Rising and invite a conversation');
 const [message,setMessage]=useState('');
 const open=tasks.filter(isOpen);
 const done=tasks.filter(t=>t.status==='Done');
 const overdue=open.filter(t=>t.due_date&&t.due_date<today());
 const wins=logs.filter(l=>String(l.text||'').includes('🏆')).slice(0,8);
 const assigned=tasks.filter(t=>t.assigned_to).length;
 const unassigned=open.filter(t=>!t.assigned_to).length;
 const approvalNeeded=open.filter(t=>t.approval_required).length;

 const getAssigned=bot=>{
   const explicit=tasks.filter(t=>t.assigned_to===bot.name);
   if(explicit.length)return explicit;
   if(bot.name==='Boss Bot'||bot.name==='Program Manager Bot')return tasks.filter(t=>bot.name==='Boss Bot'||includes(t,/app|software|code|github|supabase|deploy|bug|test|release/i));
   if(bot.name==='Tasky')return open;
   if(bot.name==='Deadline Bot')return tasks.filter(t=>t.due_date);
   if(bot.name==='Doc Bot')return tasks.filter(t=>includes(t,/document|media|file|drive|book|publish|workbook|pdf/i));
   if(bot.name==='Scout')return tasks.filter(t=>includes(t,/research|resource|marketing|funding|prospect|partner|opportunity/i));
   if(bot.name==='Brainy')return tasks.filter(t=>includes(t,/plan|dashboard|monetization|strategy|review|business/i));
   if(bot.name==='Maily')return tasks.filter(t=>includes(t,/email|gmail|outreach|customer/i));
   return done;
 };

 const buildReport=bot=>{
   const relevant=getAssigned(bot);
   const botOpen=relevant.filter(isOpen);
   const botDone=relevant.filter(t=>t.status==='Done');
   const missingDue=botOpen.filter(t=>!t.due_date);
   const missingOwner=botOpen.filter(t=>!t.assigned_to);
   let lines=[];
   switch(bot.name){
    case 'Boss Bot': {
      const top=[...open].sort((a,b)=>priorityRank(a)-priorityRank(b)||(a.due_date||'9999').localeCompare(b.due_date||'9999')).slice(0,3);
      lines=['OWNER BRIEFING',`Open tasks: ${open.length} · Completed: ${done.length} · Overdue: ${overdue.length}`,`Owner approvals flagged: ${approvalNeeded} · Unassigned open tasks: ${unassigned}`,'Top priorities:',...(top.length?top.map((t,i)=>`${i+1}. ${t.title} — ${t.priority||'normal'} · ${dueLabel(t)}`):['No open tasks right now.']),'Recommended owner action: review the highest-priority item and confirm its next step.'];break;
    }
    case 'Tasky': {
      const queue=[...open].sort((a,b)=>priorityRank(a)-priorityRank(b)).slice(0,5);
      lines=['TASK BOARD CHECK',`Open tasks: ${open.length} · Unassigned: ${unassigned}`,`Open tasks without due dates: ${missingDue.length}`,'Suggested work queue:',...(queue.length?queue.map((t,i)=>`${i+1}. ${t.title} — ${t.status} · ${t.priority||'normal'}`):['Nothing waiting in the queue.']),'Next step: assign an owner and due date to the most important unassigned task.'];break;
    }
    case 'Deadline Bot': {
      const upcoming=botOpen.filter(t=>t.due_date&&t.due_date>=today()).sort((a,b)=>a.due_date.localeCompare(b.due_date)).slice(0,5);
      lines=['DEADLINE SCAN',`Overdue: ${overdue.length} · Upcoming dated tasks: ${upcoming.length} · Open tasks missing due dates: ${missingDue.length}`,'Overdue:',...(overdue.length?overdue.map(t=>`${t.title} — due ${t.due_date}`):['None.']),'Coming up:',...(upcoming.length?upcoming.map(t=>`${t.title} — ${t.due_date}`):['No upcoming dated tasks.'])];break;
    }
    case 'Doc Bot': {
      const docs=tasks.filter(t=>includes(t,/document|media|file|drive|book|publish|workbook|pdf/i));
      lines=['DOCUMENT ORGANIZATION CHECK',`Related tasks found: ${docs.length} · Open: ${docs.filter(isOpen).length}`,'Suggested folder structure:','1. Business Plans & Policies','2. Books & Publishing','3. Academy Courses & Workbooks','4. Marketing & Brand Assets','5. Finance & Administration','6. Completed & Archived','No files were moved, renamed, shared, or deleted.'];break;
    }
    case 'Scout': {
      const research=tasks.filter(t=>includes(t,/research|resource|marketing|funding|prospect|partner|opportunity/i));
      lines=['RESEARCH QUEUE PREPARED',`Related tasks: ${research.length} · Open: ${research.filter(isOpen).length}`,'For each research task, collect:','• Source name and direct link','• Date checked and key finding','• Price or free-plan limits, if relevant','• Why it may help Integrity Rising','• Recommended next step','This test prepares the research plan; it has not fetched or verified external sources.'];break;
    }
    case 'Brainy': {
      const categories=[...new Set(tasks.map(t=>t.category||'General'))];
      const summary=categories.map(c=>`${c}: ${tasks.filter(t=>(t.category||'General')===c&&isOpen(t)).length} open`);
      lines=['WORKSPACE ANALYSIS',`Total tasks: ${tasks.length} · Open: ${open.length} · Completed: ${done.length}`,`Open tasks missing an owner: ${missingOwner.length} · Missing a due date: ${missingDue.length}`,'Open work by project:',...(summary.length?summary:['No project categories yet.']),'Recommendation: resolve overdue and unassigned high-priority tasks before adding more projects.','This analysis uses only saved task-board data; it is not market or competitor research.'];break;
    }
    case 'Maily': {
      lines=['EMAIL DRAFT WORKSPACE','Use the draft builder below to prepare an editable message.','Safety: this workspace does not connect to Gmail and cannot send email. Every future send action must require your approval.'];break;
    }
    case 'Cheer Bot': {
      lines=['WALL OF WINS',`Completed tasks: ${done.length} · Recorded celebrations: ${wins.length}`,'Recent wins:',...(wins.length?wins.slice(0,5).map(w=>String(w.text).replace(/^🏆\s*/,'')):['Your next completed task will add a celebration.']),'You are making progress one step at a time. Keep rising!'];break;
    }
    case 'Program Manager Bot': {
      const software=tasks.filter(t=>includes(t,/app|software|code|github|supabase|deploy|bug|test|release/i));
      const risks=software.filter(t=>isOpen(t)&&(t.priority==='high'||!t.due_date));
      lines=['SOFTWARE DELIVERY TRIAGE',`Software-related tasks: ${software.length} · Open: ${software.filter(isOpen).length}`,`High-priority or undated open items: ${risks.length}`,'Review before a release:','• Build and automated checks pass','• Owner verifies the live behavior','• Database/security changes receive explicit approval','• Deployment is recorded and confirmed','This bot only reports and recommends in this test. It did not edit code, data, permissions, or deployment settings.'];break;
    }
   }
   return lines.join('\n');
 };

 const runBot=async bot=>{
   const text=buildReport(bot);
   setReport({name:bot.name,text,at:new Date().toLocaleString()});
   setMessage(`${bot.name} completed a workspace check.`);
   if(onAddLog)await onAddLog(`🤖 ${bot.name} ran a test check — ${text.split('\n')[1]||'Report prepared.'}`);
 };
 const makeDraft=()=>{
   const recipient=draftRecipient.trim()||'there';
   const body=`Subject: A quick introduction to Integrity Rising\n\nHello ${recipient},\n\nI’m reaching out to introduce Integrity Rising, a community and learning platform focused on personal growth, accountability, leadership, and helping people move forward with purpose.\n\n${draftPurpose.trim()||'I would love to connect and explore whether there may be a helpful opportunity to work together.'}\n\nIf this sounds relevant, I’d be glad to share more information or learn about your work.\n\nThank you,\nChristina\nIntegrity Rising\nUnited by Truth, Driven by Purpose`;
   setDraft(body);setMessage('Maily prepared an editable draft. Nothing was sent.');
 };
 const copyDraft=async()=>{
   try{await navigator.clipboard.writeText(draft);setMessage('Draft copied. It has not been sent.')}
   catch{setMessage('Copy is unavailable in this browser. Select the draft text to copy it.')}
 };

 return <div className="bot-team">
  <section className="bot-welcome"><div className="bot-crown">👑</div><div><p className="bot-kicker">YOUR FRIENDLY AI MANAGEMENT TEAM</p><h2>Meet the Bot Squad!</h2><p>Run a test in each workspace and see what your helpers can do with saved business data.</p></div><div className="boss-message"><strong>Boss Bot says:</strong><br/>“Let's turn the plan into progress—one verified step at a time!”</div></section>
  <div className="bot-summary"><div><small>Open tasks</small><strong>{open.length}</strong></div><div><small>Completed</small><strong>{done.length}</strong></div><div><small>Overdue</small><strong>{overdue.length}</strong></div><div><small>Celebrated wins</small><strong>{wins.length}</strong></div><div><small>Assigned</small><strong>{assigned}</strong></div><div><small>Unassigned open</small><strong>{unassigned}</strong></div><div><small>Approval flagged</small><strong>{approvalNeeded}</strong></div></div>
  <div className="bot-section-heading"><div><p className="bot-kicker">THE CREW</p><h2>Meet your assistants</h2></div><span className="bot-status">9 testable workspaces · MVP mode</span></div>
  <div className="bot-grid">{bots.map((bot,i)=><button type="button" className={'bot-card '+bot.color+' bot-card-button'} key={bot.name} onClick={()=>{setSelectedBot(bot);setReport(null);setMessage('')}} aria-label={'Open '+bot.name+' workspace'}>
   <div className="bot-card-top"><div className="bot-avatar" aria-hidden="true">{bot.emoji}</div><span className="bot-number">BOT {String(i+1).padStart(2,'0')}</span></div><h3>{bot.name}</h3><strong className="bot-role">{bot.role}</strong><p>{bot.description}</p><div className="bot-focus"><span>FOCUS</span>{bot.focus}</div><span className="bot-state">Testable workspace</span><span className="bot-open-hint">Open & run test →</span>
  </button>)}</div>
  <section className="bot-wall"><div className="bot-section-heading"><div><p className="bot-kicker">EVERY STEP COUNTS</p><h2>🏆 Wall of Accomplishments</h2></div><button className="gold" onClick={onOpenTasks}>View tasks</button></div><p className="bot-wall-intro">We celebrate progress, not perfection. Every recorded win deserves recognition.</p>{wins.length?<div className="bot-wins">{wins.map((w,i)=><article key={w.id||i}><span>🏅</span><div><strong>{String(w.text).replace(/^🏆\s*/,'')}</strong><small>{w.date||'Achievement recorded'}</small></div></article>)}</div>:<div className="bot-empty"><span>✨</span><strong>Your first celebration is waiting!</strong><p>Complete a task and Cheer Bot will add your win here.</p></div>}</section>
  <p className="bot-footnote">Important: these are testable, rule-based assistant workspaces using your saved task and activity data—not independent background AI agents yet. Scout prepares research checklists but does not fetch sources in this version. Maily creates drafts but cannot send. Doc Bot does not move files. Program Manager Bot does not edit code or deploy. Paid services and higher-risk actions remain behind owner approval.</p>
  {selectedBot&&<div className="bot-workspace-shade" role="presentation" onClick={()=>setSelectedBot(null)}><section className="bot-workspace" role="dialog" aria-modal="true" aria-labelledby="bot-workspace-title" onClick={e=>e.stopPropagation()}>
   <div className="bot-workspace-heading"><div className="bot-avatar">{selectedBot.emoji}</div><div><p className="bot-kicker">ASSISTANT WORKSPACE</p><h2 id="bot-workspace-title">{selectedBot.name}</h2><strong>{selectedBot.role}</strong></div><button type="button" className="bot-close" onClick={()=>setSelectedBot(null)} aria-label="Close workspace">×</button></div>
   <p className="bot-workspace-description">{selectedBot.description}</p>
   <div className="bot-workspace-stats"><div><small>Related tasks</small><strong>{getAssigned(selectedBot).length}</strong></div><div><small>Open tasks</small><strong>{getAssigned(selectedBot).filter(isOpen).length}</strong></div><div><small>Completed</small><strong>{getAssigned(selectedBot).filter(t=>t.status==='Done').length}</strong></div></div>
   <h3>Responsibilities</h3><ul>{selectedBot.responsibilities.map(item=><li key={item}>{item}</li>)}</ul>
   <h3>Current assignments</h3><p className="bot-assignment-label">{selectedBot.assignment}</p>
   {getAssigned(selectedBot).length?<div className="bot-assigned-list">{getAssigned(selectedBot).slice(0,6).map(task=><article key={task.id}><span>{task.title}</span><small>{task.status} · {task.priority||'normal'} priority</small></article>)}</div>:<p className="bot-no-assignments">No matching tasks yet. Run a workspace check to see general recommendations.</p>}
   {selectedBot.name==='Maily'&&<div className="bot-test-panel"><h3>Draft a test email</h3><label>Recipient name (optional)<input value={draftRecipient} onChange={e=>setDraftRecipient(e.target.value)} placeholder="Name or organization"/></label><label>Purpose<textarea rows="2" value={draftPurpose} onChange={e=>setDraftPurpose(e.target.value)}/></label><button type="button" className="gold" onClick={makeDraft}>Create email draft</button>{draft&&<><label>Editable draft<textarea rows="12" value={draft} onChange={e=>setDraft(e.target.value)}/></label><button type="button" onClick={copyDraft}>Copy draft</button></>}</div>}
   <div className="bot-workspace-actions"><button type="button" onClick={()=>runBot(selectedBot)}>Run workspace test</button><button type="button" onClick={()=>{setSelectedBot(null);onOpenTasks?.()}}>Open task board</button><button type="button" className="gold" onClick={()=>setSelectedBot(null)}>Close</button></div>
   {report?.name===selectedBot.name&&<div className="bot-run-report"><div><strong>{selectedBot.name} report</strong><small>{report.at}</small></div><pre>{report.text}</pre></div>}
   {message&&<p className="bot-test-message" role="status">{message}</p>}
  </section></div>}
 </div>;
}
