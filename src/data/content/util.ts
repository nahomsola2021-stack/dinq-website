/**
 * Content utility functions for Dinq Tour, Travel & Events
 */

/**
 * Splits bullet string like "Wildlife • Culture • Community" or "A · B · C" into string array
 */
export function splitBullets(str: string): string[] {
  if (!str) return [];
  return str
    .split(/[•·|]/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Formats currency amount in USD
 */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}
