import { useEffect, useState } from 'react';
import { sx } from '../lib/sx.js';

function fmtDate(iso) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const STATUS_TAG = {
  pending: ['tag-accent-2', 'Pending'],
  joined: ['tag-accent', 'Joined'],
  revoked: ['tag-neutral', 'Revoked'],
};

export default function Invites() {
  const [invites, setInvites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState('');
  const [notice, setNotice] = useState(null);

  const load = () => {
    setLoading(true);
    fetch('/api/invites')
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (!res.ok) { setLoadError(data.error || 'Could not load invites'); setLoading(false); return; }
        setInvites(data.invites);
        setLoadError('');
        setLoading(false);
      })
      .catch(() => { setLoadError('Could not reach the server'); setLoading(false); });
  };

  useEffect(load, []);

  const sendInvite = async () => {
    const clean = email.trim().toLowerCase();
    if (!clean) { setSendError('Enter an email address'); return; }
    setSending(true);
    setSendError('');
    setNotice(null);
    try {
      const res = await fetch('/api/invites', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: clean }),
      });
      const data = await res.json();
      if (!res.ok) { setSending(false); setSendError(data.error || 'Could not send the invite'); return; }
      setEmail('');
      setSending(false);
      setNotice(data.emailSent
        ? { kind: 'ok', text: `Invite sent to ${clean}.` }
        : { kind: 'warn', text: `Invite created for ${clean}, but the email failed to send. Copy the link and send it yourself: ${data.invite.inviteUrl}` });
      load();
    } catch (e) {
      setSending(false);
      setSendError('Could not reach the server');
    }
  };

  const revoke = async (id) => {
    setInvites((cur) => cur.map((i) => (i.id === id ? { ...i, status: 'revoking' } : i)));
    try {
      const res = await fetch(`/api/invites/${id}/revoke`, { method: 'POST' });
      if (!res.ok) { load(); return; }
      setInvites((cur) => cur.map((i) => (i.id === id ? { ...i, status: 'revoked' } : i)));
    } catch (e) {
      load();
    }
  };

  return (
    <div style={sx('max-width:840px;margin:0 auto;padding:26px 24px 46px;display:flex;flex-direction:column;gap:16px;animation:ewfade .35s ease both')}>
      <div>
        <h2 style={sx('font-size:22px;letter-spacing:-0.02em;margin:0 0 2px')}>Invite teammates</h2>
        <p style={sx('font-size:13px;color:var(--color-neutral-500);margin:0')}>EquipWorth is invite-only. Send someone a link and they’ll set up their own account.</p>
      </div>

      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;padding:20px;display:flex;flex-direction:column;gap:12px')}>
        {sendError && (
          <div style={sx('font-size:12px;color:var(--color-harvest-ink);background:var(--color-harvest-bg);border-radius:8px;padding:9px 11px')}>{sendError}</div>
        )}
        {notice && (
          <div style={sx('font-size:12px;word-break:break-word;color:' + (notice.kind === 'ok' ? 'var(--color-accent-300)' : 'var(--color-accent-2-300)') + ';background:' + (notice.kind === 'ok' ? 'var(--color-accent-900)' : 'var(--color-accent-2-900)') + ';border-radius:8px;padding:9px 11px')}>{notice.text}</div>
        )}
        <div style={sx('display:flex;gap:10px;flex-wrap:wrap;align-items:flex-end')}>
          <div className="field" style={sx('flex:1;min-width:220px;margin:0')}>
            <label>Email address</label>
            <input className="input" type="email" placeholder="name@dealership.com" value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') sendInvite(); }} />
          </div>
          <button className="btn btn-primary" onClick={sendInvite} disabled={sending}>
            <i className="ph ph-paper-plane-tilt"></i>{sending ? 'Sending…' : 'Send invite'}
          </button>
        </div>
      </div>

      <div style={sx('background:var(--color-surface);border:1px solid var(--color-divider);border-radius:10px;overflow:hidden')}>
        {loading && <div style={sx('padding:20px;font-size:13px;color:var(--color-neutral-500)')}>Loading invites…</div>}
        {!loading && loadError && <div style={sx('padding:20px;font-size:13px;color:var(--color-harvest-ink)')}>{loadError}</div>}
        {!loading && !loadError && invites.length === 0 && (
          <div style={sx('padding:20px;font-size:13px;color:var(--color-neutral-500)')}>No invites sent yet.</div>
        )}
        {!loading && !loadError && invites.length > 0 && (
          <>
            <div className="ew-desktop-table" style={sx('overflow-x:auto')}>
              <table className="table">
                <thead>
                  <tr><th style={sx('padding-left:16px')}>Email</th><th>Status</th><th>Invited by</th><th>Sent</th><th style={sx('padding-right:16px')}></th></tr>
                </thead>
                <tbody>
                  {invites.map((inv) => {
                    const [tagClass, label] = STATUS_TAG[inv.status] || STATUS_TAG.pending;
                    return (
                      <tr key={inv.id}>
                        <td style={sx('padding-left:16px;font-size:13px')}>{inv.email}</td>
                        <td><span className={'tag ' + tagClass}>{inv.status === 'revoking' ? 'Revoking…' : label}</span></td>
                        <td style={sx('font-size:12px;color:var(--color-neutral-500)')}>{inv.invitedBy ? inv.invitedBy.name : '—'}</td>
                        <td style={sx('font-size:12px;color:var(--color-neutral-500)')}>{fmtDate(inv.createdAt)}</td>
                        <td style={sx('text-align:right;padding-right:16px')}>
                          {inv.status === 'pending' && (
                            <button className="btn btn-ghost btn-icon" onClick={() => revoke(inv.id)} title="Revoke invite">
                              <i className="ph ph-x-circle" style={sx('font-size:15px')}></i>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="ew-mobile-cards" style={sx('flex-direction:column;gap:10px;padding:14px')}>
              {invites.map((inv) => {
                const [tagClass, label] = STATUS_TAG[inv.status] || STATUS_TAG.pending;
                return (
                  <div key={inv.id} style={sx('background:var(--color-bg);border:1px solid var(--color-divider);border-radius:10px;padding:14px')}>
                    <div style={sx('display:flex;align-items:center;gap:10px')}>
                      <div style={sx('flex:1;min-width:0;font-size:13.5px')}>{inv.email}</div>
                      {inv.status === 'pending' && (
                        <button className="btn btn-ghost btn-icon" onClick={() => revoke(inv.id)} title="Revoke invite" style={sx('flex:none')}>
                          <i className="ph ph-x-circle" style={sx('font-size:15px')}></i>
                        </button>
                      )}
                    </div>
                    <div style={sx('display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:12px;padding-top:12px;border-top:1px solid var(--color-divider)')}>
                      <span className={'tag ' + tagClass}>{inv.status === 'revoking' ? 'Revoking…' : label}</span>
                      <span style={sx('font-size:11px;color:var(--color-neutral-600);margin-left:auto')}>{fmtDate(inv.createdAt)}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
