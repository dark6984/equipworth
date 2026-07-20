export default function Toast({ text }) {
  return (
    <div
      style={{
        position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
        background: 'var(--color-surface)', border: '1px solid var(--color-divider)',
        boxShadow: 'var(--shadow-md)', borderRadius: 10, padding: '10px 18px',
        fontSize: 13, display: 'flex', alignItems: 'center', gap: 8, zIndex: 50,
        animation: 'ewfade .25s ease both',
      }}
    >
      <i className="ph ph-check-circle" style={{ fontSize: 16, color: 'var(--color-accent)' }}></i>
      {text}
    </div>
  );
}
