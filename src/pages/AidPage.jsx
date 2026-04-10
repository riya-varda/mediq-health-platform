import { useState } from 'react'
import { Zap, Search } from 'lucide-react'
import { askClaude } from '../api'
import { SectionHeader, ResultBox, Disclaimer, ErrorBanner, EmergencyBanner, LoadingDots } from '../components/UI'

const EMERGENCIES = [
  { label: '🔥 Burns', topic: 'burns' },
  { label: '🩸 Cuts & Wounds', topic: 'cuts and wounds' },
  { label: '😮 Choking', topic: 'choking' },
  { label: '💫 Fainting', topic: 'fainting or unconsciousness' },
  { label: '🦴 Fractures', topic: 'bone fractures' },
  { label: '👃 Nosebleed', topic: 'nosebleed' },
  { label: '❤️ Heart Attack', topic: 'suspected heart attack' },
  { label: '🤧 Allergic Reaction', topic: 'severe allergic reaction or anaphylaxis' },
  { label: '⚡ Seizure', topic: 'seizure or epileptic fit' },
  { label: '💧 Drowning', topic: 'drowning or near-drowning' },
  { label: '🌡️ Heat Stroke', topic: 'heat stroke or heat exhaustion' },
  { label: '🐍 Snake Bite', topic: 'snake bite' },
]

export default function AidPage() {
  const [activeTopic, setActiveTopic] = useState('')
  const [custom, setCustom] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const getGuide = async (topicOverride) => {
    const topic = topicOverride || custom.trim()
    if (!topic) return
    setActiveTopic(topic)
    setLoading(true)
    setResult('')
    setError('')

    try {
      const prompt = `Provide a clear, step-by-step first aid guide for: **${topic}**

Structure your response EXACTLY as follows:

🚨 IMMEDIATE STEPS (What to do RIGHT NOW)
[Numbered list of immediate actions, most critical first]

⛔ THINGS TO AVOID
[Bullet list of what NOT to do — common mistakes that can make things worse]

🏥 WHEN TO CALL EMERGENCY SERVICES
[Specific signs/symptoms that require calling 112/911 or going to the ER immediately]

💡 ADDITIONAL TIPS
[Any other helpful information for recovery or prevention]

Be clear, concise, and actionable. This is for someone in an emergency situation.`

      const r = await askClaude([{ role: 'user', content: prompt }])
      setResult(r)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <SectionHeader title="First Aid Guide" subtitle="Get immediate, step-by-step AI-powered first aid instructions for any emergency" />

      <EmergencyBanner />

      {/* Common emergencies */}
      <div className="card p-5 mb-4">
        <div className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-3">Select an emergency:</div>
        <div className="flex flex-wrap gap-2">
          {EMERGENCIES.map(({ label, topic }) => (
            <button
              key={topic}
              onClick={() => getGuide(topic)}
              className={`btn-ghost text-xs py-1.5 ${
                activeTopic === topic
                  ? 'bg-brand-50 dark:bg-brand-900/30 border-brand-400 dark:border-brand-600 text-brand-600 dark:text-brand-400'
                  : ''
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Custom search */}
      <div className="flex gap-2 mb-4">
        <input
          value={custom}
          onChange={(e) => setCustom(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && getGuide()}
          placeholder="Or type a custom emergency situation..."
          className="input-base flex-1"
        />
        <button onClick={() => getGuide()} disabled={!custom.trim() || loading} className="btn-primary px-4">
          <Search size={16} />
        </button>
      </div>

      <ErrorBanner message={error} />

      {loading && (
        <div className="card p-8 text-center mt-2">
          <LoadingDots />
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3">Loading first aid guide...</p>
        </div>
      )}

      {result && !loading && (
        <ResultBox title={`🩺 First Aid: ${activeTopic.charAt(0).toUpperCase() + activeTopic.slice(1)}`} content={result}>
          <Disclaimer />
        </ResultBox>
      )}
    </div>
  )
}
