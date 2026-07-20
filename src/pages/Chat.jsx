import { Fragment } from 'react';
import { sx } from '../lib/sx.js';

export default function Chat({ vm }) {
  return (
    <div style={sx('height:100%;display:flex;animation:ewfade .35s ease both')}>
      <div style={sx('width:240px;flex:none;border-right:1px solid var(--color-divider);padding:16px 10px;display:flex;flex-direction:column;gap:6px;overflow-y:auto')}>
        <button className="btn btn-primary btn-block" style={sx('margin-top:0;margin-bottom:6px')} onClick={vm.newChat}>
          <i className="ph ph-plus"></i>New chat
        </button>
        {vm.chatGroups.map((g, gi) => (
          <Fragment key={gi}>
            <span style={sx('font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:var(--color-neutral-600);padding:8px 6px 2px')}>{g.name}</span>
            {g.items.map((ch, ci) => (
              <div key={ci} style={{ position: 'relative' }}>
                {ch.renaming && (
                  <input
                    className="input"
                    style={sx('min-height:30px;font-size:12px;padding:4px 8px')}
                    value={vm.renameVal}
                    onChange={vm.onRenameChange}
                    onKeyDown={vm.onRenameKey}
                    onBlur={vm.commitRename}
                    autoFocus
                  />
                )}
                {ch.notRenaming && (
                  <>
                    <button onClick={ch.pick} style={sx(ch.style)}>
                      <span style={sx('font-size:12px;line-height:1.3;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;padding-right:18px')}>{ch.title}</span>
                      <span style={sx('font-size:10px;color:var(--color-neutral-600);display:flex;align-items:center;gap:5px')}>
                        {ch.when}
                        {ch.scheduled && (
                          <span style={sx('display:inline-flex;align-items:center;gap:3px;color:var(--color-sky-ink)')}>
                            <i className="ph ph-clock" style={sx('font-size:10px')}></i>{ch.schedLabel}
                          </span>
                        )}
                      </span>
                    </button>
                    <button onClick={ch.menu} title="Chat options" style={sx('position:absolute;top:6px;right:4px;width:22px;height:22px;display:grid;place-items:center;background:transparent;border:none;border-radius:6px;cursor:pointer;color:var(--color-neutral-600)')}>
                      <i className="ph ph-dots-three" style={sx('font-size:15px')}></i>
                    </button>
                  </>
                )}
                {ch.menuOpen && (
                  <div style={sx('position:absolute;top:28px;right:2px;width:176px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;box-shadow:var(--shadow-lg);padding:5px;z-index:35;display:flex;flex-direction:column;gap:1px;animation:ewfade .15s ease both')}>
                    <button onClick={ch.rename} style={sx('display:flex;align-items:center;gap:8px;font:inherit;font-size:12px;color:var(--color-text);background:transparent;border:none;border-radius:6px;padding:7px 9px;cursor:pointer;text-align:left')}>
                      <i className="ph ph-pencil-simple" style={sx('font-size:13px')}></i>Rename
                    </button>
                    <button onClick={ch.sched} style={sx('display:flex;align-items:center;gap:8px;font:inherit;font-size:12px;color:var(--color-text);background:transparent;border:none;border-radius:6px;padding:7px 9px;cursor:pointer;text-align:left')}>
                      <i className="ph ph-clock" style={sx('font-size:13px')}></i>{ch.schedAction}
                    </button>
                    <div style={sx('font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:var(--color-neutral-600);padding:7px 9px 3px')}>Move to</div>
                    {ch.cats.map((mc, mi) => (
                      <button key={mi} onClick={mc.pick} style={sx('display:flex;align-items:center;gap:8px;font:inherit;font-size:12px;color:var(--color-text);background:transparent;border:none;border-radius:6px;padding:6px 9px;cursor:pointer;text-align:left')}>
                        <i className={'ph ' + mc.icon} style={{ fontSize: 13, color: mc.iconColor }}></i>{mc.label}
                        {mc.on && <i className="ph ph-check" style={sx('font-size:12px;margin-left:auto;color:var(--color-accent)')}></i>}
                      </button>
                    ))}
                    <div style={sx('height:1px;background:var(--color-divider);margin:4px 6px')}></div>
                    <button onClick={ch.del} style={sx('display:flex;align-items:center;gap:8px;font:inherit;font-size:12px;color:var(--color-harvest);background:transparent;border:none;border-radius:6px;padding:7px 9px;cursor:pointer;text-align:left')}>
                      <i className="ph ph-trash" style={sx('font-size:13px')}></i>Delete chat
                    </button>
                  </div>
                )}
              </div>
            ))}
          </Fragment>
        ))}
      </div>
      <div style={sx('flex:1;min-width:0;display:flex;flex-direction:column;max-width:780px;margin:0 auto;padding:0 26px')}>
        {vm.chatActive && (
          <div style={sx('flex:none;padding:20px 0 12px;display:flex;align-items:center;gap:12px')}>
            <div style={sx('width:36px;height:36px;border-radius:10px;background:var(--color-accent-900);border:1px solid var(--color-divider);display:grid;place-items:center')}>
              <i className="ph ph-sparkle" style={sx('font-size:18px;color:var(--color-accent-300)')}></i>
            </div>
            <div>
              <div style={sx('font-size:14px')}>
                Worth AI <span style={sx('font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-600);margin-left:4px')}>EquipWorth copilot</span>
              </div>
              <div style={sx('font-size:11px;color:var(--color-neutral-500)')}>Reads every Deere bulletin so you don't have to · current as of this morning</div>
            </div>
          </div>
        )}
        <div ref={vm.chatRef} style={sx('flex:1;overflow-y:auto;display:flex;flex-direction:column;gap:12px;padding:8px 0 16px')}>
          {vm.chatFresh && (
            <div style={sx('margin:auto;display:flex;flex-direction:column;align-items:center;gap:18px;width:100%;max-width:640px;padding-bottom:36px;animation:ewfade .4s ease both')}>
              <div style={sx('width:56px;height:56px;border-radius:16px;background:linear-gradient(135deg,var(--color-accent-900),var(--color-surface));border:1px solid var(--color-divider);display:grid;place-items:center')}>
                <i className="ph ph-sparkle" style={sx('font-size:27px;color:var(--color-accent-300)')}></i>
              </div>
              <div style={sx('text-align:center')}>
                <h2 style={sx('font-size:30px;letter-spacing:-0.02em;margin:0 0 6px')}>{vm.chatGreeting}</h2>
                <p style={sx('font-size:14px;color:var(--color-neutral-500);margin:0')}>Worth AI read every Deere bulletin overnight. Ask what changed.</p>
              </div>
              <div style={sx('display:flex;align-items:center;gap:8px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:14px;padding:8px 8px 8px 16px;box-shadow:var(--shadow-md);width:100%')}>
                <input
                  value={vm.chatInput}
                  onChange={vm.onChatInput}
                  onKeyDown={vm.onChatKey}
                  placeholder="Ask about incentives, financing, trade assists…"
                  style={sx('flex:1;min-width:0;border:none;background:transparent;font:inherit;font-size:14px;color:var(--color-text)')}
                />
                <button className="btn btn-primary btn-icon" onClick={vm.sendChat} title="Send"><i className="ph ph-paper-plane-right" style={sx('font-size:15px')}></i></button>
              </div>
              <div style={sx('display:flex;gap:8px;flex-wrap:wrap;justify-content:center')}>
                {vm.chips.map((c, i) => (
                  <button key={i} className="btn btn-secondary" onClick={c.send} style={sx('font-size:12px;border-radius:999px')}>{c.label}</button>
                ))}
              </div>
            </div>
          )}
          {vm.messages.map((m, mi) => (
            <div key={mi} style={sx(m.wrapStyle)}>
              {m.hasBadge && (
                <div style={sx('display:flex;align-items:center;gap:5px;font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-sky-ink);margin-bottom:4px')}>
                  <i className="ph ph-clock" style={sx('font-size:11px')}></i>{m.badge}
                </div>
              )}
              {m.lines.map((l, li) => (
                <div key={li} style={sx(l.style)}>{l.text}</div>
              ))}
              {m.hasActions && (
                <div style={sx('display:flex;gap:6px;flex-wrap:wrap;margin-top:8px')}>
                  {m.actions.map((ac, ai) => (
                    <button key={ai} className="btn btn-secondary" onClick={ac.go} style={sx('font-size:11px;padding:4px 10px;border-radius:999px')}>
                      {ac.label}<i className="ph ph-arrow-right" style={sx('font-size:11px')}></i>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
          {vm.typing && (
            <div style={sx('align-self:flex-start;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:12px 16px;display:flex;gap:5px')}>
              <span style={sx('width:6px;height:6px;border-radius:50%;background:var(--color-neutral-400);animation:ewblink 1.2s infinite')}></span>
              <span style={sx('width:6px;height:6px;border-radius:50%;background:var(--color-neutral-400);animation:ewblink 1.2s .2s infinite')}></span>
              <span style={sx('width:6px;height:6px;border-radius:50%;background:var(--color-neutral-400);animation:ewblink 1.2s .4s infinite')}></span>
            </div>
          )}
        </div>
        {vm.chatActive && (
          <div style={sx('flex:none;padding:0 0 18px')}>
            <div style={sx('display:flex;align-items:center;gap:8px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:14px;padding:8px 8px 8px 16px')}>
              <input
                value={vm.chatInput}
                onChange={vm.onChatInput}
                onKeyDown={vm.onChatKey}
                placeholder="Reply to Worth AI…"
                style={sx('flex:1;min-width:0;border:none;background:transparent;font:inherit;font-size:14px;color:var(--color-text)')}
              />
              <button className="btn btn-primary btn-icon" onClick={vm.sendChat} title="Send"><i className="ph ph-paper-plane-right" style={sx('font-size:15px')}></i></button>
            </div>
            <div style={sx('font-size:10px;color:var(--color-neutral-600);text-align:center;margin-top:6px')}>Worth AI reads official JDF bulletins only. Verify terms before quoting a customer.</div>
          </div>
        )}
      </div>
      {vm.delOpen && (
        <div className="dialog-backdrop" style={{ zIndex: 45 }}>
          <div className="dialog" style={sx('width:min(400px,100%)')}>
            <div className="dialog-title" style={sx('display:flex;align-items:center;gap:10px')}>
              <i className="ph ph-warning-octagon" style={sx('font-size:20px;color:var(--color-harvest)')}></i>Delete this thread?
            </div>
            <div className="dialog-body">"{vm.delChatTitle}" and its full history will be permanently deleted for everyone on this account. This can't be undone.</div>
            {vm.delScheduled && (
              <div style={sx('display:flex;gap:8px;font-size:12px;color:var(--color-harvest-ink);background:var(--color-harvest-bg);border-radius:8px;padding:9px 12px;line-height:1.45')}>
                <i className="ph ph-clock" style={sx('font-size:14px;flex:none;margin-top:1px')}></i>This thread has a schedule. Deleting it also stops the recurring digest.
              </div>
            )}
            <div className="dialog-actions">
              <button className="btn btn-secondary" onClick={vm.cancelDel}>Keep it</button>
              <button className="btn" onClick={vm.confirmDel} style={sx('border:1px solid var(--color-harvest);color:var(--color-harvest)')}>
                <i className="ph ph-trash"></i>Delete thread
              </button>
            </div>
          </div>
        </div>
      )}
      {vm.schedOpen && (
        <div className="dialog-backdrop" style={{ zIndex: 40 }}>
          <div className="dialog">
            <div className="dialog-title">Schedule this thread</div>
            <div className="dialog-body">Worth AI re-runs this thread's question on a schedule and posts a fresh answer, bulletin changes included, so it's waiting when you get in.</div>
            <div className="field">
              <label>Frequency</label>
              <div className="seg">
                {vm.schedFreqOpts.map((sf, i) => (
                  <label key={i} className="seg-opt"><input type="radio" name="schedfreq" checked={sf.on} onChange={sf.pick} readOnly />{sf.label}</label>
                ))}
              </div>
            </div>
            <div className="field">
              <label>Time</label>
              <select className="input" value={vm.schedTime} onChange={vm.onSchedTime}>
                {vm.schedTimes.map((tm, i) => <option key={i} value={tm}>{tm}</option>)}
              </select>
            </div>
            <div className="dialog-actions">
              {vm.schedHas && (
                <button className="btn btn-ghost" onClick={vm.schedRemove} style={sx('margin-right:auto;color:var(--color-harvest)')}>Remove schedule</button>
              )}
              <button className="btn btn-secondary" onClick={vm.schedClose}>Cancel</button>
              <button className="btn btn-primary" onClick={vm.schedSave}><i className="ph ph-clock"></i>Save schedule</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
