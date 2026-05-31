import { useState } from 'react'
import artifacts from './artifacts/index.js'

export default function App() {
  const [activeId, setActiveId] = useState(artifacts[0]?.id ?? null)

  const active = artifacts.find(a => a.id === activeId)
  const ActiveComponent = active?.component ?? null

  return (
    <div className="app-shell">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>Ma-ricculum</h1>
          <p>Claude Artifacts</p>
        </div>
        <ul className="artifact-list">
          {artifacts.map(artifact => (
            <li key={artifact.id}>
              <button
                className={`artifact-btn ${artifact.id === activeId ? 'active' : ''}`}
                onClick={() => setActiveId(artifact.id)}
              >
                <span className="artifact-name">{artifact.name}</span>
                {artifact.description && (
                  <span className="artifact-desc">{artifact.description}</span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <main className="artifact-stage">
        {ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="empty-state">
            <p>No artifacts yet. Add one to <code>src/artifacts/</code>.</p>
          </div>
        )}
      </main>
    </div>
  )
}
