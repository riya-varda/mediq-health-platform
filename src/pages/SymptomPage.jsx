import { useState } from 'react'
import { Search } from 'lucide-react'
import { askClaude } from '../api'
import { SectionHeader, ResultBox, Disclaimer, ErrorBanner, LoadingDots } from '../components/UI'

const SEVERITIES = {
  mild:     { label: 'Mild',     color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800' },
  moderate: { label: 'Moderate', color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800' },
  severe:   { label: 'Severe',   color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800' },
}

export default function SymptomPage() {
  const [form, setForm] = useState({ age: '', gender: '', symptoms: '', duration: '', conditions: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const submit = async () => {
    setLoading(true)
    setResult('')
    setError('')
    try {
      const prompt = `Analyze the following patient symptoms and provide a structured health assessment:

Patient Information:
- Age: ${form.age}
- Gender: ${form.gender}
- Symptoms: ${form.symptoms}
- Duration: ${form.duration}
- Existing Medical Conditions: ${form.conditions || 'None reported'}

Please provide a detailed analysis with clearly labeled sections:
1. **Symptom Summary** – Brief overview of the reported symptoms
2. **Possible Conditions** – List 3-5 possible conditions (most likely first)
3. **Severity Level** – Assess as Mild, Moderate, or Severe and explain why
4. **Recommended Actions** – What the patient should do now
5. **When to Seek Immediate Medical Help** – Red flag symptoms to watch for

Be clear, organized, and empathetic. Use bullet points where helpful.`

      const r = await askClaude([{ role: 'user', content: prompt }])
      setResult(r)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  const isValid = form.age && form.gender && form.symptoms.trim()

  return (
    <div>
      <SectionHeader title="Symptom Checker" subtitle="Describe your symptoms and get an AI-powered health analysis" />

      <div className="card p-5 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Age *</label>
            <input type="number" value={form.age} onChange={update('age')} placeholder="e.g. 28" className="input-base" />
          </div>
          <div>
            <label className="label">Gender *</label>
            <select value={form.gender} onChange={update('gender')} className="input-base">
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
              <option>Prefer not to say</option>
            </select>
          </div>
        </div>

        <div>
          <label className="label">Symptoms * <span className="font-normal text-slate-400">(describe in detail)</span></label>
          <textarea
            value={form.symptoms}
            onChange={update('symptoms')}
            placeholder="e.g. I have a persistent headache for 2 days, mild fever around 99°F, and feel fatigued..."
            rows={4}
            className="input-base resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">Duration of Symptoms</label>
            <input value={form.duration} onChange={update('duration')} placeholder="e.g. 2 days, 1 week" className="input-base" />
          </div>
          <div>
            <label className="label">Existing Medical Conditions</label>
            <input value={form.conditions} onChange={update('conditions')} placeholder="e.g. diabetes, hypertension" className="input-base" />
          </div>
        </div>

        <button onClick={submit} disabled={!isValid || loading} className="btn-primary w-full justify-center py-3">
          {loading ? (
            <>Analyzing symptoms<LoadingDots /></>
          ) : (
            <><Search size={16} /> Analyze My Symptoms</>
          )}
        </button>
      </div>

      <ErrorBanner message={error} />

      {result && (
        <ResultBox title="📋 Health Analysis Results" content={result}>
          <Disclaimer />
        </ResultBox>
      )}
    </div>
  )
}
