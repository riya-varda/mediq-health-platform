import { useState } from 'react'
import { TriangleAlert } from 'lucide-react'
import { askClaude } from '../api'
import { SectionHeader, Disclaimer, ErrorBanner, LoadingDots } from '../components/UI'

const FIELDS = [
  { key: 'smoking',   label: 'Smoking Status',  type: 'select', options: ['Non-smoker', 'Occasional smoker', 'Regular smoker', 'Ex-smoker'] },
  { key: 'exercise',  label: 'Exercise Level',  type: 'select', options: ['Sedentary (none)', 'Light (1-2x/week)', 'Moderate (3-4x/week)', 'Active (5+x/week)'] },
  { key: 'diet',      label: 'Diet Quality',    type: 'select', options: ['Poor (mostly junk food)', 'Average (mixed)', 'Good (mostly healthy)', 'Excellent (very balanced)'] },
  { key: 'sleep',     label: 'Avg Sleep (hrs)', type: 'number', placeholder: '7' },
  { key: 'stress',    label: 'Stress Level',    type: 'select', options: ['Low', 'Moderate', 'High', 'Severe'] },
  { key: 'alcohol',   label: 'Alcohol Intake',  type: 'select', options: ['None', 'Occasional', 'Moderate (weekly)', 'Heavy (daily)'] },
  { key: 'water',     label: 'Daily Water Intake', type: 'select', options: ['Less than 4 glasses', '4-6 glasses', '6-8 glasses', '8+ glasses'] },
  { key: 'checkup',   label: 'Health Checkups', type: 'select', options: ['Never', 'Every few years', 'Yearly', 'More frequently'] },
]

function ScoreGauge({ score }) {
  const pct = (score / 10) * 100
  const color = score <= 3 ? '#22c55e' : score <= 6 ? '#f59e0b' : '#ef4444'
  const riskLabel = score <= 3 ? 'Low Risk' : score <= 6 ? 'Moderate Risk' : 'High Risk'
  const riskBg = score <= 3
    ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
    : score <= 6
    ? 'bg-yellow-50 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800'
    : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'

  return (
    <div className="card p-6 text-center mb-5">
      <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">Your Health Risk Score</div>

      {/* Circular-ish display */}
      <div className="relative inline-flex items-center justify-center mb-3">
        <svg width="140" height="80" viewBox="0 0 140 80">
          <path d="M 10 75 A 60 60 0 0 1 130 75" fill="none" stroke="#e2e8f0" strokeWidth="12" strokeLinecap="round" />
          <path
            d="M 10 75 A 60 60 0 0 1 130 75"
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={`${pct * 1.885} 188.5`}
            style={{ transition: 'stroke-dasharray 0.8s ease' }}
          />
          <text x="70" y="65" textAnchor="middle" fontSize="32" fontWeight="700" fill={color}>{score}</text>
          <text x="70" y="78" textAnchor="middle" fontSize="10" fill="#94a3b8">/10</text>
        </svg>
      </div>

      <div className={`inline-block px-4 py-1 rounded-full text-sm font-semibold border ${riskBg}`}>
        {riskLabel}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        {[['1–3', 'Low', '#22c55e'], ['4–6', 'Moderate', '#f59e0b'], ['7–10', 'High', '#ef4444']].map(([range, label, c]) => (
          <div key={label} className="text-center">
            <div className="font-semibold" style={{ color: c }}>{range}</div>
            <div className="text-slate-400">{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function RiskPage() {
  const [form, setForm] = useState({
    age: '', gender: '',
    smoking: '', exercise: '', diet: '', sleep: '7',
    stress: '', alcohol: '', water: '', checkup: '',
    conditions: '',
  })
  const [result, setResult] = useState('')
  const [score, setScore] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const calculate = async () => {
    setLoading(true)
    setResult('')
    setScore(null)
    setError('')
    try {
      const prompt = `Calculate a comprehensive health risk score for the following individual:

Age: ${form.age}
Gender: ${form.gender}
Smoking: ${form.smoking}
Exercise: ${form.exercise}
Diet: ${form.diet}
Sleep: ${form.sleep} hours/night
Stress level: ${form.stress}
Alcohol intake: ${form.alcohol}
Daily water intake: ${form.water}
Health checkups: ${form.checkup}
Existing medical conditions: ${form.conditions || 'None'}

Based on these lifestyle factors and health inputs, provide:

1. **Health Risk Score: X/10** (where 1 = very low risk, 10 = very high risk) — clearly state this on its own line
2. **Risk Category**: Low / Moderate / High
3. **Top Risk Factors** (what is contributing most to the score)
4. **Protective Factors** (what the person is doing well)
5. **Personalized Lifestyle Recommendations** (specific, actionable steps to reduce risk)
6. **Priority Actions** (the 3 most important things to change first)

Be honest but encouraging. Format with clear sections and bullet points.`

      const r = await askClaude([{ role: 'user', content: prompt }])
      const match = r.match(/[\d.]+\s*\/\s*10/)
      if (match) {
        const raw = parseFloat(match[0])
        setScore(Math.min(10, Math.max(1, Math.round(raw * 10) / 10)))
      }
      setResult(r)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <SectionHeader title="Health Risk Score" subtitle="Get a personalized AI health risk assessment based on your lifestyle" />

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Age *</label>
            <input type="number" value={form.age} onChange={update('age')} placeholder="e.g. 30" className="input-base" />
          </div>
          <div>
            <label className="label">Gender *</label>
            <select value={form.gender} onChange={update('gender')} className="input-base">
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          {FIELDS.map(({ key, label, type, options, placeholder }) => (
            <div key={key}>
              <label className="label">{label}</label>
              {type === 'select' ? (
                <select value={form[key]} onChange={update(key)} className="input-base">
                  <option value="">Select</option>
                  {options.map((o) => <option key={o}>{o}</option>)}
                </select>
              ) : (
                <input type="number" value={form[key]} onChange={update(key)} placeholder={placeholder} className="input-base" />
              )}
            </div>
          ))}
        </div>

        <div>
          <label className="label">Existing Medical Conditions</label>
          <input value={form.conditions} onChange={update('conditions')} placeholder="e.g. none, hypertension, type 2 diabetes" className="input-base" />
        </div>

        <button onClick={calculate} disabled={loading || !form.age || !form.gender} className="btn-primary w-full justify-center py-3">
          {loading ? <><LoadingDots /> Calculating...</> : <><TriangleAlert size={16} /> Calculate My Risk Score</>}
        </button>
      </div>

      <ErrorBanner message={error} />

      {score !== null && <ScoreGauge score={score} />}

      {result && (
        <div className="card p-5 fade-in">
          <div className="font-semibold text-slate-800 dark:text-slate-100 mb-3">📊 Detailed Risk Analysis</div>
          <div className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{result}</div>
          <Disclaimer />
        </div>
      )}
    </div>
  )
}
