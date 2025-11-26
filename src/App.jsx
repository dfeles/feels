import { useState, useEffect } from 'react'
import contentData from './config/content.json'
import { getGitHubImageUrl } from './config/github'
import './App.css'

function App() {
  const [content, setContent] = useState(null)

  useEffect(() => {
    // Load content from JSON file
    setContent(contentData)
  }, [])

  if (!content) {
    return <div className="loading">Loading...</div>
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
                    <a key={j} href={linkData.url} target="_blank" rel="noopener noreferrer" className="bio-link">
                      <strong>{linkText}</strong>
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
    <div className="app">
      <div className="container">
        {/* Intro Section */}
        <div className="intro-section">
          <div className="intro-header">
            <div className="intro-header-left">
              <p className="title"><strong>{content.intro.title}</strong></p>
              <p className="subtitle">{content.intro.subtitle}</p>
            </div>
            <p className="description">{content.intro.description}</p>
          </div>
          <div className="bio-section">
            {content.intro.bioIcon && (
              <img src={getGitHubImageUrl(content.intro.bioIcon)} alt="bio" className="bio-icon" />
            )}
            <div className="bio-content">
              <div className="bio">{renderMarkdown(content.intro.bio, content.intro.bioLink)}</div>
              <p className="name">{content.intro.name}</p>
            </div>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="sections">
          {Object.keys(content.sections).map((sectionKey) => {
            const section = content.sections[sectionKey]

            return (
              <div key={sectionKey} className="section">
                <p className="section-title"><strong>{section.title}</strong></p>
                <div className={`section-content ${sectionKey === 'tech' ? 'tech-grid' : sectionKey === 'art' ? 'art-grid' : ''}`}>
                  {section.items.map((item, index) => {
                    if (sectionKey === 'tech') {
                      const techContent = (
                        <>
                          {item.icon && (
                            <img src={getGitHubImageUrl(item.icon)} alt={item.company} className="tech-icon" />
                          )}
                          <div className="item-content">
                            <p className="item-company"><strong>{item.company}</strong></p>
                            {item.role && <p className="item-role">{item.role}</p>}
                            {item.period && <p className="item-period">{item.period}</p>}
                          </div>
                        </>
                      )

                      return (
                        <a
                          key={index}
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="tech-item"
                        >
                          {techContent}
                        </a>
                      )
                    }

                    if (sectionKey === 'art') {
                      return (
                        <div key={index} className="art-item">
                          {item.image && (
                            <img src={getGitHubImageUrl(item.image)} alt={item.title} className="art-image" />
                          )}
                          <div className="art-content">
                            <p className="item-title"><strong>{item.title}</strong></p>
                            {item.period && <p className="item-period"><strong>{item.period}</strong></p>}
                          </div>
                        </div>
                      )
                    }

                    // thoughts section
                    return (
                      <div key={index} className="section-item thoughts-item">
                        {item.image && (
                          <img src={getGitHubImageUrl(item.image)} alt={item.title} className="thoughts-image" />
                        )}
                        <p className="thoughts-subtitle">{item.title}</p>
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
  )
}

export default App

