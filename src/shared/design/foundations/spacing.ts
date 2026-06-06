// Apple-style spacing system (8px grid)
export const spacing = {
  xs: 4, // 0.5 units
  sm: 8, // 1 unit
  md: 12, // 1.5 units
  lg: 16, // 2 units (between elements)
  xl: 20, // 2.5 units
  x2: 24, // 3 units (inside containers)
  x3: 32, // 4 units
} as const;

// Semantic aliases matching Apple conventions
export const between = spacing.lg; // 16px - space between elements
export const inside = spacing.x2; // 24px - padding inside containers
