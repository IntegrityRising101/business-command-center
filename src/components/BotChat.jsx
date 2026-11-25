import {useEffect,useMemo,useState} from 'react';
import {supabase} from '../lib/supabase';

const TEAM='Team Inbox';
const toneReply=(bot,text,tasks,memory,recipient)=>{
 const words=String(text||'').toLowerCase();
 const open=tasks.filter(t=>t.status!=='Done').length;
 let focus='I can help organize the next step. Tell me the outcome you want, any deadline, and what constraints I should respect.';
 if(/task|assign|priority|deadline|due/.test(words))focus='I can help review the task board. There are currently '+open+' open tasks. I can suggest an owner and next step, but I will not change assignments or carry out work without required approval.';
 else if(/remember|memory|learn|feedback|prefer/.test(words))focus='I can turn a useful preference into a memory suggestion. It will remain pending until you review and approve it.';
 else if(/team|handoff|collaborat|help/.test(words))focus='I can help prepare a team handoff. I will identify a suitable specialist, but this MVP does not run independent bot-to-bot conversations yet.';
 else if(/privacy|private|secure|data/.test(words))focus='Your conversation is stored in your signed-in workspace under owner-only row-level security. This version does not send chat content to an external AI provider.';
 else if(/hello|hi |hey/.test(words))focus='Hello! I am ready to help. What would you like to work on first?';
 const guidance=memory.map(m=>m.content).filter(Boolean);
 return 'I am '+(bot===TEAM?'your Team Inbox coordinator':bot)+'. '+(bot===TEAM?'This message is addressed to '+(recipient||'the whole team')+'. ':'')+focus+(guidance.length?' I will follow this approved guidance: '+guidance.join(' | '):'')+' This is the starter chat foundation; live generative AI responses are not connected yet.';
};

export default function BotChat({userId,bot,tasks=[],bots=[]}){
 const [tab,setTab]=useState('chat');
 const [conversations,setConversations]=useState([]);
 const [conversation,setConversation]=useState(null);
 const [messages,setMessages]=useState([]);
 const [memories,setMemories]=useState([]);
 const [text,setText]=useState('');
 const [remember,setRemember]=useState(false);
 const [busy,setBusy]=useState(false);
 const [notice,setNotice]=useState('Loading private conversations…');
 const [candidate,setCandidate]=useState('');
 const [recipient,setRecipient]=useState('Whole team');
 const activeBot=bot?.name||TEAM;
 const currentName=tab==='team'?TEAM:activeBot;
 const approved=useMemo(()=>memories.filter(m=>m.status==='approved'&&(m.bot_name===currentName||m.bot_name===TEAM)),[memories,currentName]);
 const pending=useMemo(()=>memories.filter(m=>m.status==='pending'),[memories]);

 const loadAll=async()=>{
  if(!userId)return;
  setNotice('Loading private conversations…');
  const [c,m]=await Promise.all([
   supabase.from('bot_conversations').select('*').eq('user_id',userId).order('updated_at',{ascending:false}),
   supabase.from('bot_memories').select('*').eq('user_id',userId).order('created_at',{ascending:false})
  ]);
  if(c.error||m.error){setNotice('Chat tables are not ready yet. Apply the new Supabase migration in the repository, then refresh.');return;}
  setConversations(c.data||[]);setMemories(m.data||[]);setNotice('Private workspace connected. Conversations and memory are owner-controlled.');
 };
 useEffect(()=>{loadAll();},[userId]);
 useEffect(()=>{
  const found=conversations.find(c=>c.bot_name===currentName);
  setConversation(found||null);
 },[conversations,currentName]);
 useEffect(()=>{
  let active=true;
  const loadMessages=async()=>{
   if(!conversation){setMessages([]);return;}
   const {data,error}=await supabase.from('bot_messages').select('*').eq('user_id',userId).eq('conversation_id',conversation.id).order('created_at',{ascending:true});
   if(!active)return;
   if(error){setNotice('Could not load this conversation: '+error.message);return;}
   setMessages(data||[]);
  };
  loadMessages();
  return()=>{active=false};
 },[conversation?.id,userId]);

 const getOrCreate=async()=>{
  if(conversation)return conversation;
  const {data,error}=await supabase.from('bot_conversations').insert({user_id:userId,bot_name:currentName,title:currentName===TEAM?'Team Inbox':currentName+' Chat'}).select().single();
  if(error)throw error;
  setConversations(prev=>[data,...prev]);setConversation(data);return data;
 };
 const send=async e=>{
  e?.preventDefault();const body=text.trim();if(!body||busy)return;
  setBusy(true);setNotice('Saving your message…');
  try{
   const thread=await getOrCreate();
   const {data:userMessage,error:userError}=await supabase.from('bot_messages').insert({user_id:userId,conversation_id:thread.id,sender_type:'owner',sender_name:'You',body}).select().single();
   if(userError)throw userError;
   setMessages(prev=>[...prev,userMessage]);setText('');
   if(remember){
    const {data:mem,error:memError}=await supabase.from('bot_memories').insert({user_id:userId,bot_name:currentName,content:body,status:'pending',source_message_id:userMessage.id}).select().single();
    if(memError)throw memError;
    setMemories(prev=>[mem,...prev]);setNotice('Message saved. Memory suggestion is waiting for your approval.');
   }
   const usable=memories.filter(m=>m.status==='approved'&&(m.bot_name===currentName||m.bot_name===TEAM));
   const response=toneReply(currentName,body,tasks,usable,recipient);
   const {data:botMessage,error:botError}=await supabase.from('bot_messages').insert({user_id:userId,conversation_id:thread.id,sender_type:'bot',sender_name:currentName===TEAM?'Team Coordinator':currentName,body:response}).select().single();
   if(botError)throw botError;
   setMessages(prev=>[...prev,botMessage]);
   await supabase.from('bot_conversations').update({updated_at:new Date().toISOString()}).eq('id',thread.id).eq('user_id',userId);
   setConversations(prev=>prev.map(c=>c.id===thread.id?{...c,updated_at:new Date().toISOString()}:c));
   setRemember(false);setNotice('Message saved. Starter response generated locally; no external AI provider was contacted.');
  }catch(err){setNotice('Message was not fully saved: '+(err.message||'Please try again.'))}
  finally{setBusy(false)}
 };
 const approve=async memory=>{
  const {data,error}=await supabase.from('bot_memories').update({status:'approved',approved_at:new Date().toISOString()}).eq('id',memory.id).eq('user_id',userId).eq('status','pending').select().single();
  if(error){setNotice('Memory was not approved: '+error.message);return}
  setMemories(prev=>prev.map(m=>m.id===data.id?data:m));setNotice('Memory approved. It is now available to '+data.bot_name+'.');
 };
 const reject=async memory=>{
  const {data,error}=await supabase.from('bot_memories').update({status:'rejected'}).eq('id',memory.id).eq('user_id',userId).in('status',['pending','approved']).select().single();
  if(error){setNotice('Memory was not changed: '+error.message);return}
  setMemories(prev=>prev.map(m=>m.id===data.id?data:m));setNotice('Memory suggestion dismissed or revoked.');
 };
 const suggest=async()=>{
  const value=candidate.trim();if(!value)return;
  const {data,error}=await supabase.from('bot_memories').insert({user_id:userId,bot_name:currentName,content:value,status:'pending'}).select().single();
  if(error){setNotice('Could not save memory suggestion: '+error.message);return}
  setMemories(prev=>[data,...prev]);setCandidate('');setNotice('Memory suggestion saved for your approval.');
 };

 return <section className="bot-chat-panel">
  <div className="bot-chat-tabs">
   <button className={tab==='chat'?'active':''} onClick={()=>setTab('chat')}>💬 {activeBot} Chat</button>
   <button className={tab==='team'?'active':''} onClick={()=>setTab('team')}>🤝 Team Inbox</button>
   <button className={tab==='memory'?'active':''} onClick={()=>setTab('memory')}>🧠 Approved Memory ({approved.length})</button>
  </div>
  {tab==='team'&&<div className="bot-chat-teambar"><strong>Team Inbox</strong><span>Shared owner-visible thread for team requests and handoff planning</span><label>Address this message to<select value={recipient} onChange={e=>setRecipient(e.target.value)}><option>Whole team</option>{bots.map(b=><option key={b.name}>{b.name}</option>)}</select></label></div>}
  {tab==='memory'?<div className="bot-memory-view">
   <h3>Owner-controlled memory</h3><p>Only approved notes are available as context to this bot. New suggestions never become permanent automatically.</p>
   <label className="bot-memory-add">Suggest a memory for {currentName}<textarea rows="3" value={candidate} onChange={e=>setCandidate(e.target.value)} placeholder="Example: Keep reports concise and include a clear next action."/></label><button className="gold" disabled={!candidate.trim()} onClick={suggest}>Submit for owner approval</button>
   <h4>Pending approval ({pending.length})</h4>
   {pending.map(m=><article className="bot-memory-item" key={m.id}><div><strong>{m.bot_name}</strong><p>{m.content}</p><small>Suggested {new Date(m.created_at).toLocaleString()}</small></div><div><button className="gold" onClick={()=>approve(m)}>Approve</button><button onClick={()=>reject(m)}>Dismiss</button></div></article>)}
   <h4>Approved memories ({memories.filter(m=>m.status==='approved').length})</h4>
   {memories.filter(m=>m.status==='approved').map(m=><article className="bot-memory-item" key={m.id}><div><strong>{m.bot_name}</strong><p>{m.content}</p><small>Approved {m.approved_at?new Date(m.approved_at).toLocaleString():'by owner'}</small></div><button onClick={()=>reject(m)}>Revoke</button></article>)}
   {!memories.length&&<p className="muted">No memory notes yet. You decide what gets saved.</p>}
  </div>:<div className="bot-chat-thread">
   <div className="bot-chat-security">🔒 Private to your signed-in account · No third-party AI provider connected · Owner approval required for saved memory and consequential actions.</div>
   {messages.map(m=><article className={'bot-chat-message '+(m.sender_type==='owner'?'owner':'bot')} key={m.id}><strong>{m.sender_name}</strong><p>{m.body}</p><small>{new Date(m.created_at).toLocaleString()}</small>{m.sender_type==='owner'&&<button onClick={()=>{setCandidate(m.body);setTab('memory')}}>Suggest as memory</button>}</article>)}
   {!messages.length&&<div className="bot-chat-empty"><span>💬</span><strong>Start a conversation with {currentName===TEAM?'the team':currentName}</strong><p>Ask a question, request help planning a task, or share feedback.</p></div>}
   <form onSubmit={send} className="bot-chat-compose"><label className="bot-chat-remember"><input type="checkbox" checked={remember} onChange={e=>setRemember(e.target.checked)}/> Also submit this message as a memory suggestion for owner approval</label><textarea rows="3" value={text} onChange={e=>setText(e.target.value)} placeholder={'Message '+(currentName===TEAM?'the team':currentName)+'…'}/><div><small>Messages are saved to your private workspace. Responses are rule-based until an AI provider is deliberately configured.</small><button className="gold" disabled={!text.trim()||busy}>{busy?'Sending…':'Send message'}</button></div></form>
  </div>}
  <p className="bot-chat-status" role="status">{notice}</p>
 </section>;
}
