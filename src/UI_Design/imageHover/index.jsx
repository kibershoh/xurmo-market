import React, { useState } from 'react';

const ImageHoverZoom = ({ src, alt, hoverSrc }) => {
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e) => {
    setHoverPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      <img
        src={isHovering ? hoverSrc : src}
        alt={alt}
        width={100}
        height={200}
        style={{
          transition: 'transform 0.3s',
          transform: isHovering ? 'scale(2)' : 'scale(1)',
          position: 'absolute',
          top: hoverPosition.y,
          left: hoverPosition.x,
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
};

export default ImageHoverZoom;
