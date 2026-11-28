import { useEffect, useMemo, useState } from 'react';
import './social-media-calculator.css';

const blank = () => ({
  postTitle: '', platform: 'Instagram', campaign: '', contentType: 'Post',
  date: new Date().toISOString().slice(0, 10), postUrl: '',
  likes: '0', comments: '0', shares: '0', saves: '0', clicks: '',
  reach: '', followers: '', impressions: ''
});
const numericFields = ['likes', 'comments', 'shares', 'saves', 'clicks', 'reach', 'followers', 'impressions'];
const safeNumber = value => value === '' ? 0 : Number(value);
const percent = (n, d) => d > 0 ? (n / d) * 100 : null;
const fmt = n => n === null ? '—' : n.toFixed(2) + '%';
const csvCell = value => '"' + String(value ?? '').replace(/"/g, '""') + '"';

export default function SocialMediaCalculator({ userId }) {
  const storageKey = 'ir_social_metrics_v1_' + (userId || 'local');
  const [form, setForm] = useState(blank);
  const [saved, setSaved] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem(storageKey) || '[]');
      setSaved(Array.isArray(parsed) ? parsed : []);
      setLoaded(true);
    } catch {
      setSaved([]);
      setLoaded(true);
      setNotice('Saved browser data could not be read. You can start a fresh local record.');
    }
  }, [storageKey]);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(storageKey, JSON.stringify(saved)); }
    catch { setNotice('Browser storage is unavailable or full. Export your records before leaving this page.'); }
  }, [saved, storageKey, loaded]);

  const values = useMemo(() => Object.fromEntries(numericFields.map(key => [key, safeNumber(form[key])])), [form]);
  const interactions = values.likes + values.comments + values.shares + values.saves;
  const rates = {
    reach: percent(interactions, values.reach),
    followers: percent(interactions, values.followers),
    impressions: percent(interactions, values.impressions),
    reachRatio: percent(values.reach, values.followers)
  };
  const valid = numericFields.every(key => form[key] === '' || (Number.isInteger(Number(form[key])) && Number(form[key]) >= 0));

  const update = (key, value) => setForm(current => ({ ...current, [key]: value }));
  const save = event => {
    event.preventDefault();
    if (!valid) { setNotice('Enter zero or a positive whole number for each metric.'); return; }
    const record = {
      ...form, ...values, interactions, rates, id: (globalThis.crypto?.randomUUID?.() || String(Date.now())),
      savedAt: new Date().toISOString()
    };
    setSaved(current => [record, ...current]);
    setNotice('Metrics saved in this browser for this signed-in workspace.');
  };
  const exportCsv = rows => {
    if (!rows.length) { setNotice('There are no saved metrics to export yet.'); return; }
    const headers = ['date','platform','postTitle','campaign','contentType','postUrl','likes','comments','shares','saves','clicks','interactions','reach','followers','impressions','engagementByReach','engagementByFollowers','engagementByImpressions','reachToFollowerRatio'];
    const body = rows.map(row => headers.map(key => csvCell(
      ({engagementByReach: row.rates?.reach, engagementByFollowers: row.rates?.followers,
        engagementByImpressions: row.rates?.impressions, reachToFollowerRatio: row.rates?.reachRatio})[key] ??
      (key.startsWith('engagement') || key === 'reachToFollowerRatio' ? '' : row[key])
    )).join(','));
    const blob = new Blob([[headers.join(','), ...body].join('\n')], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url; link.download = 'integrity-rising-social-metrics.csv'; link.click();
    URL.revokeObjectURL(url);
  };
  const remove = id => setSaved(current => current.filter(row => row.id !== id));
  const clear = () => {
    if (window.confirm('Clear all saved social metrics from this browser for this workspace? Export first if you need a copy.')) {
      setSaved([]); setNotice('Browser-local metrics cleared.');
    }
  };

  return <main className="smc-wrap">
    <section className="smc-heading">
      <div><span className="smc-eyebrow">SOCIAL MEDIA INTELLIGENCE CENTER</span>
        <h2>Engagement Calculator</h2>
        <p>Measure post performance using metrics you enter from each platform.</p></div>
      <span className="smc-local-pill">🔒 Browser-local</span>
    </section>
    <div className="smc-privacy"><strong>Privacy note</strong> Your saved metrics stay in this browser profile and are not sent to our database. Browser storage is not encrypted; avoid entering passwords, private messages, or sensitive personal information. Use Export CSV to keep a backup.</div>
    <form className="smc-panel" onSubmit={save}>
      <h3>Post details</h3>
      <div className="smc-grid">
        <label>Post or campaign name<input value={form.postTitle} onChange={e=>update('postTitle',e.target.value)} placeholder="Example: 7-Day Integrity Reset" required /></label>
        <label>Platform<select value={form.platform} onChange={e=>update('platform',e.target.value)}>{['Instagram','Facebook','LinkedIn','TikTok','YouTube','X','Pinterest','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Campaign<input value={form.campaign} onChange={e=>update('campaign',e.target.value)} placeholder="Campaign name (optional)" /></label>
        <label>Content type<select value={form.contentType} onChange={e=>update('contentType',e.target.value)}>{['Post','Reel / Short','Story','Video','Article','Carousel','Live','Other'].map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Post date<input type="date" value={form.date} onChange={e=>update('date',e.target.value)} required /></label>
        <label>Post URL (optional)<input type="url" value={form.postUrl} onChange={e=>update('postUrl',e.target.value)} placeholder="https://" /></label>
      </div>
      <h3>Post metrics</h3>
      <p className="smc-hint">Use whole-number counts. Leave unavailable optional metrics blank.</p>
      <div className="smc-grid smc-metrics">
        {numericFields.map(key=><label key={key}>{({likes:'Likes',comments:'Comments',shares:'Shares',saves:'Saves',clicks:'Clicks (separate)',reach:'Reach',followers:'Followers',impressions:'Impressions'})[key]}
          <input type="number" min="0" step="1" inputMode="numeric" value={form[key]} onChange={e=>update(key,e.target.value)} placeholder={key==='clicks'?'Optional':'0'} /></label>)}
      </div>
      {!valid&&<p className="smc-error" role="alert">Metrics must be zero or a positive number.</p>}
      <div className="smc-actions"><button className="smc-primary" type="submit" disabled={!valid}>Save metrics</button><button type="button" className="smc-secondary" onClick={()=>{setForm(blank());setNotice('Form cleared.');}}>Clear form</button></div>
    </form>
    <section className="smc-panel">
      <div className="smc-panel-head"><div><h3>Current calculation</h3><p className="smc-hint">Clicks are shown separately and are not included in total interactions.</p></div></div>
      <div className="smc-kpis">
        <div><small>Total interactions</small><strong>{interactions.toLocaleString()}</strong></div>
        <div><small>Engagement by reach</small><strong>{fmt(rates.reach)}</strong></div>
        <div><small>Engagement by followers</small><strong>{fmt(rates.followers)}</strong></div>
        <div><small>Engagement by impressions</small><strong>{fmt(rates.impressions)}</strong></div>
        <div><small>Reach / followers</small><strong>{fmt(rates.reachRatio)}</strong></div>
      </div>
      <div className="smc-formulas"><strong>Transparent formulas</strong>
        <p>Total interactions = likes + comments + shares + saves</p>
        <p>Engagement rate = total interactions ÷ selected denominator × 100</p>
        <p>Reach-to-follower ratio = reach ÷ followers × 100</p>
        <small>“—” means the denominator is zero or was not provided. Platform definitions can differ; compare like-for-like metrics.</small>
      </div>
    </section>
    <section className="smc-panel">
      <div className="smc-panel-head"><div><h3>Saved post metrics</h3><p className="smc-hint">{saved.length} saved record{saved.length===1?'':'s'} on this browser</p></div>
        <div className="smc-actions"><button className="smc-secondary" type="button" onClick={()=>exportCsv(saved)} disabled={!saved.length}>Export CSV</button><button className="smc-danger" type="button" onClick={clear} disabled={!saved.length}>Clear saved</button></div>
      </div>
      {saved.length===0?<p className="smc-empty">Your saved metrics will appear here after you save a calculation.</p>:
        <div className="smc-table-scroll"><table className="smc-table"><thead><tr><th>Date / post</th><th>Platform</th><th>Interactions</th><th>By reach</th><th>By followers</th><th>By impressions</th><th></th></tr></thead><tbody>
          {saved.map(row=><tr key={row.id}><td><strong>{row.postTitle}</strong><small>{row.date}{row.campaign?' · '+row.campaign:''}</small></td><td>{row.platform}</td><td>{Number(row.interactions||0).toLocaleString()}</td><td>{fmt(row.rates?.reach??null)}</td><td>{fmt(row.rates?.followers??null)}</td><td>{fmt(row.rates?.impressions??null)}</td><td><button className="smc-remove" type="button" onClick={()=>remove(row.id)} aria-label={'Remove '+row.postTitle}>Remove</button></td></tr>)}
        </tbody></table></div>}
    </section>
    {notice&&<p className="smc-notice" role="status">{notice}</p>}
  </main>;
}
