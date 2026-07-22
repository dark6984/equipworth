import { sx } from '../lib/sx.js';
import ImageSlot from '../components/ImageSlot.jsx';

export default function UnitDetail({ vm }) {
  const { u } = vm;
  return (
    <div style={sx('max-width:1280px;margin:0 auto;padding:26px 24px 46px;animation:ewfade .35s ease both')}>
      <button onClick={vm.goInv} style={sx('display:inline-flex;align-items:center;gap:7px;font:inherit;font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-500);background:none;border:none;cursor:pointer;padding:0 0 14px')}>
        <i className="ph ph-arrow-left"></i>The lot
      </button>
      <div style={sx('display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;padding-bottom:18px')}>
        <h2 style={sx('font-size:clamp(22px,2.4vw,30px);letter-spacing:-0.02em;margin:0')}>{u.title}</h2>
        <span className={'tag ' + u.tagClass}>{u.signal}</span>
        <span style={sx('font-size:12px;color:var(--color-neutral-500)')}>{u.stock} · {u.hours} hrs · {u.days} days on lot · acquired {u.acq}</span>
      </div>
      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:12px;padding:22px;display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:26px;align-items:center')}>
        <div style={sx('min-width:0')}>
          <div style={sx('height:clamp(300px,38vw,460px);border-radius:10px;overflow:hidden;border:1px solid var(--color-divider)')}>
            <ImageSlot placeholder="Drop photos of this unit" />
          </div>
          <div style={sx('display:flex;justify-content:space-between;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600);margin-top:7px')}>
            <span>{u.stock} · lot photo</span><span>{u.hours} hrs</span>
          </div>
        </div>
        <div>
          <div style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-500);margin-bottom:6px')}>Suggested list price</div>
          <div style={sx('font-size:clamp(38px,4vw,50px);line-height:1;font-variant-numeric:tabular-nums;color:var(--color-accent-200)')}>{vm.sugPrice}</div>
          <div style={sx('font-size:12.5px;color:var(--color-neutral-500);margin:8px 0 14px')}>{vm.sugNote}</div>
          <button className="btn btn-primary" onClick={vm.applyPrice}><i className="ph ph-check"></i>Apply as list price</button>
        </div>
        <div>
          <div style={sx('display:flex;justify-content:space-between;font-size:11px;margin-bottom:8px')}>
            <span style={sx('display:flex;flex-direction:column')}>
              <span style={sx('letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Move it</span>
              <span style={sx('color:var(--color-accent-2-300);font-size:13px;font-variant-numeric:tabular-nums')}>{u.quick}</span>
            </span>
            <span style={sx('display:flex;flex-direction:column;text-align:right')}>
              <span style={sx('letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Max profit</span>
              <span style={sx('color:var(--color-accent-300);font-size:13px;font-variant-numeric:tabular-nums')}>{u.max}</span>
            </span>
          </div>
          <input type="range" className="ew-range" min="0" max="100" value={vm.sliderVal} onChange={vm.onSlider} />
          <div style={sx('display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;margin-top:16px')}>
            <div><div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Est. days</div><div style={sx('font-size:16px;font-variant-numeric:tabular-nums')}>{vm.estDays}</div></div>
            <div><div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Margin</div><div style={sx('font-size:16px;font-variant-numeric:tabular-nums')}>{vm.margin}</div></div>
            <div><div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Vs comp</div><div style={sx('font-size:16px;font-variant-numeric:tabular-nums')}>{vm.vsComp}</div></div>
          </div>
        </div>
        <div style={sx('min-width:0')}>
          <div style={sx('display:flex;justify-content:space-between;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-600);margin-bottom:4px')}>
            <span>Price position</span><span style={sx('font-variant-numeric:tabular-nums;color:var(--color-neutral-400)')}>ask {u.ask}</span>
          </div>
          <div style={sx('position:relative;height:64px;margin:10px 24px 0')}>
            <div style={sx('position:absolute;left:0;right:0;top:26px;height:3px;border-radius:2px;background:color-mix(in srgb, var(--color-text) 8%, transparent)')}></div>
            <div style={sx(u.bandStyle)}></div>
            {u.markers.map((m, i) => (
              <div key={i} style={sx(m.style)}>
                <span style={sx('font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--color-neutral-600);white-space:nowrap')}>{m.label}</span>
                <span style={{ width: 2, height: 11, background: m.color, borderRadius: 1 }}></span>
                <span style={{ fontSize: 11, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap', color: m.color }}>{m.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="ew-grid-2col" style={sx('display:grid;grid-template-columns:minmax(0,1.5fr) minmax(320px,1fr);gap:20px;align-items:start;margin-top:20px')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px;min-width:0')}>
          <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px')}>
            <div style={sx('display:flex;align-items:baseline;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-divider)')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Auction comps</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>{u.compNote}</span>
            </div>
            <div className="ew-desktop-table" style={sx('overflow-x:auto')}>
              <table className="table" style={sx('font-size:13px')}>
                <thead>
                  <tr>
                    <th style={sx('padding-left:16px')}>Source</th><th>Sold</th><th>Spec</th>
                    <th style={sx('text-align:right')}>Hours</th><th style={sx('text-align:right')}>Hammer</th>
                    <th style={sx('text-align:right;padding-right:16px')}>Adj.</th>
                  </tr>
                </thead>
                <tbody>
                  {u.comps.map((c, i) => (
                    <tr key={i}>
                      <td style={sx('padding-left:16px')}>{c.src}</td>
                      <td style={sx('color:var(--color-neutral-500)')}>{c.date}</td>
                      <td style={sx('color:var(--color-neutral-500)')}>{c.spec}</td>
                      <td style={sx('text-align:right;font-variant-numeric:tabular-nums')}>{c.hrs}</td>
                      <td style={sx('text-align:right;font-variant-numeric:tabular-nums')}>{c.price}</td>
                      <td style={sx('text-align:right;font-variant-numeric:tabular-nums;color:var(--color-accent-300);padding-right:16px')}>{c.adj}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ew-mobile-cards" style={sx('flex-direction:column;gap:0')}>
              {u.comps.map((c, i) => (
                <div key={i} style={sx('padding:12px 16px;border-top:1px solid var(--color-divider)')}>
                  <div style={sx('display:flex;align-items:baseline;justify-content:space-between;gap:10px')}>
                    <span style={sx('font-size:13px')}>{c.src}</span>
                    <span style={sx('font-size:11px;color:var(--color-neutral-500)')}>{c.date}</span>
                  </div>
                  <div style={sx('font-size:11px;color:var(--color-neutral-500);margin-top:2px')}>{c.spec} · {c.hrs} hrs</div>
                  <div style={sx('display:flex;align-items:baseline;gap:10px;margin-top:6px;font-size:13px;font-variant-numeric:tabular-nums')}>
                    <span>{c.price}</span>
                    <span style={sx('color:var(--color-neutral-600)')}>→</span>
                    <span style={sx('color:var(--color-accent-300)')}>{c.adj} adj.</span>
                  </div>
                </div>
              ))}
            </div>
            <div style={sx('font-size:11px;color:var(--color-neutral-600);padding:10px 16px;border-top:1px solid var(--color-divider)')}>
              Adj. = hammer price normalized to this unit's hours, condition and option package.
            </div>
          </div>
          <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:16px')}>
            <div style={sx('display:flex;align-items:baseline;gap:10px;flex-wrap:wrap;margin-bottom:12px')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Equipment &amp; options</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>value impact vs base-spec comps</span>
            </div>
            <div style={sx('display:flex;flex-wrap:wrap;gap:8px')}>
              {u.opts.map((op, i) => (
                <span key={i} style={sx('display:inline-flex;align-items:center;gap:8px;font-size:12px;padding:6px 11px;border-radius:999px;background:color-mix(in srgb, var(--color-text) 5%, transparent);border:1px solid var(--color-divider)')}>
                  <i className="ph ph-check" style={sx('font-size:12px;color:var(--color-accent-400)')}></i>{op.label}
                  <span style={sx('font-size:11px;color:var(--color-accent-300);font-variant-numeric:tabular-nums')}>{op.delta}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:20px;min-width:0')}>
          <div style={sx('background:linear-gradient(150deg,var(--color-accent-900),var(--color-surface));border:1px solid var(--color-divider);border-top:2px solid var(--color-accent-500);border-radius:10px;padding:16px')}>
            <div style={sx('display:flex;align-items:baseline;gap:8px;margin-bottom:10px')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-accent-300)')}>Deal desk</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>the number on the table</span>
            </div>
            <div className="field">
              <label>Negotiated price</label>
              <input className="input" value={vm.dealVal} onChange={vm.onDeal} placeholder={vm.dealPlaceholder} />
            </div>
            <div style={sx('display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;text-align:center;margin:12px 0')}>
              <div><div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Margin</div><div style={sx('font-size:15px;font-variant-numeric:tabular-nums')}>{vm.dealMargin}</div></div>
              <div><div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Your floor</div><div style={sx('font-size:15px;font-variant-numeric:tabular-nums')}>{vm.dealFloor}</div></div>
              <div><div style={sx('font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>Vs floor</div><div style={sx('font-size:15px;font-variant-numeric:tabular-nums')}>{vm.dealVsFloor}</div></div>
            </div>
            <div style={sx('display:flex;align-items:center;gap:10px')}>
              <span className={'tag ' + vm.dealTagClass} style={sx('flex:none')}>{vm.dealVerdict}</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-500);line-height:1.4')}>{vm.dealNote}</span>
            </div>
            <div style={sx('font-size:10px;color:var(--color-neutral-600);margin-top:10px')}>Floor = cost basis + $1,500 recon + $35/day carrying.</div>
          </div>
          <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:16px')}>
            <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400);display:block;margin-bottom:10px')}>Notes from the model</span>
            {u.notes.map((n, i) => (
              <div key={i} style={sx('display:flex;gap:9px;font-size:12.5px;line-height:1.55;color:var(--color-neutral-300);padding:5px 0')}>
                <span style={sx('color:var(--color-accent-2-400);flex:none')}>•</span><span>{n.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
