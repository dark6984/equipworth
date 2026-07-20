// Stand-in for the design tool's drag-and-drop <image-slot> custom element,
// which is a design-time-only affordance (persists a dropped photo to a
// sidecar file inside the design project). Outside that runtime there's
// nothing to drop into, so this renders the same placeholder look the slot
// shows before a photo is added.
export default function ImageSlot({ placeholder, style }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 16,
        background:
          'repeating-linear-gradient(135deg, color-mix(in srgb, var(--color-text) 4%, transparent) 0 12px, transparent 12px 24px)',
        border: '1px dashed var(--color-divider)',
        borderRadius: 'inherit',
        color: 'var(--color-neutral-500)',
        fontSize: 12,
        ...style,
      }}
    >
      <span>
        <i className="ph ph-image" style={{ fontSize: 20, display: 'block', margin: '0 auto 6px' }}></i>
        {placeholder}
      </span>
    </div>
  );
}
