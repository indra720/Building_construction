import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatCurrencyINR(num, compact = false) {
  if (num === null || num === undefined || isNaN(num)) return '₹0';
  
  if (compact) {
    const val = Number(num);
    if (Math.abs(val) >= 10000000) {
      return `₹${(val / 10000000).toFixed(2).replace(/\.00$/, '')} Cr`;
    }
    if (Math.abs(val) >= 100000) {
      return `₹${(val / 100000).toFixed(2).replace(/\.00$/, '')} Lakh`;
    }
  }

  const parts = Math.round(Number(num)).toString().split('.');
  let lastThree = parts[0].substring(parts[0].length - 3);
  const otherNumbers = parts[0].substring(0, parts[0].length - 3);
  if (otherNumbers !== '') {
    lastThree = ',' + lastThree;
  }
  const formatted = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
  return `₹${formatted}`;
}

export function formatDate(dateInput) {
  if (!dateInput) return '';
  const d = new Date(dateInput);
  if (isNaN(d.getTime())) return String(dateInput);
  
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const day = String(d.getDate()).padStart(2, '0');
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day} ${month} ${year}`;
}

export function calcGST(qty, rate, gstPercent = 18) {
  const quantity = parseFloat(qty) || 0;
  const unitRate = parseFloat(rate) || 0;
  const taxable = quantity * unitRate;
  const gstAmount = (taxable * (parseFloat(gstPercent) || 0)) / 100;
  const total = taxable + gstAmount;
  return {
    taxable,
    gstAmount,
    total
  };
}
