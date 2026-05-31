import { useState } from 'react'
import artifacts from './artifacts/index.js'

const lessons = artifacts.filter(a => a.type === 'lesson')
const games = artifacts.filter(a => a.type === 'game')

const GAMES_PICKER = '__games__'

function GamePicker({ onSelect }) {
  return (
    <div className="picker-stage">
      <div className="picker-header">
        <h2>Math Games</h2>
        <p>Pick a game to play</p>
      </div>
      <div className="picker-grid">
        {games.map(game => (
          <button key={game.id} className="picker-card" onClick={() => onSelect(game.id)}>
            <div className="picker-card-name">{game.name}</div>
            {game.description && (
              <div className="picker-card-desc">{game.description}</div>
            )}
            <div className="picker-card-cta">Play →</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default function App() {
  const [activeId, setActiveId] = useState(lessons[0]?.id ?? GAMES_PICKER)

  const activeArtifact = artifacts.find(a => a.id === activeId)
  const ActiveComponent = activeArtifact?.component ?? null
  const showPicker = activeId === GAMES_PICKER

  return (
    <div className="app-shell">
      <nav className="sidebar">
        <div className="sidebar-header">
          <h1>Ma-ricculum</h1>
        </div>

        <div className="nav-section">
          <div className="section-label">Unit Lessons</div>
          <ul className="artifact-list">
            {lessons.map(lesson => (
              <li key={lesson.id}>
                <button
                  className={`artifact-btn ${lesson.id === activeId ? 'active' : ''}`}
                  onClick={() => setActiveId(lesson.id)}
                >
                  <span className="artifact-name">{lesson.name}</span>
                  {lesson.description && (
                    <span className="artifact-desc">{lesson.description}</span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="nav-section">
          <div className="section-label">Math Games</div>
          <ul className="artifact-list">
            <li>
              <button
                className={`artifact-btn ${showPicker || games.some(g => g.id === activeId) ? 'active' : ''}`}
                onClick={() => setActiveId(GAMES_PICKER)}
              >
                <span className="artifact-name">All Games</span>
                <span className="artifact-desc">{games.length} games available</span>
              </button>
            </li>
            {(showPicker || games.some(g => g.id === activeId)) && games.map(game => (
              <li key={game.id}>
                <button
                  className={`artifact-btn artifact-btn-sub ${game.id === activeId ? 'active' : ''}`}
                  onClick={() => setActiveId(game.id)}
                >
                  <span className="artifact-name">{game.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="artifact-stage">
        {showPicker ? (
          <GamePicker onSelect={setActiveId} />
        ) : ActiveComponent ? (
          <ActiveComponent />
        ) : (
          <div className="empty-state">
            <p>No artifacts yet. Add one to <code>public/artifacts/</code>.</p>
          </div>
        )}
      </main>
    </div>
  )
}
