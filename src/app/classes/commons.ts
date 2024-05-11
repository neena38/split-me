import { formatCurrency } from '@angular/common';

export function randomBetween(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

export function getCurrencyString(amount: number) {
  return formatCurrency(amount, 'en-US', '₹', 'INR', '1.2-2');
}

export function getHue() {
  return randomBetween(0, 360);
}

export function addbits(s: string): number {
  const regex = /[+\-]?([0-9\.]+)/g;
  const matches = s.replace(/\s/g, '').match(regex) || [];
  let sum = 0;
  for (const val of matches) {
    sum += parseFloat(val);
  }
  return sum;
}

export const profileSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      hue: { type: 'number' },
      name: { type: 'string' },
    },
    required: ['hue', 'name'],
  },
};
