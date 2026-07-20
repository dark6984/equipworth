export default function LegalModal({ title, body, onClose }) {
  return (
    <div className="dialog-backdrop" style={{ zIndex: 60 }} onClick={onClose}>
      <div className="dialog" style={{ width: 'min(640px,100%)', maxHeight: '82vh' }} onClick={(e) => e.stopPropagation()}>
        <div className="dialog-title">{title}</div>
        <div style={{ fontSize: 11, color: 'var(--color-neutral-500)', marginTop: -4 }}>
          Last updated July 2026 · demo document
        </div>
        <div className="dialog-body" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
          {body.map((lb, i) => (
            <div key={i}>
              <div style={{ fontFamily: 'var(--font-heading)', fontSize: 14, marginBottom: 3, color: 'var(--color-text)' }}>{lb.h}</div>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6, color: 'var(--color-neutral-400)' }}>{lb.p}</p>
            </div>
          ))}
        </div>
        <div className="dialog-actions">
          <button className="btn btn-primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
