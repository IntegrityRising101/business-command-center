import {useMemo,useState} from 'react';

const apps=[
 {name:'Wrike',category:'Project Management',description:'Coordinate projects, tasks, timelines, and team workloads.',url:'https://www.wrike.com/',type:'Project planning'},
 {name:'Asana',category:'Project Management',description:'Turn work and conversations into trackable projects and tasks.',url:'https://asana.com/',type:'Project planning'},
 {name:'monday.com',category:'Project Management',description:'Manage projects, workflows, and team operations.',url:'https://monday.com/',type:'Project planning'},
 {name:'Airtable',category:'Project Management',description:'Organize campaign records, content calendars, and structured information.',url:'https://airtable.com/',type:'Work management'},
 {name:'Notion',category:'Collaboration',description:'Create shared knowledge bases, notes, and project workspaces.',url:'https://www.notion.so/',type:'Workspace'},
 {name:'Miro',category:'Collaboration',description:'Build visual idea boards, workflows, mind maps, and campaign plans.',url:'https://miro.com/',type:'Visual planning'},
 {name:'Slack',category:'Collaboration',description:'Coordinate team conversations and send approved updates to channels.',url:'https://slack.com/',type:'Team communication'},
 {name:'Figma',category:'Create & Find Content',description:'Collaborate on brand designs, prototypes, and creative assets.',url:'https://www.figma.com/',type:'Design'},
 {name:'Canva',category:'Create & Find Content',description:'Create social graphics, presentations, flyers, and branded materials.',url:'https://www.canva.com/',type:'Design'},
 {name:'Cloudinary',category:'Audio & Video Sharing',description:'Store, transform, and deliver images and video for digital experiences.',url:'https://cloudinary.com/',type:'Media management'},
 {name:'Brightcove',category:'Audio & Video Sharing',description:'Host and distribute professional video content.',url:'https://www.brightcove.com/',type:'Video'},
 {name:'Vidyard',category:'Audio & Video Sharing',description:'Create, host, and share business videos.',url:'https://www.vidyard.com/',type:'Video'},
 {name:'Channelview Insights',category:'Measure & Analyze',description:'Analytics for YouTube channels and videos, as described in the Hootsuite app directory.',url:'https://www.hootsuite.com/',type:'YouTube analytics',status:'External marketplace listing'},
 {name:'Panoramiq Insights',category:'Measure & Analyze',description:'Instagram analytics in a Hootsuite dashboard, as described in the supplied app listing.',url:'https://www.hootsuite.com/',type:'Instagram analytics',status:'External marketplace listing'},
 {name:'Panoramiq Multiview',category:'Listen & Engage',description:'Monitor Instagram comments, mentions, and photo tags, as described in the supplied listing.',url:'https://www.hootsuite.com/',type:'Social engagement',status:'External marketplace listing'},
 {name:'Hootsuite',category:'Campaigns & Ads',description:'Plan, manage, and measure social media activity across supported networks.',url:'https://www.hootsuite.com/',type:'Social management'},
 {name:'Lately AI',category:'Create & Find Content',description:'Repurpose longer content into social posts using AI-assisted workflows.',url:'https://www.lately.ai/',type:'AI content'},
 {name:'Talkwalker',category:'Listen & Engage',description:'Monitor brand conversations, trends, and online reputation.',url:'https://www.talkwalker.com/',type:'Social listening'},
 {name:'WordPress.com',category:'Create & Find Content',description:'Manage website pages, blog posts, and publishing workflows.',url:'https://wordpress.com/',type:'Website publishing'},
 {name:'Shopify',category:'Social Commerce',description:'Manage products, storefronts, and ecommerce operations.',url:'https://www.shopify.com/',type:'Ecommerce'},
 {name:'WooCommerce',category:'Social Commerce',description:'Run an online store connected to a WordPress website.',url:'https://woocommerce.com/',type:'Ecommerce'},
 {name:'Google Drive',category:'Data Source',description:'Organize business documents, spreadsheets, and presentations.',url:'https://drive.google.com/',type:'File storage'},
 {name:'Google Workspace',category:'Collaboration',description:'Work with Gmail, Docs, Sheets, Slides, and Calendar.',url:'https://workspace.google.com/',type:'Productivity'},
 {name:'HubSpot',category:'CRM & sales',description:'Manage contacts, customer relationships, and sales pipelines.',url:'https://www.hubspot.com/',type:'CRM'},
 {name:'Zoho CRM',category:'CRM & sales',description:'Track contacts, leads, and customer relationships.',url:'https://www.zoho.com/crm/',type:'CRM'},
 {name:'Yext',category:'Review & Reputation Management',description:'Manage business listings and reputation information.',url:'https://www.yext.com/',type:'Reputation'},
 {name:'Spotify',category:'Audio & Video Sharing',description:'Find and share music and podcast references where permitted.',url:'https://open.spotify.com/',type:'Audio'},
 {name:'Jotform',category:'Customer Service',description:'Create intake forms, surveys, registrations, and feedback workflows.',url:'https://www.jotform.com/',type:'Forms'},
 {name:'Calendly',category:'Customer Service',description:'Coordinate appointments, meetings, and booking availability.',url:'https://calendly.com/',type:'Scheduling'}
];
const categories=['All','Project Management','Collaboration','Create & Find Content','Audio & Video Sharing','Campaigns & Ads','CRM & sales','Data Source','Listen & Engage','Measure & Analyze','Review & Reputation Management','Social Commerce','Customer Service'];
export default function ThirdPartyApps(){
 const [query,setQuery]=useState(''),[category,setCategory]=useState('All'),[saved,setSaved]=useState(()=>{try{return JSON.parse(localStorage.getItem('ir-bcc-app-favorites')||'[]')}catch{return[]}});
 const filtered=useMemo(()=>apps.filter(a=>(category==='All'||a.category===category)&&[a.name,a.description,a.category,a.type].join(' ').toLowerCase().includes(query.toLowerCase())),[query,category]);
 const toggle=a=>{const next=saved.includes(a)?saved.filter(x=>x!==a):[...saved,a];setSaved(next);try{localStorage.setItem('ir-bcc-app-favorites',JSON.stringify(next))}catch{}};
 return <main className="panel" style={{padding:22}}>
  <div className="paneltop"><div><p className="eyebrow">APP DIRECTORY & CONNECTION HUB</p><h2>Third-Party Apps & Integrations</h2><p className="muted">A central directory for the tools that support Integrity Rising projects, content, marketing, and operations.</p></div><span className="connection-status">Directory preview</span></div>
  <div className="stats" style={{gridTemplateColumns:'repeat(auto-fit,minmax(130px,1fr))'}}><div><small>Directory apps</small><strong>{apps.length}</strong></div><div><small>Categories</small><strong>{categories.length-1}</strong></div><div><small>Saved favorites</small><strong>{saved.length}</strong></div><div><small>Live integrations</small><strong>0</strong></div></div>
  <div className="email-notice" style={{margin:'16px 0'}}><strong>What is active right now?</strong><p>This first version is an app directory and launcher. It opens each provider's website in a new tab. It does not connect accounts, sync data, embed provider dashboards, or grant permissions. Those require separate provider-supported integrations and your approval.</p></div>
  <div className="filters"><input aria-label="Search third-party apps" placeholder="Search apps, tools, or capabilities…" value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Filter app category" value={category} onChange={e=>setCategory(e.target.value)}>{categories.map(c=><option key={c}>{c}</option>)}</select></div>
  <div style={{display:'flex',gap:8,flexWrap:'wrap',margin:'12px 0 18px'}}>{['Free options first','Popular tools','3rd-party services','Owner approval required'].map(x=><span className="badge" key={x}>{x}</span>)}</div>
  <div className="tiles" style={{gridTemplateColumns:'repeat(auto-fit,minmax(230px,1fr))'}}>{filtered.map(a=><article className="tile" key={a.name} style={{textAlign:'left',display:'flex',flexDirection:'column',gap:8}}><div style={{display:'flex',justifyContent:'space-between',gap:8,alignItems:'center'}}><span className="badge">{a.category}</span><button aria-label={(saved.includes(a.name)?'Remove ':'Save ')+a.name} onClick={()=>toggle(a.name)} title="Save favorite">{saved.includes(a.name)?'★':'☆'}</button></div><h3 style={{margin:'4px 0'}}>{a.name}</h3><p>{a.description}</p><small className="muted">{a.type}{a.status?' · '+a.status:''}</small><a className="gold email-open" href={a.url} target="_blank" rel="noopener noreferrer" style={{textAlign:'center',marginTop:'auto'}}>Open official site ↗</a></article>)}</div>
  {!filtered.length&&<p className="muted">No apps match that search. Try another keyword or category.</p>}
  <section className="panel" style={{padding:16,marginTop:20}}><h3>Integration roadmap</h3><ol><li><strong>Directory & launchers:</strong> available in this first version.</li><li><strong>Connection registry:</strong> record provider, owner, requested scopes, connection health, and last check.</li><li><strong>Read-only integrations:</strong> start with approved data such as project status and analytics.</li><li><strong>Write actions:</strong> create tasks or schedule content only after explicit approval.</li><li><strong>Security reviews:</strong> revoke access, review audit history, and remove connections safely.</li></ol></section>
  <p className="muted" style={{marginTop:14}}>Favorites are saved in this browser only. No API keys or passwords belong in this directory. Pricing, free tiers, and marketplace availability can change; verify terms with each provider before signing up.</p>
 </main>;
}
