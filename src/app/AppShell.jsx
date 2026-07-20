import { sx } from '../lib/sx.js';
import Logo from '../components/Logo.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import Inventory from '../pages/Inventory.jsx';
import UnitDetail from '../pages/UnitDetail.jsx';
import Appraiser from '../pages/Appraiser.jsx';
import Team from '../pages/Team.jsx';
import System from '../pages/System.jsx';
import Settings from '../pages/Settings.jsx';
import Chat from '../pages/Chat.jsx';

export default function AppShell({ vm }) {
  return (
    <div style={sx('display:flex;height:100%')}>
      <aside style={sx('width:218px;flex:none;display:flex;flex-direction:column;padding:16px 12px 14px;position:relative;background:linear-gradient(180deg,#121813,#0C100D);box-shadow:inset -1px 0 0 rgba(237,235,226,.09)')}>
        <button onClick={vm.goHome} style={sx('display:flex;align-items:center;gap:9px;background:none;border:none;cursor:pointer;font:inherit;padding:0 8px 18px;text-align:left')}>
          <Logo size={26} />
          <span style={sx('font-family:var(--font-heading);font-weight:600;font-size:17px;letter-spacing:-0.01em;color:#EDEBE2')}>EquipWorth</span>
        </button>
        <nav style={sx('display:flex;flex-direction:column;gap:2px')}>
          {vm.navItems.map((n, i) => (
            <button key={i} onClick={n.go} style={sx(n.style)}>
              <i className={'ph ' + n.icon} style={sx('font-size:16px')}></i>{n.label}
            </button>
          ))}
          <div style={sx('display:flex;align-items:center;gap:8px;padding:16px 10px 6px')}>
            <span style={sx('font-size:9px;letter-spacing:.16em;text-transform:uppercase;color:rgba(237,235,226,.4)')}>Admin</span>
            <span style={sx('flex:1;height:1px;background:linear-gradient(to right,rgba(237,235,226,.18),transparent)')}></span>
            <i className="ph ph-lock-simple" style={sx('font-size:10px;color:rgba(237,235,226,.4)')}></i>
          </div>
          {vm.adminItems.map((n, i) => (
            <button key={i} onClick={n.go} style={sx(n.style)}>
              <i className={'ph ' + n.icon} style={sx('font-size:16px')}></i>{n.label}
            </button>
          ))}
        </nav>
        <div style={sx('margin-top:auto;display:flex;flex-direction:column;gap:10px')}>
          <div style={sx('display:inline-flex;align-items:center;gap:7px;font-size:9px;letter-spacing:.12em;text-transform:uppercase;color:rgba(237,235,226,.45);padding:0 8px;white-space:nowrap')}>
            <span style={sx('width:6px;height:6px;border-radius:50%;background:var(--color-accent);box-shadow:0 0 6px var(--color-accent)')}></span>
            Comp sync 14m ago
          </div>
          {vm.userMenu && (
            <div style={sx('position:absolute;bottom:62px;left:12px;right:12px;background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;box-shadow:var(--shadow-lg);padding:6px;display:flex;flex-direction:column;gap:2px;z-index:40;animation:ewfade .18s ease both')}>
              <div style={sx('padding:8px 10px;border-bottom:1px solid var(--color-divider);margin-bottom:4px')}>
                <div style={sx('font-size:13px')}>Drew Barnett</div>
                <div style={sx('font-size:11px;color:var(--color-neutral-500)')}>Used Eq. Manager · {vm.dealerName}</div>
              </div>
              <button onClick={vm.goSettings} style={sx('display:flex;align-items:center;gap:9px;font:inherit;font-size:13px;color:var(--color-text);background:transparent;border:none;border-radius:6px;padding:8px 10px;cursor:pointer;text-align:left')}>
                <i className="ph ph-gear-six" style={sx('font-size:15px')}></i>Settings
              </button>
              <button onClick={vm.signOut} style={sx('display:flex;align-items:center;gap:9px;font:inherit;font-size:13px;color:var(--color-text);background:transparent;border:none;border-radius:6px;padding:8px 10px;cursor:pointer;text-align:left')}>
                <i className="ph ph-sign-out" style={sx('font-size:15px')}></i>Sign out
              </button>
            </div>
          )}
          <button onClick={vm.toggleUserMenu} style={sx('display:flex;align-items:center;gap:8px;background:rgba(237,235,226,.07);border:1px solid rgba(237,235,226,.12);border-radius:10px;cursor:pointer;font:inherit;padding:7px 10px;width:100%;text-align:left')}>
            <span style={sx('width:26px;height:26px;flex:none;border-radius:50%;background:rgba(237,235,226,.14);color:#EDEBE2;display:grid;place-items:center;font-size:10px;font-weight:600')}>DB</span>
            <span style={sx('min-width:0;flex:1')}>
              <span style={sx('display:block;font-size:12px;line-height:1.2;color:#EDEBE2')}>Drew Barnett</span>
              <span style={sx('display:block;font-size:10px;color:rgba(237,235,226,.55)')}>Used Eq. Manager</span>
            </span>
            <i className="ph ph-caret-up-down" style={sx('font-size:13px;color:rgba(237,235,226,.5)')}></i>
          </button>
        </div>
      </aside>
      <div style={sx('flex:1;min-width:0;display:flex;flex-direction:column')}>
        <div style={sx('height:2px;flex:none;background:linear-gradient(90deg,#2F6B28,#55A945 55%,#E0A458)')}></div>
        <header style={sx('flex:none;display:flex;align-items:center;gap:14px;padding:12px 24px;border-bottom:1px solid var(--color-divider);background:var(--color-surface)')}>
          <h4 style={sx('margin:0;font-size:16px;letter-spacing:-0.01em')}>{vm.pageTitle}</h4>
          <span style={sx('font-size:12px;color:var(--color-neutral-500)')}>{vm.dealerName}</span>
          <span style={sx('margin-left:auto;display:inline-flex;align-items:center;gap:7px;font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:var(--color-neutral-500)')}>
            <span style={sx('width:6px;height:6px;border-radius:50%;background:var(--color-accent);box-shadow:0 0 6px var(--color-accent)')}></span>Market feed live
          </span>
        </header>
        <main style={sx('flex:1;min-height:0;overflow-y:auto')}>
          {vm.isDash && <Dashboard vm={vm} />}
          {vm.isInv && <Inventory vm={vm} />}
          {vm.isUnit && <UnitDetail vm={vm} />}
          {vm.isAppr && <Appraiser vm={vm} />}
          {vm.isTeam && <Team vm={vm} />}
          {vm.isSys && <System vm={vm} />}
          {vm.isSet && <Settings vm={vm} />}
          {vm.isChat && <Chat vm={vm} />}
        </main>
      </div>
    </div>
  );
}
