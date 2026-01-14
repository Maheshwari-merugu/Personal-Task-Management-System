import faviconUrl from '/favicon.png?url';

interface AppLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'h-5 w-5',
  md: 'h-6 w-6',
  lg: 'h-8 w-8',
};

export function AppLogo({ className, size = 'md' }: AppLogoProps) {
  return (
    <img 
      src={faviconUrl} 
      alt="TaskFlow" 
      className={`${sizeClasses[size]} ${className || ''}`}
    />
  );
}
