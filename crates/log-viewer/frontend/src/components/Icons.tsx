// Minimal SVG icons in the palette style

interface IconProps {
  size?: number;
  color?: string;
  className?: string;
}

export function ChevronDown({ size = 12, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" class={className}>
      <path d="M3 4.5L6 7.5L9 4.5" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function ChevronRight({ size = 12, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" class={className}>
      <path d="M4.5 3L7.5 6L4.5 9" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function LocationPin({ size = 14, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" class={className}>
      <circle cx="7" cy="5.5" r="2" stroke={color} stroke-width="1.2"/>
      <path d="M7 12C7 12 11 8 11 5.5C11 3.01 9.21 1 7 1C4.79 1 3 3.01 3 5.5C3 8 7 12 7 12Z" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function Flame({ size = 14, color = '#c87878', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" class={className}>
      <path d="M7 1C7 1 4 4.5 4 7.5C4 9.71 5.34 11.5 7 11.5C8.66 11.5 10 9.71 10 7.5C10 4.5 7 1 7 1Z" fill={color} opacity="0.3"/>
      <path d="M7 1C7 1 4 4.5 4 7.5C4 9.71 5.34 11.5 7 11.5C8.66 11.5 10 9.71 10 7.5C10 4.5 7 1 7 1Z" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M7 5C7 5 5.5 7 5.5 8.5C5.5 9.33 6.17 10 7 10C7.83 10 8.5 9.33 8.5 8.5C8.5 7 7 5 7 5Z" fill={color} opacity="0.6"/>
    </svg>
  );
}

export function ListIcon({ size = 14, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" class={className}>
      <path d="M4 3.5H12" stroke={color} stroke-width="1.2" stroke-linecap="round"/>
      <path d="M4 7H12" stroke={color} stroke-width="1.2" stroke-linecap="round"/>
      <path d="M4 10.5H12" stroke={color} stroke-width="1.2" stroke-linecap="round"/>
      <circle cx="2" cy="3.5" r="0.75" fill={color}/>
      <circle cx="2" cy="7" r="0.75" fill={color}/>
      <circle cx="2" cy="10.5" r="0.75" fill={color}/>
    </svg>
  );
}

export function StackIcon({ size = 14, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" class={className}>
      <rect x="2" y="2" width="10" height="3" rx="0.5" stroke={color} stroke-width="1.2"/>
      <rect x="2" y="5.5" width="10" height="3" rx="0.5" stroke={color} stroke-width="1.2"/>
      <rect x="2" y="9" width="10" height="3" rx="0.5" stroke={color} stroke-width="1.2"/>
    </svg>
  );
}

export function CodeIcon({ size = 14, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none" class={className}>
      <path d="M4.5 4L1.5 7L4.5 10" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M9.5 4L12.5 7L9.5 10" stroke={color} stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 2L6 12" stroke={color} stroke-width="1.2" stroke-linecap="round"/>
    </svg>
  );
}

export function ExpandIcon({ size = 12, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" class={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M2 4L6 8L10 4" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function CollapseIcon({ size = 12, color = 'currentColor', className = '' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill="none" class={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <path d="M4 2L8 6L4 10" stroke={color} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}
