import { useState, useEffect } from 'react'
import contentData from './config/content.json'
import { getGitHubImageUrl } from './config/github'
import { DevOverlay } from 'mindone'
import { HoverableText } from './components/HoverableText'
import { InstagramImage } from './components/InstagramImage'
import { PenroseTiling } from './components/PenroseTiling'
import './App.css'

function App() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    // Load content from JSON file
    setContent(contentData)
  }, [])

  // Common classes for white background cards
  const whiteCardClasses = "w-fit bg-white border-slate-100 border transition-colors flex items-start gap-2.5 p-2.5 no-underline text-[rgb(0,0,238)] text-xs font-normal"

  if (!content) {
    return <div className="flex justify-center items-center min-h-screen text-xs text-gray-600">Loading...</div>
  }

  const renderMarkdown = (text, linkData) => {
    if (!text) return ''
    return text.split('\n').map((line, i) => {
      if (line.includes('**')) {
        const parts = line.split(/(\*\*.*?\*\*)/g)
        return (
          <p key={i}>
            {parts.map((part, j) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                const linkText = part.slice(2, -2)
                // Check if this matches the link text
                if (linkData && linkText === linkData.text) {
                  return (
                    <a key={j} href={linkData.url} target="_blank" rel="noopener noreferrer" className="text-[#0099ff] no-underline hover:underline  pr-4">
                      <strong className="font-bold text-[#0099ff]">{linkText}</strong>
                    </a>
                  )
                }
                return <strong key={j}>{linkText}</strong>
              }
              return part
            })}
          </p>
        )
      }
      return <p key={i}>{line}</p>
    })
  }

  return (
    <>
      <DevOverlay />
      <PenroseTiling />
      <div className="min-h-screen p-2 xl:p-12 lg:p-8 md:p-4 relative z-10">
        <div className="max-w-[1200px] mx-auto">
        {/* Intro Section */}
        <div className="mb-20">
          <div className="flex items-baseline justify-between gap-2 mb-[68px] flex-wrap">
            <div className="flex items-baseline gap-2">
              <p className="title"><strong>{content.intro.title}</strong></p>
              <p className="subtitle">{content.intro.subtitle}</p>
            </div>
            <p className="description">{content.intro.description}</p>
          </div>
          <div className={` ${whiteCardClasses}`}>
            {content.intro.bioIcon && (
              <img src={getGitHubImageUrl(content.intro.bioIcon)} alt="bio" className="w-[68px] h-[68px] object-cover flex-shrink-0" />
            )}
            <div className="flex-1">
              <div className="bio">
                <p>Nothing shook my world quite like <a 
                  href={getGitHubImageUrl('/images/Kitchen_Budapest_2007-2010_2011.pdf')} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline"
                >
                  <HoverableText image={getGitHubImageUrl('/images/kibu.jpg')}>Kitchen Budapest</HoverableText>
                </a> when I first walked in at 17 and got an internship offer.</p>
                <p>I was ready to learn everything.</p>
                <p>This site is my way of summarizing my ride since then.</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="name">Daniel Feles</p>
                <a href="https://www.instagram.com/d.ni37/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="https://x.com/d_ni31" target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex flex-col gap-0">
          {Object.keys(content.sections).map((sectionKey) => {
            const section = content.sections[sectionKey]

            return (
              <div key={sectionKey} className="mb-[60px] rounded">
                <p className="section-title"><strong>{section.title}</strong></p>
                <div className={`block ${sectionKey === 'tech' ? 'tech-grid' : sectionKey === 'art' ? 'art-grid' : ''}`}>
                  {section.items.map((item, index) => {
                    if (sectionKey === 'tech') {
                      const techContent = (
                        <>
                          {item.icon && (
                            item.icon.startsWith('/') ? (
                              <img src={getGitHubImageUrl(item.icon)} alt={item.company} className="w-4 h-4 object-contain aspect-square flex-shrink-0" />
                            ) : (
                              <span className="text-base leading-4 flex-shrink-0 inline-block">{item.icon}</span>
                            )
                          )}
                          <div className="flex flex-col gap-0">
                            <p className="item-company"><strong>{item.company}</strong></p>
                            {item.role && <p className="item-role">{item.role}</p>}
                            {item.period && <p className="item-period">{item.period}</p>}
                          </div>
                        </>
                      )

                      // Use PDF link for Kitchen Budapest instead of Issuu link
                      const isKitchenBudapest = item.company === 'Kitchen Budapest'
                      const linkUrl = isKitchenBudapest 
                        ? getGitHubImageUrl('/images/Kitchen_Budapest_2007-2010_2011.pdf')
                        : item.url

                      return (
                        <a
                          key={index}
                          href={linkUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={` ${whiteCardClasses} hover:border-[rgb(200,200,200)] `}
                        >
                          {techContent}
                        </a>
                      )
                    }

                    if (sectionKey === 'art') {
                      return (
                        <div key={index} className={`flex flex-col gap-2.5 p-2.5 rounded ${whiteCardClasses}`}>
                          {item.instagram && <InstagramImage url={item.instagram} alt={item.title} />}
                          {item.image && (
                            <img src={getGitHubImageUrl(item.image)} alt={item.title} className="w-full h-[200px] object-cover" />
                          )}
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex flex-col gap-0">
                              <p className="art-item-title"><strong>{item.title}</strong></p>
                              {item.period && <p className="art-item-period">{item.period}</p>}
                            </div>
                            {item.instagram && (
                              <a href={item.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70 flex-shrink-0">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="#9ca3af"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                              </a>
                            )}
                          </div>
                        </div>
                      )
                    }

                    // thoughts section
                    return (
                      <div key={index} className={`flex flex-col gap-0 p-2.5 rounded ${whiteCardClasses}`}>
                        <div className="flex flex-col gap-4">
                        {item.image && (
                            <img src={getGitHubImageUrl(item.image)} alt={item.title} className="w-[285px] h-auto object-cover" />
                        )}
                        <p className="thoughts-subtitle">{item.title}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default App

