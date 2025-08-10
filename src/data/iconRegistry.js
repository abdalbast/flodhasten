// Central icon registry: per-theme sets with small SVGs in public/icons
// All assets are custom, licence-free SVGs designed for this app.

export const ICON_SETS = {
  duotone: {
    water: '/icons/duotone/water.svg',
    milk: '/icons/duotone/milk.svg',
    coffee: '/icons/duotone/coffee.svg',
    bread: '/icons/duotone/bread.svg',
  },
  flat: {
    water: '/icons/flat/water.svg',
    milk: '/icons/flat/milk.svg',
    coffee: '/icons/flat/coffee.svg',
    bread: '/icons/flat/bread.svg',
  },
  mono: {
    water: '/icons/mono/water.svg',
    milk: '/icons/mono/milk.svg',
    coffee: '/icons/mono/coffee.svg',
    bread: '/icons/mono/bread.svg',
  },
  feather: {
    water: '/icons/feather/water.svg',
    milk: '/icons/feather/milk.svg',
    coffee: '/icons/feather/coffee.svg',
    bread: '/icons/feather/bread.svg',
  },
  sketch: {
    water: '/icons/sketch/water.svg',
    milk: '/icons/sketch/milk.svg',
    coffee: '/icons/sketch/coffee.svg',
    bread: '/icons/sketch/bread.svg',
  },
  phosphor: {
    // logical ids mapped in getIconSrc
    water: 'drop',
    milk: 'bottle',
    coffee: 'coffee',
    bread: 'bread'
  }
};

function deriveBaseFromLocation() {
  try {
    const { pathname } = window.location;
    const match = pathname.match(/^\/(flodhasten)(\/|$)/);
    if (match) return `/${match[1]}`;
  } catch (e) {}
  return '';
}

export function getIconPath(iconSet, id) {
  const set = ICON_SETS[iconSet] || ICON_SETS.sketch;
  const path = set[id] || set.water;
  const envBase = (typeof process !== 'undefined' && process.env && process.env.PUBLIC_URL) ? process.env.PUBLIC_URL : '';
  const base = envBase || deriveBaseFromLocation();
  // Ensure single slash join
  const joined = `${base}${path.startsWith('/') ? path : `/${path}`}`;
  return joined;
}

// MIT-licensed Tabler-like inline SVGs as data URIs (license-free usage)
const TABLER_DATA_URIS = {
  water: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#38bdf8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M12 3c2.5 4 6 6.5 6 9.5a6 6 0 1 1-12 0C6 9.5 9.5 7 12 3z' fill='#38bdf8' opacity='.3'/><path d='M9 15c1 .7 2 .9 3 .9s2-.2 3-.9'/></svg>`),
  milk: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#94a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='7' y='3' width='10' height='18' rx='3' fill='#e2e8f0'/></svg>`),
  coffee: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#8b5e34' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='5' y='9' width='12' height='7' rx='2' fill='#8b5e34' opacity='.35'/><path d='M17 10h2a2 2 0 0 1 0 4h-2' /></svg>`),
  bread: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#f59e0b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><rect x='5' y='9' width='14' height='9' rx='3' fill='#fbbf24' opacity='.6'/></svg>`),
  speaker: encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='#FFFFFF' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='M5 9v6h4l5 4V5L9 9H5z'/><path d='M16.5 8.5a5 5 0 0 1 0 7M19 6a8 8 0 0 1 0 12'/></svg>`) 
};

export function getIconSrc(iconSet, id) {
  const key = id || 'water';
  if (iconSet === 'phosphor') {
    // Map our domain words to Phosphor icon ids
    const phosphorMap = {
      water: 'drop',
      milk: 'bottle',
      coffee: 'coffee',
      bread: 'bread'
    };
    const phosphorId = phosphorMap[key] || 'drop';
    // Use MIT-licensed Phosphor core assets from unpkg CDN (fixed version for stability)
    return `https://unpkg.com/@phosphor-icons/core@2.0.3/assets/regular/${phosphorId}.svg`;
  }
  // Default to local data-URIs for maximum reliability
  const svg = TABLER_DATA_URIS[key] || TABLER_DATA_URIS.water;
  return `data:image/svg+xml;utf8,${svg}`;
}
