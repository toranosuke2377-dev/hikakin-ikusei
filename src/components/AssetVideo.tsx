import { useEffect, useState } from "react";

interface AssetVideoProps {
  assetKey: string;
  className?: string;
}

export function AssetVideo({ assetKey, className }: AssetVideoProps) {
  const [failed, setFailed] = useState(false);

  useEffect(() => setFailed(false), [assetKey]);

  if (failed) return null;

  const source = /\.[a-z0-9]+$/i.test(assetKey) ? assetKey : `${assetKey}.mp4`;

  return (
    <video
      className={className}
      src={`${import.meta.env.BASE_URL}assets/${source}`}
      muted
      autoPlay
      loop
      playsInline
      onError={() => setFailed(true)}
    />
  );
}
