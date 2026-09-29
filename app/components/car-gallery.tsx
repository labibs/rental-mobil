"use client";

import { useState } from "react";

export function CarGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const current = images[active] ?? images[0];

  return (
    <>
      <div className="detail-hero" data-testid="detail-hero">
        <img src={current} alt={name} />
        {images.length > 1 && (
          <span className="gallery-counter" data-testid="gallery-counter">
            {active + 1} / {images.length}
          </span>
        )}
      </div>
      {images.length > 1 && (
        <div className="thumb-row" data-testid="gallery-thumbs">
          {images.map((image, index) => (
            <button
              type="button"
              key={`${image}-${index}`}
              className={index === active ? "active" : ""}
              onClick={() => setActive(index)}
              aria-label={`Foto ${index + 1}`}
              data-testid={`gallery-thumb-${index}`}
            >
              <img src={image} alt={`Galeri ${name} ${index + 1}`} />
            </button>
          ))}
        </div>
      )}
    </>
  );
}
