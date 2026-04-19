import { useState, useEffect } from 'react'

export function InstagramImage({ url, alt }) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    fetch(`/api/instagram-image?url=${encodeURIComponent(url)}`)
      .then(r => r.json())
      .then(d => d.image && setImage(d.image))
      .catch(() => {})
  }, [url])

  if (!image) return null
  return <img src={image} alt={alt} className="w-full h-[200px] object-cover" />
}
