import { useState, useEffect } from 'react'
import axios from 'axios'
import Alphabet from './Alphabet'
import Words from './Words'
import Assessment from './Assessment'
import './App.css'

function App() {
  const [childId, setChildId] = useState('')
  const [completed, setCompleted] = useState([])
  const [view, setView] = useState('alphabets')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadProgress()
  }, [])

  const loadProgress = async () => {
    setLoading(true)
    try {
      const res = await axios.get(`http://localhost:5000/api/progress/${childId}`)
      setCompleted(res.data.completed || [])
    } catch (err) {
      console.error('Load error:', err)
      setCompleted([])
    }
    setLoading(false)
  }

  const updateProgress = async (item) => {
    const newCompleted = completed.includes(item) ? completed : [...completed, item]
    setCompleted(newCompleted)
    try {
      await axios.post(`http://localhost:5000/api/progress/${childId}`, { 
        completed: newCompleted 
      })
    } catch (err) {
      console.error('Save error:', err)
    }
  }

  if (loading) return <div className="app">Loading...</div>

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎈 Learn Letters & Words 🎈</h1>
        <p className="app-subtitle">Fun learning for all kids!</p>
        <div className="header-controls">
          <input
            className="child-id-input"
            value={childId}
            onChange={(e) => setChildId(e.target.value)}
            placeholder="Add your name"
          />
          <button className="reload-btn" onClick={loadProgress}>🔄 Reload</button>
        </div>
      </header>
      
      <nav className="tabs">
        <button className={view === 'alphabets' ? 'active' : ''} 
                onClick={() => setView('alphabets')}>
          🔤 A-Z Letters
        </button>
        <button className={view === 'words' ? 'active' : ''} 
                onClick={() => setView('words')}>
          📚 Words
        </button>
        <button className={view === 'assessment' ? 'active' : ''} 
                onClick={() => setView('assessment')}>
          📝 Assessment
        </button>
        <button className={view === 'progress' ? 'active' : ''} 
                onClick={() => setView('progress')}>
          🏆 Progress ({completed.length})
        </button>
      </nav>
      
      <main>
        {view === 'alphabets' && <Alphabet completed={completed} onComplete={updateProgress} />}
        {view === 'words' && <Words completed={completed} onComplete={updateProgress} />}
        {view === 'assessment' && <Assessment completed={completed} onComplete={updateProgress} />}
        {view === 'progress' && (
          <div className="progress">
            <h2 className="progress-title">🎉 You've Learned {completed.length} Things!</h2>
            <div className="progress-items">
              {completed.length > 0 ? (
                completed.map((item, i) => (
                  <div key={i} className="progress-badge">{item}</div>
                ))
              ) : (
                <p className="progress-empty">Start learning to see your progress! 🚀</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
