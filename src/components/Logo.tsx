import React from 'react';
import logoGreen from '../../assets/VIHA_FINAL_LOGO_2.avif';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClass = size === 'sm' ? 'h-16 md:h-20' : size === 'lg' ? 'h-32 md:h-48' : 'h-24 md:h-32';
  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img src={logoGreen} alt="Viha" className={`${sizeClass} object-contain`} />
    </div>
  );
}
