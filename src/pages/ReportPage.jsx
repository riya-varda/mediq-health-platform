import { useState } from 'react'
import { FileText, Download, User, Calendar, Stethoscope } from 'lucide-react'
import { jsPDF } from 'jspdf'
import { askClaude } from '../api'
import { SectionHeader, Disclaimer, ErrorBanner, LoadingDots } from '../components/UI'

export default function ReportPage() {
  const [form, setForm] = useState({ name: '', age: '', gender: '', symptoms: '', conditions: '', medications: '', bloodGroup: '', allergies: '' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const generate = async () => {
    setLoading(true)
    setResult('')
    setError('')
    try {
      const reportDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
      const prompt = `Generate a comprehensive, professional clinical health report for:

PATIENT INFORMATION:
- Name: ${form.name || 'Anonymous Patient'}
- Age: ${form.age} years
- Gender: ${form.gender}
- Blood Group: ${form.bloodGroup || 'Not specified'}
- Known Allergies: ${form.allergies || 'None reported'}
- Report Date: ${reportDate}

CLINICAL DETAILS:
- Chief Complaint / Symptoms: ${form.symptoms}
- Medical History / Existing Conditions: ${form.conditions || 'None reported'}
- Current Medications: ${form.medications || 'None reported'}

Write a FORMAL CLINICAL REPORT with these exact numbered sections:

1. EXECUTIVE SUMMARY
(2-3 sentence overview of the patient's current health status)

2. SYMPTOM ANALYSIS
(Detailed breakdown of reported symptoms, onset, and pattern)

3. DIFFERENTIAL DIAGNOSIS
(List 3-5 possible conditions in order of likelihood with brief clinical reasoning for each)

4. SEVERITY ASSESSMENT
(Classify as: MILD / MODERATE / SEVERE — with clinical justification and scoring)

5. RECOMMENDED INVESTIGATIONS
(Specific tests, labs, or imaging recommended — e.g., CBC, CRP, chest X-ray)

6. TREATMENT RECOMMENDATIONS
(Suggested pharmacological and non-pharmacological interventions)

7. RED FLAG SYMPTOMS
(Specific warning signs that require immediate emergency care)

8. LIFESTYLE & PREVENTIVE ADVICE
(Personalized recommendations for diet, exercise, sleep, and stress management)

9. FOLLOW-UP PLAN
(Suggested timeline for review appointments and monitoring)

10. MEDICAL DISCLAIMER
(Standard clinical disclaimer about AI-generated reports)

Format as a formal medical document. Use clinical but understandable language. Be thorough and specific.`

      const r = await askClaude([{ role: 'user', content: prompt }])
      setResult(r)
    } catch (e) {
      setError(e.message)
    }
    setLoading(false)
  }

  const downloadPDF = () => {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' })
    const pageW = doc.internal.pageSize.getWidth()
    const pageH = doc.internal.pageSize.getHeight()
    const marginL = 20
    const marginR = 20
    const contentW = pageW - marginL - marginR
    let y = 0

    const addPage = () => {
      doc.addPage()
      y = 20
      // Page border
      doc.setDrawColor(220, 230, 245)
      doc.setLineWidth(0.5)
      doc.rect(10, 10, pageW - 20, pageH - 20)
    }

    const checkPageBreak = (needed = 10) => {
      if (y + needed > pageH - 20) {
        addPage()
        return true
      }
      return false
    }

    // ── Page 1 Header ──────────────────────────────────────────
    // Top accent bar
    doc.setFillColor(15, 40, 90)
    doc.rect(0, 0, pageW, 36, 'F')

    // Accent line
    doc.setFillColor(79, 142, 247)
    doc.rect(0, 36, pageW, 3, 'F')

    // Logo text
    doc.setTextColor(255, 255, 255)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('MediQ', marginL, 20)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(180, 200, 240)
    doc.text('AI-Powered Health Intelligence Platform', marginL, 28)
    doc.text('mediq.health  ·  Powered by Gemini AI', pageW - marginR, 24, { align: 'right' })

    // Report title block
    y = 48
    doc.setFillColor(240, 246, 255)
    doc.roundedRect(marginL, y, contentW, 28, 3, 3, 'F')
    doc.setDrawColor(200, 220, 250)
    doc.setLineWidth(0.5)
    doc.roundedRect(marginL, y, contentW, 28, 3, 3, 'S')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(14)
    doc.setTextColor(15, 40, 90)
    doc.text('CLINICAL HEALTH ASSESSMENT REPORT', pageW / 2, y + 11, { align: 'center' })
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(100, 130, 170)
    doc.text('AI-Generated · For Informational Purposes Only · Not a Substitute for Professional Medical Advice', pageW / 2, y + 20, { align: 'center' })

    y += 36

    // Patient Info Section
    doc.setFillColor(248, 252, 255)
    doc.setDrawColor(210, 225, 245)
    doc.setLineWidth(0.4)
    doc.roundedRect(marginL, y, contentW, 38, 2, 2, 'FD')

    // Section header
    doc.setFillColor(15, 40, 90)
    doc.roundedRect(marginL, y, contentW, 8, 2, 2, 'F')
    doc.rect(marginL, y + 4, contentW, 4, 'F') // bottom corners square
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(255, 255, 255)
    doc.text('PATIENT INFORMATION', marginL + 5, y + 5.5)

    const reportDate = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
    const reportId = `MQ-${Date.now().toString().slice(-8).toUpperCase()}`

    y += 10
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    doc.setTextColor(30, 50, 90)

    const col1x = marginL + 5
    const col2x = marginL + contentW / 2 + 5

    doc.text('Patient Name:', col1x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    doc.text(form.name || 'Anonymous Patient', col1x + 28, y)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 50, 90)
    doc.text('Report Date:', col2x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    doc.text(reportDate, col2x + 25, y)

    y += 7
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 50, 90)
    doc.text('Age / Gender:', col1x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    doc.text(`${form.age || '—'} years  /  ${form.gender || '—'}`, col1x + 28, y)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 50, 90)
    doc.text('Report ID:', col2x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    doc.text(reportId, col2x + 25, y)

    y += 7
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 50, 90)
    doc.text('Blood Group:', col1x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    doc.text(form.bloodGroup || 'Not specified', col1x + 28, y)

    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 50, 90)
    doc.text('Known Allergies:', col2x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    doc.text(form.allergies || 'None reported', col2x + 34, y)

    y += 7
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(30, 50, 90)
    doc.text('Medications:', col1x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(40, 40, 40)
    const medsText = doc.splitTextToSize(form.medications || 'None reported', contentW / 2 - 35)
    doc.text(medsText[0] || '', col1x + 28, y)

    y += 14

    // Report content
    const lines = doc.splitTextToSize(result, contentW - 4)

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      checkPageBreak(7)

      // Section headers (numbered like "1. EXECUTIVE SUMMARY")
      if (/^\d+\.\s+[A-Z]/.test(line.trim())) {
        if (y > 48) y += 4
        checkPageBreak(14)

        // Section header bar
        doc.setFillColor(15, 40, 90)
        doc.roundedRect(marginL, y - 1, contentW, 8, 1, 1, 'F')
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(255, 255, 255)
        doc.text(line.trim(), marginL + 4, y + 4.5)
        y += 12
      } else if (line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*')) {
        // Bullet points
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(50, 60, 80)
        const bulletText = line.trim().replace(/^[•\-\*]\s*/, '')
        doc.setFillColor(79, 142, 247)
        doc.circle(marginL + 3, y - 1, 1, 'F')
        const wrapped = doc.splitTextToSize(bulletText, contentW - 10)
        doc.text(wrapped, marginL + 8, y)
        y += wrapped.length * 5 + 1
      } else if (/^\*\*(.+)\*\*/.test(line.trim()) || /^[A-Z][A-Z\s&/]{5,}:/.test(line.trim())) {
        // Bold labels
        doc.setFont('helvetica', 'bold')
        doc.setFontSize(9)
        doc.setTextColor(15, 40, 90)
        doc.text(line.trim().replace(/\*\*/g, ''), marginL + 2, y)
        y += 5.5
      } else if (line.trim() === '') {
        y += 2.5
      } else {
        doc.setFont('helvetica', 'normal')
        doc.setFontSize(9)
        doc.setTextColor(40, 55, 70)
        doc.text(line, marginL + 2, y)
        y += 5.2
      }
    }

    // Footer on every page
    const totalPages = doc.internal.getNumberOfPages()
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i)

      // Footer bar
      doc.setFillColor(15, 40, 90)
      doc.rect(0, pageH - 14, pageW, 14, 'F')

      doc.setFontSize(7)
      doc.setFont('helvetica', 'normal')
      doc.setTextColor(180, 200, 240)
      doc.text(`MediQ AI Health Report  ·  ${form.name || 'Patient'}  ·  ${reportDate}`, marginL, pageH - 6)
      doc.text(`Page ${i} of ${totalPages}`, pageW - marginR, pageH - 6, { align: 'right' })
      doc.setTextColor(120, 150, 200)
      doc.text('This report is AI-generated and does not replace professional medical diagnosis.', pageW / 2, pageH - 6, { align: 'center' })

      // Page border
      doc.setDrawColor(200, 215, 235)
      doc.setLineWidth(0.3)
      doc.rect(8, 8, pageW - 16, pageH - 16)
    }

    doc.save(`MediQ_Report_${(form.name || 'Patient').replace(/\s+/g, '_')}_${Date.now()}.pdf`)
  }

  return (
    <div>
      <SectionHeader title="Health Report Generator" subtitle="Generate a comprehensive clinical health report powered by Gemini AI" />

      <div className="card p-5 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User size={15} className="text-brand-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Patient Information</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="label">Full Name</label>
            <input value={form.name} onChange={update('name')} placeholder="Your name" className="input-base" />
          </div>
          <div>
            <label className="label">Age *</label>
            <input type="number" value={form.age} onChange={update('age')} placeholder="Age" className="input-base" />
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
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Blood Group</label>
            <select value={form.bloodGroup} onChange={update('bloodGroup')} className="input-base">
              <option value="">Select blood group</option>
              {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => <option key={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Known Allergies</label>
            <input value={form.allergies} onChange={update('allergies')} placeholder="e.g. penicillin, peanuts, none" className="input-base" />
          </div>
        </div>

        <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <Stethoscope size={15} className="text-brand-500" />
          <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Clinical Details</span>
        </div>

        <div>
          <label className="label">Symptoms & Health Concerns *</label>
          <textarea value={form.symptoms} onChange={update('symptoms')} placeholder="Describe all your symptoms in detail (onset, duration, severity, associated symptoms)..." rows={3} className="input-base resize-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Existing Medical Conditions</label>
            <input value={form.conditions} onChange={update('conditions')} placeholder="e.g. none, diabetes, asthma" className="input-base" />
          </div>
          <div>
            <label className="label">Current Medications</label>
            <input value={form.medications} onChange={update('medications')} placeholder="e.g. metformin 500mg, none" className="input-base" />
          </div>
        </div>

        <div className="flex gap-3 flex-wrap">
          <button onClick={generate} disabled={loading || !form.age || !form.symptoms} className="btn-primary">
            {loading ? <><LoadingDots /> Generating Report...</> : <><FileText size={16} /> Generate Report</>}
          </button>
          {result && (
            <button onClick={downloadPDF} className="btn-outline">
              <Download size={16} /> Download PDF
            </button>
          )}
        </div>
      </div>

      <ErrorBanner message={error} />

      {result && (
        <div className="card p-5 mt-5 fade-in">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-brand-500" />
              <div className="font-semibold text-slate-800 dark:text-slate-100">
                Clinical Report — {form.name || 'Patient'}
              </div>
            </div>
            <button onClick={downloadPDF} className="btn-primary py-1.5 text-xs">
              <Download size={14} /> Download PDF
            </button>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-700 pt-4 text-sm text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
            {result}
          </div>
          <Disclaimer />
        </div>
      )}
    </div>
  )
}
