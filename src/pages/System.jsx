import { sx } from '../lib/sx.js';

export default function System({ vm }) {
  return (
    <div style={sx('max-width:1080px;margin:0 auto;padding:26px 24px 46px;animation:ewfade .35s ease both')}>
      <h2 style={sx('font-size:22px;letter-spacing:-0.02em;margin:0 0 18px')}>System status</h2>
      <div className="ew-stat-grid" style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:20px;padding:18px 0;border-top:1px solid var(--color-divider);border-bottom:1px solid var(--color-divider);margin-bottom:22px')}>
        {vm.sysStats.map((ss, i) => (
          <div key={i} style={sx('min-width:0;padding-left:14px;border-left:2px solid var(--color-divider)')}>
            <div style={sx('font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-500);margin-bottom:5px')}>{ss.label}</div>
            <div style={sx('font-size:24px;line-height:1;font-variant-numeric:tabular-nums')}>{ss.value}</div>
            <div style={{ fontSize: 11, color: ss.subColor, marginTop: 4 }}>{ss.sub}</div>
          </div>
        ))}
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;margin-bottom:20px')}>
        <div style={sx('display:flex;align-items:baseline;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-divider)')}>
          <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Collectors</span>
          <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>one scraper per marketplace · full pass 02:00, deltas hourly</span>
        </div>
        <div style={sx('padding:4px 16px 8px')}>
          {vm.sysSources.map((sc, i) => (
            <div key={i} style={sx('display:flex;flex-wrap:wrap;align-items:center;gap:8px 14px;padding:13px 0;border-bottom:1px solid color-mix(in srgb, var(--color-text) 7%, transparent)')}>
              <span style={sx('display:flex;align-items:center;gap:9px;font-size:13px;font-weight:500;min-width:150px')}>
                <span style={sx(sc.dotStyle)}></span>{sc.name}
              </span>
              <span className={'tag ' + sc.tagClass}>{sc.status}</span>
              <span style={sx('font-size:12px;color:var(--color-neutral-500)')}>pulled {sc.last}</span>
              <span style={sx('font-size:12px;font-variant-numeric:tabular-nums')}>{sc.recs}<span style={sx('color:var(--color-neutral-600)')}> /7d</span></span>
              {sc.broken && (
                <button className="btn btn-secondary" onClick={sc.fix} style={sx('font-size:12px;flex:none;margin-left:auto')}>
                  <i className="ph ph-wrench"></i>{sc.fixLabel}
                </button>
              )}
              <span style={sx('flex-basis:100%;font-size:12px;color:var(--color-neutral-500);line-height:1.4;padding-left:17px')}>{sc.note}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,320px),1fr));gap:20px;align-items:start')}>
        <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:16px')}>
          <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400);display:block;margin-bottom:10px')}>Incident log</span>
          {vm.sysLog.map((lg, i) => (
            <div key={i} style={sx('display:flex;gap:10px;font-size:12px;line-height:1.5;padding:4px 0')}>
              <span style={{ color: 'var(--color-neutral-600)', flex: 'none', fontVariantNumeric: 'tabular-nums', width: 52 }}>{lg.when}</span>
              <span style={{ color: lg.color, flex: 'none' }}>●</span>
              <span style={sx('color:var(--color-neutral-300)')}>{lg.text}</span>
            </div>
          ))}
        </div>
        <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:16px')}>
          <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400);display:block;margin-bottom:10px')}>Database</span>
          {vm.sysDb.map((db, i) => (
            <div key={i} style={sx('display:flex;justify-content:space-between;gap:12px;font-size:12px;padding:4px 0')}>
              <span style={sx('color:var(--color-neutral-500)')}>{db.k}</span>
              <span style={sx('font-variant-numeric:tabular-nums')}>{db.v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
