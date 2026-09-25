import { PhotoCategory } from '../types/property';

// Helper to create high-aesthetic SVG property illustration data URLs
function createPropertySvg(title: string, subtitle: string, colors: { bg1: string; bg2: string; accent: string }, type: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
    <defs>
      <linearGradient id="skyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${colors.bg1}"/>
        <stop offset="100%" stop-color="${colors.bg2}"/>
      </linearGradient>
      <linearGradient id="warmLight" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#fef08a" stop-opacity="0.9"/>
        <stop offset="100%" stop-color="#f59e0b" stop-opacity="0.3"/>
      </linearGradient>
      <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
        <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#0f172a" flood-opacity="0.25"/>
      </filter>
    </defs>
    <!-- Background wall / sky -->
    <rect width="800" height="600" fill="url(#skyGrad)" />
    
    <!-- Geometric architecture elements based on type -->
    ${type === 'cover' ? `
      <!-- Luxury Villa Facade -->
      <rect x="120" y="160" width="560" height="340" rx="8" fill="#1e293b" opacity="0.92" filter="url(#softShadow)"/>
      <rect x="160" y="200" width="240" height="240" rx="4" fill="url(#warmLight)"/>
      <line x1="280" y1="200" x2="280" y2="440" stroke="#0f172a" stroke-width="4"/>
      <line x1="160" y1="320" x2="400" y2="320" stroke="#0f172a" stroke-width="4"/>
      <!-- Balcony & timber slats -->
      <rect x="440" y="200" width="200" height="120" fill="#334155"/>
      <line x1="460" y1="200" x2="460" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="490" y1="200" x2="490" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="520" y1="200" x2="520" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="550" y1="200" x2="550" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="580" y1="200" x2="580" y2="320" stroke="#475569" stroke-width="3"/>
      <line x1="610" y1="200" x2="610" y2="320" stroke="#475569" stroke-width="3"/>
      <!-- Entrance door -->
      <rect x="460" y="360" width="70" height="140" fill="#0f172a"/>
      <circle cx="518" cy="430" r="4" fill="#fbbf24"/>
      <!-- Lawn / ground -->
      <path d="M0 480 Q400 470 800 480 L800 600 L0 600 Z" fill="#15803d" opacity="0.35"/>
      <rect x="0" y="520" width="800" height="80" fill="#334155"/>
    ` : ''}

    ${type === 'exterior' ? `
      <!-- Patio & Pool Courtyard -->
      <rect x="60" y="140" width="680" height="260" rx="6" fill="#1e293b" opacity="0.85" filter="url(#softShadow)"/>
      <rect x="100" y="180" width="300" height="180" rx="4" fill="#38bdf8" opacity="0.3"/>
      <!-- Pool water -->
      <rect x="100" y="420" width="600" height="140" rx="8" fill="#0284c7" opacity="0.85"/>
      <path d="M120 460 Q250 445 400 460 T680 460" stroke="#bae6fd" stroke-width="3" fill="none" opacity="0.7"/>
      <path d="M120 500 Q250 485 400 500 T680 500" stroke="#bae6fd" stroke-width="3" fill="none" opacity="0.7"/>
      <!-- Lounge chairs -->
      <rect x="460" y="330" width="90" height="30" rx="4" fill="#f1f5f9"/>
      <rect x="580" y="330" width="90" height="30" rx="4" fill="#f1f5f9"/>
      <!-- Palm plant silhouette -->
      <path d="M60 420 Q90 320 80 260 Q120 310 110 370 Q150 280 130 420 Z" fill="#166534" opacity="0.7"/>
    ` : ''}

    ${type === 'bedroom' ? `
      <!-- Master Bedroom Interior -->
      <rect x="80" y="100" width="640" height="420" rx="10" fill="#1e293b" opacity="0.9" filter="url(#softShadow)"/>
      <!-- Wall artwork -->
      <rect x="260" y="150" width="280" height="130" rx="4" fill="#475569" stroke="#94a3b8" stroke-width="2"/>
      <circle cx="400" cy="215" r="40" fill="${colors.accent}" opacity="0.6"/>
      <!-- King Bed with headboard -->
      <rect x="220" y="270" width="360" height="20" rx="4" fill="#334155"/>
      <rect x="240" y="300" width="320" height="180" rx="10" fill="#f8fafc"/>
      <rect x="240" y="370" width="320" height="110" rx="6" fill="#e2e8f0"/>
      <!-- Pillows -->
      <rect x="270" y="315" width="110" height="50" rx="8" fill="#cbd5e1"/>
      <rect x="420" y="315" width="110" height="50" rx="8" fill="#cbd5e1"/>
      <!-- Nightstands & Lamps -->
      <rect x="150" y="360" width="60" height="90" rx="4" fill="#334155"/>
      <rect x="590" y="360" width="60" height="90" rx="4" fill="#334155"/>
      <circle cx="180" cy="335" r="16" fill="#fef08a" opacity="0.8"/>
      <circle cx="620" cy="335" r="16" fill="#fef08a" opacity="0.8"/>
      <!-- Wooden floor lines -->
      <line x1="80" y1="520" x2="720" y2="520" stroke="#78350f" stroke-width="4" opacity="0.4"/>
    ` : ''}

    ${type === 'bathroom' ? `
      <!-- Luxury Bathroom -->
      <rect x="100" y="100" width="600" height="420" rx="10" fill="#1e293b" opacity="0.9" filter="url(#softShadow)"/>
      <!-- Marble tiles pattern -->
      <line x1="100" y1="200" x2="700" y2="200" stroke="#475569" stroke-width="1" stroke-dasharray="10 10"/>
      <line x1="100" y1="300" x2="700" y2="300" stroke="#475569" stroke-width="1" stroke-dasharray="10 10"/>
      <!-- Round LED Mirror -->
      <circle cx="280" cy="220" r="65" fill="#e2e8f0" stroke="#38bdf8" stroke-width="4"/>
      <!-- Vanity Sink -->
      <rect x="180" y="310" width="200" height="100" rx="6" fill="#f8fafc"/>
      <rect x="230" y="325" width="100" height="25" rx="12" fill="#94a3b8"/>
      <!-- Modern Freestanding Bathtub -->
      <ellipse cx="530" cy="390" rx="110" ry="60" fill="#f8fafc"/>
      <ellipse cx="530" cy="385" rx="90" ry="42" fill="#e2e8f0"/>
      <path d="M420 390 Q530 450 640 390" stroke="#cbd5e1" stroke-width="3" fill="none"/>
      <!-- Chrome tap fixture -->
      <path d="M530 290 L530 340 L515 340" stroke="#94a3b8" stroke-width="6" stroke-linecap="round" fill="none"/>
    ` : ''}

    <!-- Lower Title Bar Overlay -->
    <rect x="0" y="500" width="800" height="100" fill="#090d16" opacity="0.85"/>
    <text x="40" y="545" fill="#ffffff" font-family="system-ui, sans-serif" font-weight="700" font-size="24">${title}</text>
    <text x="40" y="575" fill="#94a3b8" font-family="system-ui, sans-serif" font-weight="400" font-size="16">${subtitle}</text>

    <!-- Badge icon at top-right -->
    <rect x="670" y="24" width="106" height="34" rx="17" fill="#0f172a" opacity="0.8"/>
    <text x="723" y="46" fill="#38bdf8" font-family="system-ui, sans-serif" font-weight="600" font-size="13" text-anchor="middle">PREMIUM</text>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const INITIAL_CATEGORIES: PhotoCategory[] = [
  {
    id: 'cover',
    label: 'Foto Utama (Cover)',
    required: true,
    maxPhotos: 4,
    description: 'Foto terbaik tampak depan properti yang menarik perhatian calon pembeli/penyewa.',
    photos: []
  },
  {
    id: 'exterior',
    label: 'Eksterior',
    required: true,
    maxPhotos: 4,
    description: 'Tampak samping, halaman depan/belakang, carport, atau fasilitas luar properti.',
    photos: []
  },
  {
    id: 'bedroom',
    label: 'Kamar Tidur',
    required: true,
    maxPhotos: 4,
    description: 'Kamar tidur utama atau kamar tidur lainnya dengan pencahayaan yang terang.',
    photos: []
  },
  {
    id: 'bathroom',
    label: 'Kamar Mandi',
    required: true,
    maxPhotos: 4,
    description: 'Kamar mandi bersih dengan perlengkapan sanitasi yang terlihat jelas.',
    photos: []
  }
];

export const SAMPLE_PROPERTIES_DATA: Record<string, { name: string; caption: string; type: string; bg1: string; bg2: string; accent: string }[]> = {
  cover: [
    {
      name: 'Facade Utama Depan.jpg',
      caption: 'Tampak depan modern tropis dengan pencahayaan hangat sore hari',
      type: 'cover',
      bg1: '#0f172a',
      bg2: '#334155',
      accent: '#f59e0b'
    },
    {
      name: 'Facade Gerbang & Carport.jpg',
      caption: 'Area carport luas muat 2 SUV dan gerbang minimalis',
      type: 'cover',
      bg1: '#1e293b',
      bg2: '#475569',
      accent: '#38bdf8'
    },
    {
      name: 'Perspektif Sudut Sore.jpg',
      caption: 'Tampilan sudut asimetris arsitektur kontemporer',
      type: 'cover',
      bg1: '#090d16',
      bg2: '#1e293b',
      accent: '#fbbf24'
    }
  ],
  exterior: [
    {
      name: 'Halaman Belakang & Kolam Renang.jpg',
      caption: 'Kolam renang pribadi berukuran 8x3 meter dengan decking kayu jati',
      type: 'exterior',
      bg1: '#064e3b',
      bg2: '#0f766e',
      accent: '#34d399'
    },
    {
      name: 'Patio & Taman Tropis.jpg',
      caption: 'Area santai semi-outdoor di samping taman hijau rimbun',
      type: 'exterior',
      bg1: '#111827',
      bg2: '#1f2937',
      accent: '#10b981'
    },
    {
      name: 'Balkon Lantai 2.jpg',
      caption: 'Pemandangan terbuka menghadap panorama kota',
      type: 'exterior',
      bg1: '#0c4a6e',
      bg2: '#075985',
      accent: '#38bdf8'
    },
    {
      name: 'Taman Kering Samping.jpg',
      caption: 'Zen garden dengan batu kali putih dan pencahayaan sorot',
      type: 'exterior',
      bg1: '#1e293b',
      bg2: '#334155',
      accent: '#a78bfa'
    }
  ],
  bedroom: [
    {
      name: 'Kamar Tidur Utama (Master Suite).jpg',
      caption: 'Master bedroom dengan king bed, walk-in closet, dan lantai parket',
      type: 'bedroom',
      bg1: '#312e81',
      bg2: '#1e1b4b',
      accent: '#c084fc'
    },
    {
      name: 'Kamar Anak / Kamar Tamu.jpg',
      caption: 'Kamar tidur kedua dengan jendela besar menghadap taman',
      type: 'bedroom',
      bg1: '#1e293b',
      bg2: '#334155',
      accent: '#60a5fa'
    },
    {
      name: 'Sudut Meja Kerja Kamar.jpg',
      caption: 'Dedicated study desk area dengan rak buku built-in',
      type: 'bedroom',
      bg1: '#27272a',
      bg2: '#3f3f46',
      accent: '#fb923c'
    }
  ],
  bathroom: [
    {
      name: 'Kamar Mandi Utama En-Suite.jpg',
      caption: 'Dilengkapi bathtub freestanding marmer dan rain shower premium',
      type: 'bathroom',
      bg1: '#134e4a',
      bg2: '#115e59',
      accent: '#2dd4bf'
    },
    {
      name: 'Area Vanity & Cermin LED.jpg',
      caption: 'Wastafel ganda dengan kabinet penyimpanan kayu kedap air',
      type: 'bathroom',
      bg1: '#1e293b',
      bg2: '#0f172a',
      accent: '#38bdf8'
    }
  ]
};

export function getSampleCategories(): PhotoCategory[] {
  return INITIAL_CATEGORIES.map(cat => {
    const samples = SAMPLE_PROPERTIES_DATA[cat.id] || [];
    return {
      ...cat,
      photos: samples.map((sample, idx) => ({
        id: `sample-${cat.id}-${idx + 1}-${Date.now()}`,
        url: createPropertySvg(
          `${cat.label}: ${sample.name.replace('.jpg', '')}`,
          sample.caption,
          { bg1: sample.bg1, bg2: sample.bg2, accent: sample.accent },
          sample.type
        ),
        name: sample.name,
        size: 1024 * 1024 * (1.2 + idx * 0.4),
        width: 1920,
        height: 1080,
        uploadedAt: new Date(Date.now() - (idx * 3600000)).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
        caption: sample.caption
      }))
    };
  });
}
