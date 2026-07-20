import { sx } from '../lib/sx.js';

export default function Settings({ vm }) {
  return (
    <div style={sx('max-width:760px;margin:0 auto;padding:26px 24px 46px;display:flex;flex-direction:column;gap:16px;animation:ewfade .35s ease both')}>
      <h2 style={sx('font-size:22px;letter-spacing:-0.02em;margin:0 0 2px')}>Settings</h2>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:14px')}>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Account</span>
        <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:12px')}>
          <div className="field"><label>Name</label><input className="input" value="Drew Barnett" readOnly /></div>
          <div className="field"><label>Email</label><input className="input" value="drew.barnett@legacyequip.com" readOnly /></div>
        </div>
        <div className="hr" style={{ margin: '4px 0' }}></div>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Change password</span>
        <div style={sx('display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px')}>
          <div className="field"><label>Current</label><input className="input" type="password" value={vm.cpw} onChange={vm.onCpw} /></div>
          <div className="field"><label>New (8+ chars)</label><input className="input" type="password" value={vm.npw} onChange={vm.onNpw} /></div>
          <div className="field"><label>Confirm new</label><input className="input" type="password" value={vm.npw2} onChange={vm.onNpw2} /></div>
        </div>
        <div><button className="btn btn-primary" onClick={vm.changePw}><i className="ph ph-lock-key"></i>Update password</button></div>
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:12px')}>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Appearance</span>
        <div style={sx('display:flex;align-items:center;gap:12px')}>
          <span style={sx('font-size:13px;flex:1')}>Site theme</span>
          <div className="seg">
            {vm.themeOpts.map((th, i) => (
              <label key={i} className="seg-opt">
                <input type="radio" name="theme" checked={th.on} onChange={th.pick} readOnly />
                <i className={'ph ' + th.icon} style={sx('font-size:14px')}></i>{th.label}
              </label>
            ))}
          </div>
        </div>
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:12px')}>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Pricing model</span>
        <div className="field">
          <label>Comp lookback window: {vm.lookbackLabel}</label>
          <input type="range" className="ew-range" min="30" max="180" step="15" value={vm.lookback} onChange={vm.onLookback} />
        </div>
        <div style={sx('display:flex;align-items:center;gap:12px')}>
          <span style={sx('font-size:13px;flex:1')}>Default strategy on new units</span>
          <div className="seg">
            {vm.stratOpts.map((sp2, i) => (
              <label key={i} className="seg-opt"><input type="radio" name="strat" checked={sp2.on} onChange={sp2.pick} readOnly />{sp2.label}</label>
            ))}
          </div>
        </div>
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:10px')}>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Notifications</span>
        {vm.notifRows.map((nt, i) => (
          <div key={i} style={sx('display:flex;align-items:center;gap:12px;padding:4px 0')}>
            <div style={sx('flex:1;min-width:0')}>
              <div style={sx('font-size:13px')}>{nt.label}</div>
              <div style={sx('font-size:11px;color:var(--color-neutral-500)')}>{nt.sub}</div>
            </div>
            <button onClick={nt.toggle} style={sx(nt.style)}><span style={sx(nt.dotStyle)}></span></button>
          </div>
        ))}
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:12px')}>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Data</span>
        <div style={sx('display:flex;gap:8px;flex-wrap:wrap')}>
          <button className="btn btn-secondary" onClick={vm.exportCsv}><i className="ph ph-download-simple"></i>Export inventory CSV</button>
          <button className="btn btn-ghost" onClick={vm.disconnectDms}><i className="ph ph-plugs"></i>Disconnect DMS sync</button>
        </div>
      </div>
    </div>
  );
}
