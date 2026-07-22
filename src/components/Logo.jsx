export default function Logo({ size = 28 }) {
  return (
    <img
      src="/equipworth-icon.png"
      width={size}
      height={size}
      alt="EquipWorth"
      style={{ display: 'block', borderRadius: '22%', flex: 'none' }}
    />
  );
}
