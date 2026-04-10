import { useState } from 'react'
import { MapPin, Search, ExternalLink } from 'lucide-react'
import { SectionHeader } from '../components/UI'

const EMERGENCY_NUMBERS = [
  { country: '🇮🇳 India',     numbers: ['112 (Emergency)', '102 (Ambulance)', '104 (Health)'] },
  { country: '🇺🇸 USA',       numbers: ['911 (Emergency)', '988 (Mental Health)'] },
  { country: '🇬🇧 UK',        numbers: ['999 (Emergency)', '111 (Non-urgent NHS)'] },
  { country: '🇦🇺 Australia', numbers: ['000 (Emergency)', '13 11 26 (Crisis)'] },
]

export default function HospitalsPage() {
  const [location, setLocation] = useState('')
  const [mapSrc, setMapSrc] = useState('')
  const [mapsLink, setMapsLink] = useState('')
  const [locating, setLocating] = useState(false)
  const [coords, setCoords] = useState(null)

  const search = () => {
    if (!location.trim()) return
    const q = encodeURIComponent(`hospital near ${location}`)
    // OpenStreetMap Nominatim embed via iframe
    setMapSrc(`https://www.openstreetmap.org/export/embed.html?bbox=-0.1,51.4,0.1,51.6&layer=mapnik`)
    // Use OSM search link as fallback for user to open
    const osmSearch = `https://www.openstreetmap.org/search?query=hospital+near+${encodeURIComponent(location)}`
    setMapsLink(osmSearch)
    // Also provide Google Maps link (no API key needed for regular link)
    const gmLink = `https://www.google.com/maps/search/hospitals+near+${encodeURIComponent(location)}`
    setMapsLink(gmLink)
  }

  const useMyLocation = () => {
    if (!navigator.geolocation) { alert('Geolocation not supported.'); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocating(false)
        setCoords({ lat: latitude, lng: longitude })
        // OSM embed centered on user location with hospitals layer
        const delta = 0.03
        const bbox = `${longitude - delta},${latitude - delta},${longitude + delta},${latitude + delta}`
        setMapSrc(`https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude},${longitude}`)
        setMapsLink(`https://www.google.com/maps/search/hospitals/@${latitude},${longitude},14z`)
      },
      () => { setLocating(false); alert('Unable to access your location. Please enter it manually.') }
    )
  }

  return (
    <div>
      <SectionHeader title="Find Nearby Hospitals" subtitle="Locate hospitals, clinics, and emergency care centers near you" />

      <div className="card p-5 mb-4 space-y-3">
        <div className="flex gap-2 flex-wrap">
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
            placeholder="Enter city, area, or landmark..."
            className="input-base flex-1 min-w-48"
          />
          <button onClick={search} disabled={!location.trim()} className="btn-primary">
            <Search size={16} /> Search
          </button>
          <button onClick={useMyLocation} disabled={locating} className="btn-outline">
            <MapPin size={16} /> {locating ? 'Locating…' : 'Use My Location'}
          </button>
        </div>

        <div className="text-xs text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
          <strong>ℹ️ Using OpenStreetMap</strong> — No API key required. Map shows your location area.
          {mapsLink && (
            <span className="ml-2">
              <a href={mapsLink} target="_blank" rel="noreferrer" className="underline font-semibold inline-flex items-center gap-1">
                Open full hospital search <ExternalLink size={11} />
              </a>
            </span>
          )}
        </div>
      </div>

      {/* Map */}
      {mapSrc ? (
        <div className="card overflow-hidden p-0 mb-4">
          <iframe
            src={mapSrc}
            width="100%" height="460"
            style={{ border: 'none', display: 'block' }}
            allowFullScreen loading="lazy"
            title="Hospitals Map"
          />
          {mapsLink && (
            <div className="p-3 text-center border-t border-slate-200 dark:border-slate-700">
              <a href={mapsLink} target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                <ExternalLink size={14} /> Open full hospital search on Google Maps
              </a>
            </div>
          )}
        </div>
      ) : (
        <div className="card p-12 mb-4 flex flex-col items-center justify-center text-center border-2 border-dashed border-slate-200 dark:border-slate-700 bg-transparent">
          <div className="text-5xl mb-4">🏥</div>
          <div className="font-semibold text-slate-600 dark:text-slate-300 mb-1">Map will appear here</div>
          <div className="text-sm text-slate-400 max-w-xs">Search for a location or click "Use My Location" to find nearby hospitals</div>
        </div>
      )}

      {/* Emergency numbers */}
      <div className="card p-5">
        <div className="font-semibold text-slate-800 dark:text-slate-100 mb-4">🆘 Emergency Helplines</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {EMERGENCY_NUMBERS.map(({ country, numbers }) => (
            <div key={country} className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900 rounded-xl p-3">
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">{country}</div>
              {numbers.map((n) => (
                <div key={n} className="text-sm font-bold text-red-600 dark:text-red-400">{n}</div>
              ))}
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-400 dark:text-slate-500 mt-3">
          Always call emergency services immediately for life-threatening situations. Do not rely solely on this app in emergencies.
        </p>
      </div>
    </div>
  )
}
