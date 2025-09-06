import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 

/**
 * Format large numbers into compact string with up to two decimal precision for thousands (K), millions (M), billions (B).
 * Trailing zeros are trimmed: 25.00 -> 25, 35.50 -> 35.5
 * Examples:
 *  950 -> "950"
 *  21590 -> "21.59K"
 *  1250000 -> "1.25M"
 */
export function formatCurrencyShort(value: number | string | undefined): string {
  if (value === undefined || value === null || value === '') return '';
  const num = typeof value === 'string' ? Number(value) : value;
  if (!isFinite(num)) return String(value);

  const abs = Math.abs(num);
  const sign = num < 0 ? '-' : '';

  const trim = (n: number) => {
    const s = n.toFixed(2);
    if (/\.00$/.test(s)) return s.replace(/\.00$/, '');
    return s.replace(/(\.\d)0$/, '$1');
  };

  if (abs >= 1_000_000_000) {
    return `${sign}${trim(abs / 1_000_000_000)}B`;
  }
  if (abs >= 1_000_000) {
    return `${sign}${trim(abs / 1_000_000)}M`;
  }
  if (abs >= 1_000) {
    return `${sign}${trim(abs / 1_000)}K`;
  }
  return `${sign}${trim(abs)}`;
}

export function formatCurrencyWithSymbol(value: number | string | undefined, currency: string = 'INR'): string {
  const symbol = getCurrencySymbol(currency);
  const formattedValue = formatCurrencyShort(value);
  return `${symbol}${formattedValue}`;
}

export function getCurrencySymbol(currency: string = 'INR'): string {
  return currency === 'USD' ? '$' : '₹';
}

export function formatCurrencyRange(range: {min: number; max: number}, currency: string = 'INR'): string {
  const symbol = getCurrencySymbol(currency);
  const minFormatted = formatCurrencyShort(range.min);
  const maxFormatted = formatCurrencyShort(range.max);
  return `${symbol}${minFormatted} - ${symbol}${maxFormatted}`;
}
