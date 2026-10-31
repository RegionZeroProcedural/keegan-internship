import React from 'react'

export default function Countdown({ expiryDate, now }) {
  const calculateCountdown = (expiryDate, now) => {
      const expiry = new Date(expiryDate).getTime();
      const difference = expiry - now;
      if (difference <= 0) return "Expired";
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    };
  return calculateCountdown(expiryDate, now);
}
