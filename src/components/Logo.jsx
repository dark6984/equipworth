export default function Logo({ size = 28, className }) {
  return (
    <img
      src="/equipworth-icon.png"
      width={size}
      height={size}
      alt="EquipWorth"
      className={className}
      style={{ display: 'block', borderRadius: '22%', flex: 'none' }}
    />
  );
}
