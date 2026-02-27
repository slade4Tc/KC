'use client';

import { useState } from 'react';

interface Props extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
}

export function ImageWithFallback({ alt, className, src, ...props }: Props) {
  const [failed, setFailed] = useState(false);

  return (
    <img
      {...props}
      src={failed ? '/placeholder-card.svg' : src}
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
