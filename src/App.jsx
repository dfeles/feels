import { useState, useEffect } from 'react'
import contentData from './config/content.json'
import { getGitHubImageUrl } from './config/github'
import { DevOverlay } from 'mindone'
import { HoverableText } from './components/HoverableText'
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
              <p className="name">Daniel Feles</p>
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
                          {item.image && (
                            <img src={getGitHubImageUrl(item.image)} alt={item.title} className="w-full h-[200px] object-cover" />
                          )}
                          <div className="flex flex-col gap-0">
                            <p className="art-item-title"><strong>{item.title}</strong></p>
                            {item.period && <p className="art-item-period">{item.period}</p>}
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

