import Link from 'next/link'
import Image from 'next/image'

const logos = [
  { id: 1, name: 'Masjid & Bulan Sabit', file: '/logos/logo1-masjid.svg', desc: 'Klasik — Masjid dengan bulan sabit, kubah emas, nuansa hijau gelap mewah' },
  { id: 2, name: 'Tangan Berdoa', file: '/logos/logo2-tangan.svg', desc: 'Spiritual — Dua tangan terbuka berdoa dengan teks Arab, biru gelap elegan' },
  { id: 3, name: 'Geometric Star', file: '/logos/logo3-geometric.svg', desc: 'Modern — Bintang 8 sudut (Rub el Hizb), teal hijau toska, minimalis' },
  { id: 4, name: 'Tasbih Elegan', file: '/logos/logo4-tasbih.svg', desc: 'Elegan — Manik-manik tasbih melingkar, rose gold, krem classic' },
  { id: 5, name: 'Floral Arabesque', file: '/logos/logo5-floral.svg', desc: 'Natural — Kubah masjid + daun floral, emerald hijau segar, islami' },
]

export default function LogosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-emerald-400 mb-3">Pilih Logo</h1>
          <p className="text-emerald-200/60 text-lg">Mari Berdoa — 5 Konsep Logo. Klik yang lo suka!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {logos.map((logo) => (
            <div
              key={logo.id}
              className="group bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-emerald-500/20 hover:border-emerald-400/60 hover:bg-white/10 transition-all duration-300 cursor-pointer w-full max-w-sm"
            >
              <div className="aspect-square relative mb-4 flex items-center justify-center bg-white/5 rounded-xl p-4">
                <Image
                  src={logo.file}
                  alt={logo.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-contain drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-semibold text-white text-center mb-1">
                #{logo.id} — {logo.name}
              </h3>
              <p className="text-emerald-200/50 text-sm text-center">{logo.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-semibold transition-all"
          >
            ← Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  )
}
