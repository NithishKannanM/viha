import React from 'react';
import logoOriginal from '../../assets/image.png';
import logoGreen from '../../assets/VIHA_FINAL_LOGO_2.avif';
import { useTheme } from '../ThemeContext';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const { theme } = useTheme();

  const sizeClass = size === 'sm' ? 'h-16 md:h-20' : size === 'lg' ? 'h-32 md:h-48' : 'h-24 md:h-32';

  // 'maroon' uses the original logo; 'green' and 'logo-green-maroon' both use the new AVIF logo
  const src = theme === 'maroon' ? logoOriginal : logoGreen;
  const alt = theme === 'maroon' ? 'Viha Logo' : 'Viha Logo (Green)';

  return (
    <div className={`flex flex-col items-center justify-center select-none ${className}`}>
      <img src={src} alt={alt} className={`${sizeClass} object-contain`} />
    </div>
  );
}
