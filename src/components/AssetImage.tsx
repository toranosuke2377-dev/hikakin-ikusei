import { useEffect, useState } from "react";

interface AssetImageProps {
  assetKey: string;
  className?: string;
  alt: string;
}

export function AssetImage({ assetKey, className, alt }: AssetImageProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [assetKey]);

  if (failed) return null;

  const source = /\.[a-z0-9]+$/i.test(assetKey) ? assetKey : `${assetKey}.webp`;

  return (
    <img
      className={className}
      src={`${import.meta.env.BASE_URL}assets/${source}`}
      alt={alt}
      onError={() => setFailed(true)}
    />
  );
}
