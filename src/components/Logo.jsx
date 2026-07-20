export default function Logo({ size = 28 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ display: 'block' }}>
      <rect width="32" height="32" rx="7" fill="#10150F"></rect>
      <rect x="0.5" y="0.5" width="31" height="31" rx="6.5" fill="none" stroke="rgba(237,235,226,.22)"></rect>
      <polyline points="7,21 13,15 18,18 25,9" fill="none" stroke="#55A945" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"></polyline>
      <circle cx="25" cy="9" r="2.6" fill="#E0A458"></circle>
      <line x1="7" y1="26" x2="25" y2="26" stroke="rgba(237,235,226,.3)" strokeWidth="1.6" strokeLinecap="round"></line>
    </svg>
  );
}
