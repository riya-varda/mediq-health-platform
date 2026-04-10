import { useState } from 'react'
import { Calculator } from 'lucide-react'
import { SectionHeader, Disclaimer } from '../components/UI'

const CATEGORIES = [
  { max: 18.5, label: 'Underweight',       color: '#06b6d4', bg: 'rgba(6,182,212,0.1)', advice: 'Consider consulting a nutritionist to gain weight healthily. Focus on nutrient-dense foods.' },
  { max: 25.0, label: 'Normal weight',     color: '#22c55e', bg: 'rgba(34,197,94,0.1)', advice: 'Great! Maintain your healthy weight with balanced diet and regular exercise.' },
  { max: 30.0, label: 'Overweight',        color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', advice: 'Aim for gradual weight loss through diet and 150+ minutes of exercise per week.' },
  { max: 35.0, label: 'Obese (Class I)',   color: '#f97316', bg: 'rgba(249,115,22,0.1)', advice: 'Consult a doctor for a personalized weight management plan.' },
  { max: 40.0, label: 'Obese (Class II)',  color: '#ef4444', bg: 'rgba(239,68,68,0.1)', advice: 'Medical supervision recommended. Consider speaking with a specialist.' },
  { max: 999,  label: 'Obese (Class III)', color: '#dc2626', bg: 'rgba(220,38,38,0.1)', advice: 'Please consult a healthcare professional urgently for medical support.' },
]

function getCategory(bmi) {
  return CATEGORIES.find((c) => bmi < c.max) || CATEGORIES[CATEGORIES.length - 1]
}

export default function BMIPage() {
  const [form, setForm] = useState({ height: '', weight: '', unit: 'metric' })
  const [bmi, setBmi] = useState(null)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const calculate = () => {
    let b
    if (form.unit === 'metric') {
      const h = parseFloat(form.height) / 100
      b = parseFloat(form.weight) / (h * h)
    } else {
      b = (703 * parseFloat(form.weight)) / (parseFloat(form.height) ** 2)
    }
    if (!isNaN(b) && b > 0) setBmi(Math.round(b * 10) / 10)
  }

  const category = bmi ? getCategory(bmi) : null
  const pct = bmi ? Math.min(100, Math.max(0, ((bmi - 10) / 40) * 100)) : 0

  return (
    <div>
      <SectionHeader title="BMI Calculator" subtitle="Calculate your Body Mass Index and understand what it means for your health" />

      <div className="card p-5 space-y-4">
        {/* Unit toggle */}
        <div className="flex gap-2">
          {['metric', 'imperial'].map((u) => (
            <button
              key={u}
              onClick={() => setForm((f) => ({ ...f, unit: u, height: '', weight: '' }))}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition capitalize ${
                form.unit === u ? 'btn-primary' : 'btn-ghost'
              }`}
            >
              {u} {u === 'metric' ? '(kg/cm)' : '(lb/in)'}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label">
              Height {form.unit === 'metric' ? '(cm)' : '(inches)'}
            </label>
            <input
              type="number"
              value={form.height}
              onChange={update('height')}
              placeholder={form.unit === 'metric' ? 'e.g. 170' : 'e.g. 67'}
              className="input-base"
            />
          </div>
          <div>
            <label className="label">
              Weight {form.unit === 'metric' ? '(kg)' : '(lbs)'}
            </label>
            <input
              type="number"
              value={form.weight}
              onChange={update('weight')}
              placeholder={form.unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
              className="input-base"
            />
          </div>
        </div>

        <button onClick={calculate} disabled={!form.height || !form.weight} className="btn-primary w-full justify-center py-3">
          <Calculator size={16} /> Calculate BMI
        </button>
      </div>

      {bmi && category && (
        <div className="card p-6 mt-5 fade-in">
          {/* BMI Score */}
          <div className="text-center mb-6">
            <div className="text-5xl font-display font-bold mb-2" style={{ color: category.color }}>{bmi}</div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold" style={{ background: category.bg, color: category.color }}>
              {category.label}
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="h-3 rounded-full overflow-hidden" style={{ background: 'linear-gradient(90deg, #06b6d4 0%, #22c55e 30%, #f59e0b 55%, #f97316 75%, #ef4444 100%)' }}>
              <div className="relative h-full">
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white border-2 shadow-md transition-all duration-700"
                  style={{ left: `${pct}%`, transform: 'translate(-50%, -50%)', borderColor: category.color }}
                />
              </div>
            </div>
            <div className="flex justify-between text-[10px] text-slate-400 mt-1.5">
              <span>10</span><span>18.5</span><span>25</span><span>30</span><span>40+</span>
            </div>
          </div>

          {/* Category table */}
          <div className="grid grid-cols-1 gap-1.5 mb-5">
            {CATEGORIES.map((c) => (
              <div key={c.label} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-all ${bmi < c.max && (CATEGORIES.indexOf(c) === 0 || bmi >= CATEGORIES[CATEGORIES.indexOf(c)-1]?.max) ? 'ring-1' : ''}`}
                style={{
                  background: c.label === category.label ? c.bg : 'transparent',
                  ringColor: c.color,
                  border: c.label === category.label ? `1px solid ${c.color}40` : '1px solid transparent'
                }}>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ background: c.color }} />
                  <span style={{ color: c.label === category.label ? c.color : undefined }} className={c.label === category.label ? 'font-semibold' : 'text-slate-500 dark:text-slate-400'}>{c.label}</span>
                </div>
                <span className="text-slate-400">&lt; {c.max === 999 ? '∞' : c.max}</span>
              </div>
            ))}
          </div>

          {/* Advice */}
          <div className="p-3 rounded-xl text-sm" style={{ background: category.bg }}>
            <span className="font-semibold" style={{ color: category.color }}>💡 Advice: </span>
            <span className="text-slate-600 dark:text-slate-300">{category.advice}</span>
          </div>

          <Disclaimer />
        </div>
      )}
    </div>
  )
}
