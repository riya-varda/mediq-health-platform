import { useState } from 'react'
import { Pill, ClipboardPaste } from 'lucide-react'
import { askClaude } from '../api'
import { SectionHeader, ResultBox, Disclaimer, ErrorBanner, LoadingDots } from '../components/UI'

const EXAMPLES = [
  `Tab Amoxicillin 500mg TDS x 5 days\nTab Paracetamol 650mg SOS\nSyp Cetirizine 5ml BD\nTab Omeprazole 20mg OD before food`,
  `Metformin 500mg twice daily with meals\nAmlodipine 5mg once daily\nAtorvastatin 10mg at bedtime`,
]

export default function RxPage() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const explain = async () => {
    setLoading(true)
    setResult('')
    setError('')
    try {
      const prompt = `A patient has shared the following prescription or medical report. Please explain it in simple, easy-to-understand language:

${text}

For each medicine or instruction, provide:
1. **Medicine Name** – What it is
2. **Purpose** – What condition it treats or what it's for
3. **How to Take It** – Dosage, timing, with/without food
4. **Common Side Effects** – What to watch out for
5. **Important Precautions** – What to avoid while taking it

Use simple language a non-medical person can understand. Format clearly with each medicine as a separate section.`

      const r = await askClaude([{ role: 'user', content: prompt }])
      setResult(r)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  return (
    <div>
      <SectionHeader title="Prescription Explainer" subtitle="Paste your prescription or medical report and get a plain-language explanation" />

      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Paste your prescription or medical report</label>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your prescription here..."
            rows={7}
            className="input-base resize-none font-mono text-xs"
          />
        </div>

        <div>
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Try an example:</div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLES.map((ex, i) => (
              <button key={i} onClick={() => setText(ex)} className="btn-ghost text-xs py-1">
                <ClipboardPaste size={12} /> Example {i + 1}
              </button>
            ))}
          </div>
        </div>

        <button onClick={explain} disabled={loading || !text.trim()} className="btn-primary">
          {loading ? <><LoadingDots /> Explaining...</> : <><Pill size={16} /> Explain Prescription</>}
        </button>
      </div>

      <ErrorBanner message={error} />

      {result && (
        <ResultBox title="💊 Prescription Explained" content={result}>
          <Disclaimer />
        </ResultBox>
      )}
    </div>
  )
}
