import { sx } from '../lib/sx.js';

export default function Team({ vm }) {
  return (
    <>
      <div style={sx('max-width:1080px;margin:0 auto;padding:26px 24px 46px;animation:ewfade .35s ease both')}>
        <div style={sx('display:flex;align-items:center;gap:14px;flex-wrap:wrap;padding-bottom:16px')}>
          <h2 style={sx('font-size:22px;letter-spacing:-0.02em;margin:0')}>Team &amp; stores</h2>
          <span style={sx('font-size:12px;color:var(--color-neutral-500);font-variant-numeric:tabular-nums')}>{vm.teamCount} people</span>
          <div style={sx('display:flex;gap:2px')}>
            {vm.storeOpts.map((so, i) => (
              <label key={i} className="seg-opt" style={sx('border:none;border-radius:999px;padding:6px 13px;font-size:12.5px')}>
                <input type="radio" name="store" checked={so.on} onChange={so.pick} readOnly />{so.label}
              </label>
            ))}
          </div>
          <button className="btn btn-primary" style={sx('margin-left:auto')} onClick={vm.openAdd}><i className="ph ph-user-plus"></i>Add teammate</button>
        </div>
        <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;overflow-x:auto')}>
          <table className="table">
            <thead>
              <tr><th style={sx('padding-left:16px')}>Name</th><th>Role</th><th>Store</th><th>Access</th><th>Joined</th><th style={sx('padding-right:16px')}></th></tr>
            </thead>
            <tbody>
              {vm.teamRows.map((p, i) => (
                <tr key={i}>
                  <td style={sx('padding-left:16px')}>
                    <div style={sx('display:flex;align-items:center;gap:10px')}>
                      <div style={sx('width:29px;height:29px;flex:none;border-radius:50%;background:var(--color-accent-800);color:var(--color-accent-200);display:grid;place-items:center;font-size:10px;font-weight:600')}>{p.initials}</div>
                      <div>
                        <div style={sx('font-size:13px;line-height:1.2')}>{p.name}</div>
                        <div style={sx('font-size:11px;color:var(--color-neutral-500)')}>{p.email}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className={'tag ' + p.roleClass}>{p.role}</span></td>
                  <td style={sx('font-size:13px')}>{p.store}</td>
                  <td style={sx('font-size:12px;color:var(--color-neutral-500)')}>{p.access}</td>
                  <td style={sx('font-size:12px;color:var(--color-neutral-500)')}>{p.joined}</td>
                  <td style={sx('text-align:right;padding-right:16px')}>
                    {p.removable && (
                      <button className="btn btn-ghost btn-icon" onClick={p.remove} title="Remove from store">
                        <i className="ph ph-trash" style={sx('font-size:15px')}></i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={sx('font-size:12px;color:var(--color-neutral-600);margin-top:12px')}>Only owners and store managers can add or remove people. Pricing controls follow the role.</div>
      </div>
      {vm.addOpen && (
        <div className="dialog-backdrop" style={{ zIndex: 40 }}>
          <div className="dialog">
            <div className="dialog-title">Add a teammate</div>
            <div className="field"><label>Full name</label><input className="input" placeholder="e.g. Casey Brandt" value={vm.nName} onChange={vm.onNName} /></div>
            <div className="field">
              <label>Role</label>
              <select className="input" value={vm.nRole} onChange={vm.onNRole}>
                {vm.roleList.map((rl, i) => <option key={i} value={rl}>{rl}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Store</label>
              <select className="input" value={vm.nStore} onChange={vm.onNStore}>
                {vm.storeList.map((sl, i) => <option key={i} value={sl}>{sl}</option>)}
              </select>
            </div>
            <div className="dialog-actions">
              <button className="btn btn-secondary" onClick={vm.closeAdd}>Cancel</button>
              <button className="btn btn-primary" onClick={vm.addPerson}><i className="ph ph-user-plus"></i>Add to store</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
