import React from 'react';

interface WayfindingPreviewProps {
  type: 'entrance' | 'platform' | 'train' | 'transfer' | 'exit';
  stationName?: string;
  label?: string;
}

export const WayfindingPreviewSVG: React.FC<WayfindingPreviewProps> = ({
  type,
  stationName = 'Riverside',
  label = 'WAYFINDING MAP',
}) => {
  return (
    <div className="relative w-full rounded-2xl bg-[#EBF0EC] border border-[#D5DFD7] p-3 overflow-hidden">
      <div className="flex items-center justify-between text-[10px] font-semibold tracking-wider text-[#4E6155] mb-2 px-1">
        <span>{label}</span>
        <span className="font-mono-tabular text-[#2F523E]">{stationName}</span>
      </div>

      <svg
        viewBox="0 0 320 140"
        className="w-full h-36 rounded-xl bg-[#F6F8F6] border border-[#DCE5DE]"
        role="img"
        aria-label={`Wayfinding visual artifact for ${stationName}`}
      >
        <defs>
          <pattern id="calmGrid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M 16 0 L 0 0 0 16" fill="none" stroke="#E8EEEA" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="320" height="140" fill="url(#calmGrid)" />

        {type === 'entrance' && (
          <g>
            {/* Architectural station footprint */}
            <rect x="20" y="16" width="280" height="108" rx="12" fill="#FFFFFF" stroke="#C5D3C8" strokeWidth="1.5" />
            {/* West stairs dimmed out */}
            <g opacity="0.35">
              <rect x="34" y="30" width="48" height="36" rx="6" fill="#E8ECE9" stroke="#9BA89E" />
              <line x1="42" y1="39" x2="74" y2="39" stroke="#7A8B80" strokeWidth="2" />
              <line x1="42" y1="47" x2="74" y2="47" stroke="#7A8B80" strokeWidth="2" />
              <line x1="42" y1="55" x2="74" y2="55" stroke="#7A8B80" strokeWidth="2" />
            </g>
            {/* Step-free tactile route path */}
            <path
              d="M 256 106 L 256 56 L 166 56"
              fill="none"
              stroke="#2F523E"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="6 5"
            />
            <circle cx="256" cy="106" r="8" fill="#2F523E" />
            <circle cx="256" cy="106" r="14" fill="#2F523E" opacity="0.15" />
            <text x="205" y="112" fontSize="9" fontWeight="700" fill="#2F523E">
              East Lift Entrance
            </text>

            {/* Lift & Wide Gate Node */}
            <rect x="106" y="30" width="84" height="52" rx="10" fill="#EBF3ED" stroke="#2F523E" strokeWidth="2" />
            <circle cx="130" cy="56" r="11" fill="#2F523E" />
            <path d="M 126 56 L 134 56 M 130 52 L 130 60" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
            <text x="164" y="53" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1C2621">
              Lift
            </text>
            <text x="164" y="65" textAnchor="middle" fontSize="8" fill="#3B6998">
              Blue Line
            </text>
          </g>
        )}

        {type === 'platform' && (
          <g>
            {/* Blue Line Track graphic */}
            <rect x="16" y="14" width="288" height="26" rx="6" fill="#DCE9F6" stroke="#9BBCE0" />
            <line x1="24" y1="27" x2="296" y2="27" stroke="#3B6998" strokeWidth="2" strokeDasharray="10 6" />
            <circle cx="70" cy="27" r="5" fill="#3B6998" />
            <circle cx="250" cy="27" r="5" fill="#3B6998" />
            <text x="160" y="30" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E3A56">
              PLATFORM 2 · BLUE LINE
            </text>

            {/* Platform Deck */}
            <rect x="16" y="46" width="288" height="78" rx="10" fill="#FFFFFF" stroke="#C5D3C8" strokeWidth="1.5" />
            {/* Tactile safety line */}
            <line x1="24" y1="53" x2="296" y2="53" stroke="#E0A948" strokeWidth="3.5" strokeDasharray="6 3" />

            {/* Lift Box */}
            <rect x="32" y="66" width="66" height="44" rx="8" fill="#EBF3ED" stroke="#2F523E" strokeWidth="1.5" />
            <text x="65" y="87" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2F523E">Lift</text>
            <text x="65" y="99" textAnchor="middle" fontSize="8" fill="#4E6155">Step-free</text>

            {/* Guided arrow */}
            <path d="M 106 88 L 190 88" fill="none" stroke="#2F523E" strokeWidth="3" strokeDasharray="4 3" />
            <polygon points="188,83 198,88 188,93" fill="#2F523E" />

            {/* Quiet Zone Pod */}
            <rect x="204" y="64" width="84" height="48" rx="8" fill="#F0F6F2" stroke="#2F523E" strokeWidth="1.5" />
            <text x="246" y="86" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2F523E">Quiet Zone</text>
            <text x="246" y="98" textAnchor="middle" fontSize="8" fill="#4E6155">Car 1 & 6</text>
          </g>
        )}

        {type === 'train' && (
          <g>
            {/* Visual 4-car train density diagram */}
            <text x="160" y="24" textAnchor="middle" fontSize="9" fontWeight="700" fill="#4E6155">
              LIVE CARRIAGE DENSITY
            </text>
            {/* Car 1 */}
            <rect x="20" y="38" width="66" height="54" rx="8" fill="#EBF3ED" stroke="#2F523E" strokeWidth="2" />
            <circle cx="38" cy="56" r="4" fill="#2F523E" />
            <circle cx="52" cy="56" r="4" fill="#2F523E" opacity="0.35" />
            <text x="53" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2F523E">Car 1 · Calm</text>

            {/* Car 2 */}
            <rect x="94" y="38" width="62" height="54" rx="8" fill="#FFFFFF" stroke="#C5D3C8" />
            <circle cx="110" cy="56" r="4" fill="#7A8B80" />
            <circle cx="124" cy="56" r="4" fill="#7A8B80" />
            <circle cx="138" cy="56" r="4" fill="#7A8B80" />
            <text x="125" y="78" textAnchor="middle" fontSize="8" fill="#5C6B61">Car 2 · Med</text>

            {/* Car 3 */}
            <rect x="164" y="38" width="62" height="54" rx="8" fill="#FFFFFF" stroke="#C5D3C8" />
            <circle cx="180" cy="56" r="4" fill="#7A8B80" />
            <circle cx="194" cy="56" r="4" fill="#7A8B80" />
            <circle cx="208" cy="56" r="4" fill="#7A8B80" />
            <text x="195" y="78" textAnchor="middle" fontSize="8" fill="#5C6B61">Car 3 · Med</text>

            {/* Car 6 */}
            <rect x="234" y="38" width="66" height="54" rx="8" fill="#EBF3ED" stroke="#2F523E" strokeWidth="2" />
            <circle cx="254" cy="56" r="4" fill="#2F523E" />
            <text x="267" y="78" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2F523E">Car 6 · Lift</text>

            {/* Track rail */}
            <line x1="16" y1="104" x2="304" y2="104" stroke="#B8C6BC" strokeWidth="3" strokeLinecap="round" />
            <text x="160" y="122" textAnchor="middle" fontSize="9" fontWeight="600" fill="#2F523E">
              Level boarding · Arrives in 4 min
            </text>
          </g>
        )}

        {type === 'transfer' && (
          <g>
            <rect x="22" y="24" width="96" height="92" rx="10" fill="#E6EFF8" stroke="#5A87B8" strokeWidth="1.5" />
            <circle cx="70" cy="54" r="10" fill="#3B6998" />
            <text x="70" y="57" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">B</text>
            <text x="70" y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1E3A56">Blue Line</text>
            <text x="70" y="95" textAnchor="middle" fontSize="8" fill="#476785">Platform 2</text>

            <path d="M 124 70 L 194 70" fill="none" stroke="#2F523E" strokeWidth="3.5" strokeDasharray="5 4" />
            <polygon points="192,65 200,70 192,75" fill="#2F523E" />
            <text x="160" y="58" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2F523E">40m Flat</text>

            <rect x="202" y="24" width="96" height="92" rx="10" fill="#EBF3ED" stroke="#2F523E" strokeWidth="1.5" />
            <circle cx="250" cy="54" r="10" fill="#2F523E" />
            <text x="250" y="57" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">G</text>
            <text x="250" y="82" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1F3A2C">Green Line</text>
            <text x="250" y="95" textAnchor="middle" fontSize="8" fill="#4E6155">Platform 3</text>
          </g>
        )}

        {type === 'exit' && (
          <g>
            <rect x="24" y="24" width="272" height="92" rx="10" fill="#FFFFFF" stroke="#C5D3C8" strokeWidth="1.5" />
            <rect x="42" y="44" width="84" height="52" rx="8" fill="#F2F6F3" stroke="#9EB2A4" />
            <text x="84" y="68" textAnchor="middle" fontSize="9" fontWeight="700" fill="#2F523E">North Lift</text>
            <text x="84" y="81" textAnchor="middle" fontSize="8" fill="#5C6B61">Concourse</text>

            <path d="M 134 70 L 186 70" fill="none" stroke="#2F523E" strokeWidth="3" />
            <polygon points="184,65 194,70 184,75" fill="#2F523E" />

            <rect x="196" y="44" width="82" height="52" rx="8" fill="#EBF3ED" stroke="#2F523E" strokeWidth="2" />
            <text x="237" y="68" textAnchor="middle" fontSize="10" fontWeight="700" fill="#2F523E">Exit 2</text>
            <text x="237" y="81" textAnchor="middle" fontSize="8" fill="#4E6155">Street Level</text>
          </g>
        )}
      </svg>
    </div>
  );
};

/* Visual Metro Route Line Schematic Artifact */
export const RouteMapArtifact: React.FC<{
  origin?: string;
  transfer?: string;
  destination?: string;
}> = ({
  origin = 'Riverside',
  transfer = 'Green Park',
  destination = 'Central',
}) => (
  <div className="p-3.5 rounded-2xl bg-[#E9F0F6] border border-[#CEDCE9]">
    <svg
      viewBox="0 0 300 68"
      className="w-full h-16"
      role="img"
      aria-label={`${origin} to ${transfer} to ${destination} transit diagram`}
    >
      {/* Blue Line segment */}
      <line x1="40" y1="28" x2="150" y2="28" stroke="#3B6998" strokeWidth="5" strokeLinecap="round" />
      {/* Green Line segment */}
      <line x1="150" y1="28" x2="260" y2="28" stroke="#2F523E" strokeWidth="5" strokeLinecap="round" />

      {/* Origin node */}
      <circle cx="40" cy="28" r="8" fill="#FFFFFF" stroke="#3B6998" strokeWidth="3" />
      <text x="40" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1E3A56">
        {origin.replace(' Station', '')}
      </text>

      {/* Transfer node */}
      <circle cx="150" cy="28" r="9" fill="#FFFFFF" stroke="#1C2621" strokeWidth="3" />
      <circle cx="150" cy="28" r="3.5" fill="#2F523E" />
      <text x="150" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1C2621">
        {transfer}
      </text>

      {/* Destination node */}
      <circle cx="260" cy="28" r="8" fill="#2F523E" stroke="#FFFFFF" strokeWidth="2" />
      <text x="260" y="54" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#1F3A2C">
        {destination.replace(' Station', '')}
      </text>

      {/* Line labels */}
      <text x="95" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#3B6998">
        BLUE LINE
      </text>
      <text x="205" y="15" textAnchor="middle" fontSize="8" fontWeight="700" fill="#2F523E">
        GREEN LINE
      </text>
    </svg>
  </div>
);

/* Visual Concourse Quiet Places Map Artifact */
export const QuietZoneMapArtifact: React.FC = () => (
  <div className="p-3 rounded-2xl bg-[#EBF3ED] border border-[#CBE0D1] mb-3">
    <svg
      viewBox="0 0 300 92"
      className="w-full h-24 rounded-xl bg-white border border-[#DCE5DE]"
      role="img"
      aria-label="Station quiet zones and assistance map"
    >
      <rect x="12" y="12" width="110" height="68" rx="8" fill="#F2F7F4" stroke="#2F523E" strokeWidth="1.5" />
      <circle cx="34" cy="36" r="8" fill="#2F523E" />
      <text x="34" y="39" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">Q</text>
      <text x="66" y="62" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1F3A2C">
        Quiet Lounge
      </text>

      <rect x="134" y="12" width="74" height="68" rx="8" fill="#F4F6F8" stroke="#9BBCE0" strokeWidth="1.5" />
      <circle cx="171" cy="36" r="8" fill="#3B6998" />
      <text x="171" y="39" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">i</text>
      <text x="171" y="62" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#1E3A56">
        Help Point
      </text>

      <rect x="218" y="12" width="70" height="68" rx="8" fill="#FDF6E9" stroke="#E2C38B" strokeWidth="1.5" />
      <circle cx="253" cy="36" r="8" fill="#8C5811" />
      <text x="253" y="39" textAnchor="middle" fontSize="8" fontWeight="700" fill="#FFFFFF">+</text>
      <text x="253" y="62" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#6E440B">
        Desk
      </text>
    </svg>
  </div>
);

/* Visual Audio Waveform Artifact for Voice Guidance */
export const AudioWaveArtifact: React.FC<{ active: boolean; volume: number }> = ({
  active,
  volume,
}) => {
  const heights = [14, 24, 34, 20, 38, 28, 18, 32, 22, 14];
  const scale = active ? Math.max(0.4, volume / 100) : 0.25;
  return (
    <div className="p-3.5 rounded-2xl bg-[#EBF3ED] border border-[#CBE0D1] mb-3 flex items-center justify-between">
      <div>
        <p className="text-xs font-bold text-[#1C2621]">
          {active ? 'Voice Active' : 'Voice Muted'}
        </p>
        <p className="text-[11px] text-[#4E6155] font-mono-tabular">
          Level · {volume}%
        </p>
      </div>
      <div className="flex items-center gap-1 h-10 px-2" aria-hidden="true">
        {heights.map((h, i) => (
          <span
            key={i}
            className="w-1.5 rounded-full bg-[#2F523E] transition-all"
            style={{ height: `${Math.round(h * scale)}px` }}
          />
        ))}
      </div>
    </div>
  );
};
