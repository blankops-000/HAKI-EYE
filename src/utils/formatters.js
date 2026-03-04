export function formatCurrency(amount) {
  return new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatAxisCurrency(value) {
  const amount = Number(value) || 0;
  const absolute = Math.abs(amount);

  if (absolute >= 1000000000) {
    return `${(amount / 1000000000).toFixed(1)}B`;
  }

  if (absolute >= 1000000) {
    return `${(amount / 1000000).toFixed(1)}M`;
  }

  if (absolute >= 1000) {
    return `${(amount / 1000).toFixed(0)}K`;
  }

  return `${amount}`;
}
