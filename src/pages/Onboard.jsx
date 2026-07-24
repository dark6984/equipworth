import { useEffect, useState } from 'react';
import { sx } from '../lib/sx.js';
import Logo from '../components/Logo.jsx';

const STATUS_COPY = {
  invalid: { title: 'This invite link isn’t valid', body: 'Double check you copied the whole link from your email, or ask whoever invited you to send a new one.' },
  used: { title: 'This invite has already been used', body: 'Each invite link creates one account and then stops working. If this was meant to be your account, sign in instead — or ask for a new invite.' },
  revoked: { title: 'This invite was revoked', body: 'Whoever invited you has canceled this link. Ask them to send a new one if you still need access.' },
};

export default function Onboard({ token }) {
  const [status, setStatus] = useState('loading');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/invites/${encodeURIComponent(token)}`)
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (res.ok) { setEmail(data.email); setStatus('form'); return; }
        setStatus(data.error === 'revoked' ? 'revoked' : res.status === 410 ? 'used' : 'invalid');
      })
      .catch(() => { if (!cancelled) setStatus('invalid'); });
    return () => { cancelled = true; };
  }, [token]);

  const submit = async () => {
    if (!name.trim()) { setFormError('Enter your name'); return; }
    if (!/^[a-z0-9._-]{3,24}$/.test(username.trim().toLowerCase())) {
      setFormError('Username must be 3-24 characters: letters, numbers, dots, dashes or underscores');
      return;
    }
    if (password.length < 8) { setFormError('Password needs at least 8 characters'); return; }
    if (password !== password2) { setFormError('Passwords don’t match'); return; }
    setFormError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/onboard', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, name, username, password }),
      });
      const data = await res.json();
      if (!res.ok) { setSubmitting(false); setFormError(data.error || 'Something went wrong. Try again.'); return; }
      setStatus('success');
      setTimeout(() => window.location.assign('/'), 900);
    } catch (e) {
      setSubmitting(false);
      setFormError('Could not reach the server. Try again.');
    }
  };

  return (
    <div style={sx('height:100%;display:grid;place-items:center;padding:16px;background:radial-gradient(700px 400px at 50% 30%,#162116,var(--color-bg))')}>
      <div style={sx('width:min(380px,100%);background:var(--color-surface);border:1px solid var(--color-divider);border-radius:14px;padding:28px;display:flex;flex-direction:column;gap:14px;box-shadow:var(--shadow-lg);animation:ewfade .4s ease both')}>
        <div style={sx('display:flex;align-items:center;gap:10px')}>
          <Logo size={28} />
          <span style={sx('font-family:var(--font-heading);font-weight:600;font-size:19px;color:var(--color-text)')}>EquipWorth</span>
        </div>

        {status === 'loading' && (
          <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0')}>Checking your invite…</p>
        )}

        {(status === 'invalid' || status === 'used' || status === 'revoked') && (
          <>
            <p style={sx('font-size:15px;font-weight:600;margin:4px 0 0')}>{STATUS_COPY[status].title}</p>
            <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0')}>{STATUS_COPY[status].body}</p>
            <a href="/" className="btn btn-secondary btn-block" style={sx('margin-top:6px;font-size:13px;text-decoration:none')}><i className="ph ph-arrow-left"></i>Back to the site</a>
          </>
        )}

        {status === 'success' && (
          <>
            <p style={sx('font-size:15px;font-weight:600;margin:4px 0 0')}>You’re all set, {name.split(' ')[0]}</p>
            <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0')}>Taking you to your dashboard…</p>
          </>
        )}

        {status === 'form' && (
          <>
            <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0')}>Set up your account for <strong style={sx('color:var(--color-text)')}>{email}</strong>.</p>
            {formError && (
              <div style={sx('font-size:12px;color:var(--color-harvest-ink);background:var(--color-harvest-bg);border-radius:8px;padding:9px 11px')}>{formError}</div>
            )}
            <div className="field"><label>Your name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="field"><label>Username</label><input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="e.g. jsmith" /></div>
            <div className="field"><label>Password (8+ characters)</label><input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} /></div>
            <div className="field"><label>Confirm password</label><input className="input" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') submit(); }} /></div>
            <button className="btn btn-primary btn-block" onClick={submit} disabled={submitting}>
              <i className="ph ph-user-plus"></i>{submitting ? 'Creating your account…' : 'Create account'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
