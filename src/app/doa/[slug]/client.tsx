'use client'
import { useState, useRef } from 'react'
import { Download, Loader2, ImageIcon, Check } from 'lucide-react'

interface Props {
  title: string
  arabic: string
  latin: string
  translation: string
  source?: string
  background?: 'emerald' | 'amber' | 'navy' | 'rose'
}

const BG_GRADIENTS: Record<string, string> = {
  emerald: 'from-emerald-900 via-emerald-800 to-emerald-950',
  amber: 'from-amber-900 via-amber-800 to-amber-950',
  navy: 'from-blue-950 via-slate-900 to-blue-950',
  rose: 'from-rose-900 via-rose-800 to-rose-950',
}

const BG_PATTERNS: Record<string, string> = {
  emerald: 'bg-[radial-gradient(ellipse_at_top,rgba(52,211,153,0.05),transparent_60%)]',
  amber: 'bg-[radial-gradient(ellipse_at_top,rgba(251,191,36,0.05),transparent_60%)]',
  navy: 'bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.05),transparent_60%)]',
  rose: 'bg-[radial-gradient(ellipse_at_top,rgba(251,113,133,0.05),transparent_60%)]',
}

export default function DoaDetailClient(props: Props) {
  const [bg, setBg] = useState<string>('emerald')
  const [generating, setGenerating] = useState(false)
  const [downloaded, setDownloaded] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleDownload = async () => {
    if (!cardRef.current) return
    setGenerating(true)
    try {
      const { toPng } = await import('html-to-image')
      const dataUrl = await toPng(cardRef.current, {
        quality: 1,
        pixelRatio: 2,
        backgroundColor: '#0a0a0a',
      })
      const link = document.createElement('a')
      link.download = `${props.title.toLowerCase().replace(/\s+/g, '-')}.png`
      link.href = dataUrl
      link.click()
      setDownloaded(true)
      setTimeout(() => setDownloaded(false), 3000)
    } catch (err) {
      console.error('Download error:', err)
    }
    setGenerating(false)
  }

  return (
    <div>
      {/* Background Selector */}
      <div className="mb-4">
        <h3 className="text-xs font-semibold text-amber-400/60 uppercase tracking-wider mb-3">Pilih Background</h3>
        <div className="flex gap-2">
          {Object.keys(BG_GRADIENTS).map(key => (
            <button
              key={key}
              onClick={() => setBg(key)}
              className={`w-10 h-10 rounded-full border-2 transition-all ${
                bg === key ? 'border-amber-400 scale-110' : 'border-white/10 hover:border-white/30'
              }`}
            >
              <div className={`w-full h-full rounded-full bg-gradient-to-br ${BG_GRADIENTS[key]}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Preview Card */}
      <div
        ref={cardRef}
        className={`relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-br ${BG_GRADIENTS[bg]} ${BG_PATTERNS[bg]}`}
        style={{ width: '100%', aspectRatio: '1/1', maxWidth: '500px' }}
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' viewBox=\'0 0 40 40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M20 0v40M0 20h40\'/%3E%3C/g%3E%3C/svg%3E")' }} />
        
        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center p-8 text-center">
          {/* Bismillah */}
          <div className="text-lg sm:text-xl font-arabic text-white/30 mb-6" dir="rtl">
            ﷽
          </div>

          {/* Arabic */}
          <p className="text-2xl sm:text-3xl font-arabic leading-[2.2] text-amber-200/90 mb-6 px-4" dir="rtl">
            {props.arabic}
          </p>

          {/* Latin */}
          <p className="text-sm text-white/70 italic mb-4 px-4 max-w-md">
            {props.latin}
          </p>

          {/* Translation */}
          <p className="text-xs text-white/50 leading-relaxed px-4 max-w-sm">
            {props.translation}
          </p>

          {/* Source */}
          {props.source && (
            <p className="text-[10px] text-emerald-400/50 mt-4">
              {props.source}
            </p>
          )}

          {/* Footer */}
          <div className="absolute bottom-4 left-0 right-0 text-center">
            <p className="text-[9px] text-white/10">mariberdoa.com</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={generating}
        className="w-full flex items-center justify-center gap-2 py-3 px-6 bg-amber-500 text-black font-semibold rounded-xl hover:bg-amber-400 disabled:opacity-50 transition-all shadow-lg shadow-amber-500/20"
      >
        {generating ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Menyiapkan...</>
        ) : downloaded ? (
          <><Check className="w-4 h-4" /> Tersimpan!</>
        ) : (
          <><Download className="w-4 h-4" /> Download Gambar</>
        )}
      </button>
      <p className="text-xs text-white/20 text-center mt-2">
        Gambar siap dibagikan ke WhatsApp, Instagram, atau dipajang
      </p>
    </div>
  )
}
