import { useEffect, useMemo, useState } from 'react';
import './social-media-analytics.css';

const metricKey = userId => 'ir_social_metrics_v1_' + (userId || 'local');
const rate = (row, key) => Number.isFinite(Number(row?.rates?.[key])) ? Number(row.rates[key]) : null;
const fmt = value => value === null ? '—' : value.toFixed(2) + '%';
const count = value => Number(value || 0).toLocaleString();
const monthLabel = key => {
  const [year, month] = key.split('-');
  return new Date(Number(year), Number(month) - 1, 1).toLocaleDateString(undefined, {month:'short', year:'2-digit'});
};

export default function SocialMediaAnalytics({ userId }) {
  const [records, setRecords] = useState([]);
  const [platform, setPlatform] = useState('All');
  const [campaign, setCampaign] = useState('All');
  const [period, setPeriod] = useState('All');
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem(metricKey(userId)) || '[]');
      setRecords(Array.isArray(data) ? data.filter(item => item && typeof item === 'object') : []);
    } catch {
      setRecords([]);
      setError('Saved browser metrics could not be read. Return to the calculator and export a backup if possible.');
    } finally { setLoaded(true); }
  }, [userId]);

  const platforms = [...new Set(records.map(row => row.platform).filter(Boolean))].sort();
  const campaigns = [...new Set(records.map(row => row.campaign).filter(Boolean))].sort();
  const filtered = useMemo(() => {
    const now = new Date();
    const cutoff = period === '30' ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 30)
      : period === '90' ? new Date(now.getFullYear(), now.getMonth(), now.getDate() - 90) : null;
    return records.filter(row => {
      const date = row.date ? new Date(row.date + 'T00:00:00') : null;
      return (platform === 'All' || row.platform === platform) &&
        (campaign === 'All' || row.campaign === campaign) &&
        (!cutoff || (date && !Number.isNaN(date.getTime()) && date >= cutoff));
    }).sort((a,b) => String(a.date || '').localeCompare(String(b.date || '')));
  }, [records, platform, campaign, period]);

  const summary = useMemo(() => {
    const interactions = filtered.reduce((sum, row) => sum + Number(row.interactions || 0), 0);
    const withReach = filtered.filter(row => Number(row.reach) > 0);
    const reachTotal = withReach.reduce((sum,row)=>sum+Number(row.reach),0);
    const weightedReachRate = reachTotal > 0
      ? withReach.reduce((sum,row)=>sum+Number(row.interactions||0),0) / reachTotal * 100 : null;
    const withImpressions = filtered.filter(row => Number(row.impressions) > 0);
    const impressionTotal = withImpressions.reduce((sum,row)=>sum+Number(row.impressions),0);
    const weightedImpressionRate = impressionTotal > 0
      ? withImpressions.reduce((sum,row)=>sum+Number(row.interactions||0),0) / impressionTotal * 100 : null;
    const top = [...filtered].sort((a,b)=>Number(b.interactions||0)-Number(a.interactions||0))[0] || null;
    const grouped = {};
    filtered.forEach(row => {
      const key = String(row.date || '').slice(0,7);
      if (!/^\d{4}-\d{2}$/.test(key)) return;
      grouped[key] = (grouped[key] || 0) + Number(row.interactions || 0);
    });
    const trend = Object.entries(grouped).sort(([a],[b])=>a.localeCompare(b)).slice(-6);
    const byPlatform = {};
    filtered.forEach(row => {
      const key = row.platform || 'Unknown';
      if (!byPlatform[key]) byPlatform[key] = {posts:0, interactions:0, reach:0};
      byPlatform[key].posts++;
      byPlatform[key].interactions += Number(row.interactions || 0);
      byPlatform[key].reach += Number(row.reach || 0);
    });
    return {interactions, weightedReachRate, weightedImpressionRate, top, trend, byPlatform};
  }, [filtered]);
  const maxTrend = Math.max(1, ...summary.trend.map(([,value])=>value));
  const platformRows = Object.entries(summary.byPlatform).sort((a,b)=>b[1].interactions-a[1].interactions);
  const hasData = filtered.length > 0;

  return <main className="sma-wrap">
    <section className="sma-heading"><div><span className="sma-eyebrow">SOCIAL MEDIA INTELLIGENCE CENTER</span><h2>Analytics Dashboard</h2><p>Compare saved post metrics and spot patterns in your recorded results.</p></div><span className="sma-local">🔒 Browser-local data</span></section>
    <div className="sma-privacy"><strong>Privacy & data source</strong> This dashboard reads only the metrics saved by the Engagement Calculator in this browser profile. It does not connect to social accounts, scrape platforms, or send records to the cloud. Results reflect entered records only—not independently verified platform analytics.</div>
    <section className="sma-panel">
      <div className="sma-filters">
        <label>Platform<select value={platform} onChange={e=>setPlatform(e.target.value)}><option>All</option>{platforms.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Campaign<select value={campaign} onChange={e=>setCampaign(e.target.value)}><option>All</option>{campaigns.map(x=><option key={x}>{x}</option>)}</select></label>
        <label>Date range<select value={period} onChange={e=>setPeriod(e.target.value)}><option value="All">All saved dates</option><option value="30">Last 30 days</option><option value="90">Last 90 days</option></select></label>
      </div>
      <p className="sma-caption">Showing {filtered.length} of {records.length} saved posts</p>
    </section>
    {!loaded ? <section className="sma-panel"><p>Loading saved metrics…</p></section> :
      error ? <section className="sma-panel sma-error" role="alert">{error}</section> :
      !hasData ? <section className="sma-panel sma-empty"><h3>No matching post metrics yet</h3><p>Save a few post records in Engagement Calculator. Your analytics will appear here automatically in this browser.</p></section> :
      <>
        <section className="sma-kpis">
          <div><small>Saved posts</small><strong>{count(filtered.length)}</strong></div>
          <div><small>Total interactions</small><strong>{count(summary.interactions)}</strong></div>
          <div><small>Weighted engagement by reach</small><strong>{fmt(summary.weightedReachRate)}</strong></div>
          <div><small>Weighted engagement by impressions</small><strong>{fmt(summary.weightedImpressionRate)}</strong></div>
        </section>
        <div className="sma-grid">
          <section className="sma-panel"><h3>Monthly interactions</h3><p className="sma-caption">Sum of recorded likes, comments, shares, and saves by post date.</p>
            {summary.trend.length ? <div className="sma-chart">{summary.trend.map(([key,value])=><div className="sma-bar-row" key={key}><span>{monthLabel(key)}</span><div className="sma-track"><i style={{width:(value/maxTrend*100)+'%'}}/></div><b>{count(value)}</b></div>)}</div> : <p className="sma-caption">No valid post dates in this selection.</p>}
          </section>
          <section className="sma-panel"><h3>Top post by interactions</h3>{summary.top&&<div className="sma-top-post"><span className="sma-platform-tag">{summary.top.platform || 'Platform not set'}</span><strong>{summary.top.postTitle || 'Untitled post'}</strong><small>{summary.top.date || 'Date not set'}{summary.top.campaign?' · '+summary.top.campaign:''}</small><b>{count(summary.top.interactions)} interactions</b><p>Engagement by reach: {fmt(rate(summary.top,'reach'))}</p></div>}</section>
        </div>
        <section className="sma-panel"><h3>Platform comparison</h3><p className="sma-caption">Sorted by total recorded interactions. Counts are not normalized for audience size.</p>
          <div className="sma-table-scroll"><table className="sma-table"><thead><tr><th>Platform</th><th>Posts</th><th>Interactions</th><th>Recorded reach</th><th>Weighted rate by reach</th></tr></thead><tbody>{platformRows.map(([name,data])=><tr key={name}><td><strong>{name}</strong></td><td>{count(data.posts)}</td><td>{count(data.interactions)}</td><td>{count(data.reach)}</td><td>{fmt(data.reach>0?data.interactions/data.reach*100:null)}</td></tr>)}</tbody></table></div>
        </section>
      </>}
  </main>;
}
