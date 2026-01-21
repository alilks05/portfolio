"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type GalleryItem =
  | { type: "image"; src: string; alt?: string; fit?: "contain" | "cover" }
  | { type: "video"; src: string; poster?: string };

export default function AutoScrollGallery({
  items,
  photoHoldMs = 2000,
  videoMaxMs = 6000,
  width = 640,
  height = 360,
}: {
  items: GalleryItem[];
  photoHoldMs?: number;
  videoMaxMs?: number;
  width?: number;
  height?: number;
}) {
  const safeItems = useMemo(() => items.filter(Boolean), [items]);
  const [index, setIndex] = useState(0);

  const timerRef = useRef<number | null>(null);

  const current = safeItems[index % Math.max(safeItems.length, 1)];

  const clearTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const goNext = () => {
    if (safeItems.length <= 1) return;
    setIndex((i) => (i + 1) % safeItems.length);
  };

  // Schedule advance based on type
  useEffect(() => {
    clearTimer();
    if (!current) return;

    if (current.type === "image") {
      timerRef.current = window.setTimeout(goNext, photoHoldMs);
    } else {
      // video: force-advance after videoMaxMs in case it's long
      timerRef.current = window.setTimeout(goNext, videoMaxMs);
    }

    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, current?.type, (current as any)?.src, photoHoldMs, videoMaxMs]);
  if (!safeItems.length) return null;

  return (
    <div className="asg-one" style={{ width, height }}>
      {current.type === "image" ? (
        <img
        key={current.src}
        className={`asg-one-media image ${current.fit === "contain" ? "is-contained" : ""}`}
        src={current.src}
        alt={current.alt ?? "Project photo"}
        loading="lazy"
      />
      
      
      ) : (
        <video
          key={current.src}
          className="asg-one-media video"
          src={current.src}
          poster={current.poster}
          autoPlay
          muted
          playsInline
          preload="metadata"
          onEnded={goNext}
        />
      )}
    </div>
  );
  
  
}
