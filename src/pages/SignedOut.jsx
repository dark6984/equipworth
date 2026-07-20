import { sx } from '../lib/sx.js';
import Logo from '../components/Logo.jsx';

export default function SignedOut({ vm }) {
  return (
    <div style={sx('height:100%;display:grid;place-items:center;padding:16px;background:radial-gradient(700px 400px at 50% 30%,#162116,var(--color-bg))')}>
      <div style={sx('width:min(360px,100%);background:var(--color-surface);border:1px solid var(--color-divider);border-radius:14px;padding:28px;display:flex;flex-direction:column;gap:14px;box-shadow:var(--shadow-lg);animation:ewfade .4s ease both')}>
        <button onClick={vm.goHome} style={sx('display:flex;align-items:center;gap:10px;background:none;border:none;cursor:pointer;font:inherit;padding:0;text-align:left')} title="Back to the site">
          <Logo size={28} />
          <span style={sx('font-family:var(--font-heading);font-weight:600;font-size:19px;color:var(--color-text)')}>EquipWorth</span>
        </button>
        <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0')}>Terminal access requires a dealership account. Sign in, or walk through the demo lot.</p>
        <div className="field"><label>Email</label><input className="input" value="drew.barnett@legacyequip.com" readOnly /></div>
        <div className="field"><label>Password</label><input className="input" type="password" placeholder="••••••••" onKeyDown={vm.onLoginKey} /></div>
        <button className="btn btn-primary btn-block" onClick={vm.signIn}><i className="ph ph-sign-in"></i>Sign in</button>
        <button onClick={vm.goHome} className="btn btn-secondary btn-block" style={sx('margin-top:2px;font-size:13px')}><i className="ph ph-arrow-left"></i>Back to the site</button>
        <div style={sx('font-size:11px;color:var(--color-neutral-600);text-align:center')}>Demo build: any password opens the sample dealership.</div>
      </div>
    </div>
  );
}
