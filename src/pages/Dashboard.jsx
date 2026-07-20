import { sx } from '../lib/sx.js';

export default function Dashboard({ vm }) {
  return (
    <div style={sx('max-width:1280px;margin:0 auto;padding:26px 24px 40px;animation:ewfade .35s ease both')}>
      <div style={sx('display:flex;align-items:flex-end;justify-content:space-between;gap:16px;flex-wrap:wrap;padding-bottom:20px')}>
        <div>
          <div style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#E0A458;margin-bottom:6px')}>{vm.greetDate}</div>
          <h2 style={sx('font-size:clamp(22px,2.4vw,30px);letter-spacing:-0.02em;margin:0')}>{vm.greet}</h2>
          <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:5px 0 0')}>{vm.greetSub}</p>
        </div>
        <div style={sx('display:flex;gap:8px;flex:none')}>
          <button className="btn btn-secondary" onClick={vm.goChat}><i className="ph ph-sparkle"></i>Ask Worth AI</button>
          <button className="btn btn-primary" onClick={vm.goInv}><i className="ph ph-rows"></i>Work the lot</button>
        </div>
      </div>
      <div style={sx('display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:20px;padding:18px 0 26px;border-top:1px solid var(--color-divider);border-bottom:1px solid var(--color-divider)')}>
        {vm.kpis.map((k, i) => (
          <div key={i} style={sx(k.cardStyle)}>
            <div style={sx('font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-500);margin-bottom:5px')}>{k.label}</div>
            <div style={sx('display:flex;align-items:flex-end;gap:10px;flex-wrap:wrap')}>
              <span style={sx('font-size:27px;line-height:1;font-variant-numeric:tabular-nums')}>{k.value}</span>
              <svg width="58" height="20" viewBox="0 0 58 20" style={{ flex: 'none', opacity: 0.8, marginBottom: 2 }}>
                <polyline points={k.spark} fill="none" stroke={k.sparkColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></polyline>
              </svg>
            </div>
            <div style={{ fontSize: 11, color: k.subColor, marginTop: 4 }}>{k.sub}</div>
          </div>
        ))}
      </div>
      <div style={sx('display:grid;grid-template-columns:minmax(0,1.55fr) minmax(300px,1fr);gap:20px;align-items:start;padding-top:24px')}>
        <div style={sx('display:flex;flex-direction:column;gap:20px;min-width:0')}>
          <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px')}>
            <div style={sx('display:flex;align-items:baseline;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-divider)')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Worklist</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>asks that drifted from the comp band</span>
            </div>
            {vm.queue.map((q, i) => (
              <button key={i} onClick={q.open} style={sx('display:flex;align-items:center;gap:14px;width:100%;text-align:left;font:inherit;background:transparent;border:none;border-bottom:1px solid color-mix(in srgb, var(--color-text) 7%, transparent);padding:13px 16px;cursor:pointer;color:var(--color-text)')}>
                <i className={'ph ' + q.icon} style={{ fontSize: 17, color: q.iconColor, flex: 'none' }}></i>
                <span style={sx('flex:1;min-width:0')}>
                  <span style={sx('display:block;font-size:13.5px;line-height:1.3')}>{q.title}</span>
                  <span style={sx('display:block;font-size:12px;color:var(--color-neutral-500);line-height:1.4')}>{q.detail}</span>
                </span>
                <span style={sx('text-align:right;flex:none')}>
                  <span style={sx('display:block;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600)')}>suggest</span>
                  <span style={sx('display:block;font-size:14px;font-variant-numeric:tabular-nums;color:var(--color-accent-300)')}>{q.suggest}</span>
                </span>
                <i className="ph ph-caret-right" style={sx('font-size:13px;color:var(--color-neutral-600);flex:none')}></i>
              </button>
            ))}
          </div>
          <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px')}>
            <div style={sx('display:flex;align-items:baseline;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-divider)')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Lot aging</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>vs the {vm.agingThreshold}-day line</span>
            </div>
            <div style={sx('padding:14px 16px;display:flex;flex-direction:column;gap:9px')}>
              {vm.aging.map((a, i) => (
                <div key={i} style={sx('display:grid;grid-template-columns:170px 1fr 44px;align-items:center;gap:12px')}>
                  <span style={sx('font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:var(--color-neutral-400)')}>{a.name}</span>
                  <div style={sx('height:5px;border-radius:3px;background:color-mix(in srgb, var(--color-text) 8%, transparent);overflow:hidden')}>
                    <div style={sx(a.barStyle)}></div>
                  </div>
                  <span style={{ fontSize: 12, textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: a.numColor }}>{a.days}d</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={sx('display:flex;flex-direction:column;gap:20px;min-width:0')}>
          <div style={sx('background:linear-gradient(150deg,var(--color-accent-900),var(--color-surface));border:1px solid var(--color-divider);border-top:2px solid var(--color-accent-2-400);border-radius:10px;padding:16px')}>
            <div style={sx('display:flex;align-items:center;gap:8px;margin-bottom:8px')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:#E0A458')}>Lot advisor</span>
              <span className={'tag ' + vm.advTagClass} style={sx('margin-left:auto')}>{vm.advTag}</span>
            </div>
            <div style={sx('font-family:var(--font-heading);font-size:16px;line-height:1.35;margin-bottom:6px')}>{vm.advHeadline}</div>
            <p style={sx('font-size:12px;line-height:1.6;color:var(--color-neutral-400);margin:0 0 10px')}>{vm.advBody}</p>
            {vm.advTop.map((at, i) => (
              <button key={i} onClick={at.open} style={sx('display:flex;align-items:center;gap:10px;width:100%;font:inherit;text-align:left;background:transparent;border:none;border-top:1px solid color-mix(in srgb, var(--color-text) 7%, transparent);padding:9px 2px;cursor:pointer;color:var(--color-text)')}>
                <span style={sx('font-size:12.5px;flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis')}>{at.name}</span>
                <span style={{ fontSize: 11.5, fontVariantNumeric: 'tabular-nums', color: at.color, flex: 'none' }}>{at.note}</span>
              </button>
            ))}
          </div>
          <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px')}>
            <div style={sx('display:flex;align-items:baseline;gap:10px;padding:12px 16px;border-bottom:1px solid var(--color-divider)')}>
              <span style={sx('font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-400)')}>Market</span>
              <span style={sx('font-size:11px;color:var(--color-neutral-600)')}>used 150–400 HP index</span>
            </div>
            <div style={sx('padding:14px 16px 10px')}>
              <svg viewBox="0 0 320 110" style={{ width: '100%', display: 'block' }}>
                <line x1="0" y1="55" x2="320" y2="55" stroke="var(--color-divider)" strokeWidth="1"></line>
                <polyline points={vm.pulseNational} fill="none" stroke="var(--color-sky)" strokeWidth="1.5" strokeDasharray="4 4"></polyline>
                <polyline points={vm.pulseRegion} fill="none" stroke="var(--color-accent-400)" strokeWidth="2" strokeLinecap="round" style={{ strokeDasharray: 600, animation: 'ewdraw 1.4s ease both' }}></polyline>
                <circle cx={vm.pulseDotX} cy={vm.pulseDotY} r="3.5" fill="var(--color-accent-300)"></circle>
              </svg>
              <div style={sx('display:flex;gap:14px;font-size:11px;color:var(--color-neutral-500);padding:6px 0 4px')}>
                <span style={sx('display:inline-flex;align-items:center;gap:5px')}><span style={sx('width:12px;height:2px;background:var(--color-accent-400)')}></span>Region −6.2%</span>
                <span style={sx('display:inline-flex;align-items:center;gap:5px')}><span style={sx('width:12px;height:2px;background:var(--color-sky)')}></span>National −3.5%</span>
              </div>
            </div>
            <div style={sx('border-top:1px solid var(--color-divider)')}>
              {vm.feed.map((f, i) => (
                <div key={i} style={sx('display:flex;flex-direction:column;gap:2px;padding:10px 16px;border-bottom:1px solid color-mix(in srgb, var(--color-text) 7%, transparent)')}>
                  <div style={sx('display:flex;align-items:baseline;gap:8px')}>
                    <span style={sx('font-size:12.5px;flex:1;min-width:0')}>{f.unit}</span>
                    <span style={sx('font-size:12.5px;font-variant-numeric:tabular-nums')}>{f.price}</span>
                  </div>
                  <div style={sx('display:flex;align-items:baseline;gap:8px;font-size:11px;color:var(--color-neutral-600)')}>
                    <span>{f.src} · {f.when}</span>
                    <span style={{ marginLeft: 'auto', fontVariantNumeric: 'tabular-nums', color: f.deltaColor }}>{f.delta}</span>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost" onClick={vm.goChat} style={sx('font-size:12px;margin:8px 10px')}><i className="ph ph-sparkle"></i>Ask Worth AI</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
