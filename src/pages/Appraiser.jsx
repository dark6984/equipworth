import { sx } from '../lib/sx.js';

export default function Appraiser({ vm }) {
  return (
    <div style={sx('max-width:1020px;margin:0 auto;padding:26px 24px 46px;animation:ewfade .35s ease both')}>
      <h2 style={sx('font-size:22px;letter-spacing:-0.02em;margin:0 0 4px')}>Trade appraiser</h2>
      <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0 0 20px;max-width:60ch')}>
        Farmer at the counter with a trade? An auction-backed number in ten seconds. Same comp engine, live.
      </p>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:12px;display:grid;grid-template-columns:minmax(280px,1fr) minmax(320px,1.15fr);gap:0;align-items:stretch;overflow:hidden')}>
        <div style={sx('padding:22px;display:flex;flex-direction:column;gap:16px;border-right:1px solid var(--color-divider)')}>
          <div className="field">
            <label>Make</label>
            <select className="input" value={vm.apprMake} onChange={vm.onApprMake}>
              {vm.apprMakes.map((mk, i) => <option key={i} value={mk}>{mk}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Model</label>
            <select className="input" value={vm.apprModel} onChange={vm.onApprModel}>
              {vm.apprModels.map((md, i) => <option key={i} value={md}>{md}</option>)}
            </select>
          </div>
          <div className="field">
            <label>Engine hours: {vm.apprHoursLabel}</label>
            <input type="range" className="ew-range" min="100" max="6000" step="50" value={vm.apprHours} onChange={vm.onApprHours} />
          </div>
          <div className="field">
            <label>Condition</label>
            <div className="seg">
              {vm.condOpts.map((co, i) => (
                <label key={i} className="seg-opt"><input type="radio" name="cond" checked={co.on} onChange={co.pick} readOnly />{co.label}</label>
              ))}
            </div>
          </div>
        </div>
        <div style={sx('padding:22px;display:flex;flex-direction:column;gap:14px;background:linear-gradient(160deg,var(--color-accent-900),var(--color-surface))')}>
          <div style={sx('display:flex;align-items:center;gap:10px')}>
            <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Appraised value</span>
            <span className={'tag ' + vm.apprConfClass} style={sx('margin-left:auto')}>{vm.apprConf}</span>
          </div>
          <div>
            <div style={sx('font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-600);margin-bottom:4px')}>Trade allowance range</div>
            <div style={sx('font-size:clamp(26px,3vw,34px);line-height:1.15;font-variant-numeric:tabular-nums;color:var(--color-accent-200)')}>{vm.apprTrade}</div>
          </div>
          <div style={sx('display:grid;grid-template-columns:1fr 1fr;gap:10px')}>
            <div style={sx('background:color-mix(in srgb, var(--color-text) 5%, transparent);border:1px solid var(--color-divider);border-radius:8px;padding:10px 12px')}>
              <div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>At auction</div>
              <div style={sx('font-size:14px;font-variant-numeric:tabular-nums;color:var(--color-accent-2-300)')}>{vm.apprAuction}</div>
            </div>
            <div style={sx('background:color-mix(in srgb, var(--color-text) 5%, transparent);border:1px solid var(--color-divider);border-radius:8px;padding:10px 12px')}>
              <div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Retail after recon</div>
              <div style={sx('font-size:14px;font-variant-numeric:tabular-nums;color:var(--color-accent-300)')}>{vm.apprRetail}</div>
            </div>
          </div>
          <div style={sx('font-size:11px;color:var(--color-neutral-500)')}>{vm.apprBasis}</div>
          <button className="btn btn-primary btn-block" onClick={vm.apprDraft} style={sx('margin-top:auto')}>
            <i className="ph ph-plus-circle"></i>Create inventory draft at this number
          </button>
        </div>
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:16px;margin-top:16px')}>
        <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400);display:block;margin-bottom:8px')}>Watch out for</span>
        {vm.apprFlags.map((fl, i) => (
          <div key={i} style={sx('display:flex;gap:9px;font-size:12.5px;line-height:1.5;color:var(--color-neutral-300);padding:4px 0')}>
            <span style={sx('color:var(--color-accent-2-400);flex:none')}>•</span><span>{fl.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
