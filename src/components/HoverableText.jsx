import { useState, useEffect } from 'react'

/**
 * A reusable component that displays an image overlay when hovering over text
 * 
 * @param {string} image - Path to the image to display on hover
 * @param {string} imageWidth - Width of the overlay image (default: '400px')
 * @param {string} className - Additional CSS classes for the text span
 * @param {React.ReactNode} children - The text content to make hoverable
 */
export function HoverableText({ 
  image, 
  imageWidth = '400px', 
  imageHeight = null,
  className = 'text-[#0099ff] cursor-pointer hover:underline',
  children 
}) {
  const [showOverlay, setShowOverlay] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    if (showOverlay) {
      window.addEventListener('mousemove', handleMouseMove)
      return () => window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [showOverlay])

  const getOverlayPosition = () => {
    const width = parseInt(imageWidth) || 400
    const height = imageHeight ? parseInt(imageHeight) : Math.floor(width * 0.75) // Default aspect ratio
    const offset = 20
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    let left = mousePosition.x + offset
    let top = mousePosition.y + offset

    // Prevent overflow on right edge
    if (left + width > windowWidth) {
      left = mousePosition.x - width - offset
    }

    // Prevent overflow on bottom edge
    if (top + height > windowHeight) {
      top = mousePosition.y - height - offset
    }

    // Prevent overflow on left edge
    if (left < 0) {
      left = offset
    }

    // Prevent overflow on top edge
    if (top < 0) {
      top = offset
    }

    return { left, top }
  }

  if (!image) {
    return <span className={className}>{children}</span>
  }

  return (
    <>
      <span
        className={className}
        onMouseEnter={() => setShowOverlay(true)}
        onMouseLeave={() => setShowOverlay(false)}
      >
        {children}
      </span>
      {showOverlay && (
        <div
          className="fixed pointer-events-none z-50 transition-opacity duration-200"
          style={{
            left: `${getOverlayPosition().left}px`,
            top: `${getOverlayPosition().top}px`,
            transform: 'translate(0, 0)'
          }}
        >
          <img
            src={image}
            alt=""
            className="h-auto object-cover rounded shadow-lg"
            style={{
              width: imageWidth,
              height: imageHeight || 'auto'
            }}
          />
        </div>
      )}
    </>
  )
}

