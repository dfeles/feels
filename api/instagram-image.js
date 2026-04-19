export default async function handler(req, res) {
  const { url } = req.query
  if (!url) return res.status(400).json({ error: 'Missing url param' })

  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
      },
    })
    const html = await response.text()
    const match = html.match(/<meta property="og:image" content="([^"]+)"/)
    if (!match) return res.status(404).json({ error: 'No image found' })

    const image = match[1].replace(/&amp;/g, '&')
    res.setHeader('Cache-Control', 's-maxage=86400')
    res.json({ image })
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
}
