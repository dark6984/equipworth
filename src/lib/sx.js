// Converts a plain CSS declaration string ("color:red;font-size:12px") into
// a React inline-style object. Lets the ported markup keep its original
// style strings almost verbatim instead of hand-written object literals.
export function sx(css) {
  if (!css) return undefined;
  const out = {};
  css.split(';').forEach((decl) => {
    const i = decl.indexOf(':');
    if (i < 0) return;
    const rawProp = decl.slice(0, i).trim();
    // Custom properties (CSS variables) must keep their literal name.
    const prop = rawProp.startsWith('--')
      ? rawProp
      : rawProp.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    const value = decl.slice(i + 1).trim();
    if (prop && value) out[prop] = value;
  });
  return out;
}
