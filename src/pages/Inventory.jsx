import { sx } from '../lib/sx.js';

export default function Inventory({ vm }) {
  return (
    <div style={sx('max-width:1280px;margin:0 auto;padding:26px 24px 40px;animation:ewfade .35s ease both')}>
      <div style={sx('display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding-bottom:16px')}>
        <h2 style={sx('font-size:22px;letter-spacing:-0.02em;margin:0')}>The lot</h2>
        <span style={sx('font-size:12px;color:var(--color-neutral-500);font-variant-numeric:tabular-nums')}>{vm.rowCount} units</span>
        <div style={sx('display:flex;gap:2px;margin-left:6px')}>
          {vm.catOpts.map((c, i) => (
            <label key={i} className="seg-opt" style={sx('border:none;border-radius:999px;padding:6px 13px;font-size:12.5px')}>
              <input type="radio" name="cat" checked={c.on} onChange={c.pick} readOnly />{c.label}
            </label>
          ))}
        </div>
        <div style={sx('position:relative;margin-left:auto;width:250px')}>
          <i className="ph ph-magnifying-glass" style={sx('position:absolute;left:10px;top:50%;transform:translateY(-50%);font-size:14px;color:var(--color-neutral-500)')}></i>
          <input className="input" style={sx('padding-left:32px;background:color-mix(in srgb, var(--color-text) 5%, transparent)')} placeholder="Stock #, make, model…" value={vm.query} onChange={vm.onQuery} />
        </div>
        <button className="btn btn-secondary" onClick={vm.importClick}><i className="ph ph-upload-simple"></i>Import</button>
        <button className="btn btn-secondary" onClick={vm.exportCsv}><i className="ph ph-download-simple"></i>Export</button>
        <input type="file" accept=".csv,text/csv" style={{ display: 'none' }} ref={vm.fileRef} onChange={vm.onImportFile} />
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;overflow-x:auto')}>
        <table className="table" style={sx('min-width:980px')}>
          <thead>
            <tr>
              <th style={sx('width:34px;padding-left:16px')}></th><th>Stock #</th><th>Unit</th>
              <th style={sx('text-align:right')}>Hours</th><th style={sx('text-align:right')}>Days</th>
              <th style={sx('text-align:right')}>Cost</th><th style={sx('text-align:right')}>Ask</th>
              <th style={sx('text-align:right')}>Comp avg</th><th style={sx('text-align:right')}>Quick move</th>
              <th style={sx('text-align:right')}>Max profit</th><th style={sx('padding-right:16px')}>Signal</th>
            </tr>
          </thead>
          <tbody>
            {vm.rows.map((r, i) => (
              <tr key={i} onClick={r.open} style={sx('cursor:pointer')}>
                <td style={sx('width:34px;padding-left:16px')}>
                  <button onClick={r.star} title="Watch this unit" style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, display: 'grid', placeItems: 'center', color: r.starColor }}>
                    <i className={r.starIcon} style={sx('font-size:14px')}></i>
                  </button>
                </td>
                <td style={sx('color:var(--color-neutral-500);font-size:12.5px')}>{r.stock}</td>
                <td style={sx('font-size:13.5px')}>{r.title}</td>
                <td style={sx('text-align:right;font-variant-numeric:tabular-nums;color:var(--color-neutral-400)')}>{r.hours}</td>
                <td style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: r.daysColor }}>{r.days}</td>
                <td style={sx('text-align:right;font-variant-numeric:tabular-nums;color:var(--color-neutral-500)')}>{r.cost}</td>
                <td style={sx('text-align:right;font-variant-numeric:tabular-nums')}>{r.ask}</td>
                <td style={sx('text-align:right;font-variant-numeric:tabular-nums;color:var(--color-neutral-400)')}>{r.comp}</td>
                <td style={sx('text-align:right;font-variant-numeric:tabular-nums;color:var(--color-accent-2-300)')}>{r.quick}</td>
                <td style={sx('text-align:right;font-variant-numeric:tabular-nums;color:var(--color-accent-300)')}>{r.max}</td>
                <td style={sx('padding-right:16px')}><span className={'tag ' + r.tagClass}>{r.signal}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
