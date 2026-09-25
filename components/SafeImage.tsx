"use client";

import { useEffect, useState } from "react";

type Props = {
  src?: string | null;
  alt?: string;
  fallback?: string;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/**
 * Remote catalogue artwork is not guaranteed to stay available.
 * This wrapper prevents broken-image icons and avoids an error loop when the
 * fallback itself is the current source.
 */
export default function SafeImage({
  src,
  alt = "",
  fallback = "/artwork-fallback.svg",
  fill = false,
  className = "",
  sizes,
  priority = false,
}: Props) {
  const safeSrc = src?.trim() || fallback;
  const [current, setCurrent] = useState(safeSrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrent(safeSrc);
    setFailed(false);
  }, [safeSrc]);

  return (
    <img
      src={current}
      alt={alt}
      className={className}
      sizes={sizes}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => {
        if (!failed && current !== fallback) {
          setFailed(true);
          setCurrent(fallback);
        }
      }}
      style={fill ? { position: "absolute", inset: 0, width: "100%", height: "100%" } : undefined}
    />
  );
}
