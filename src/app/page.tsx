import Link from 'next/link'
import { db } from '@/lib/db/index'
import { categories, doas } from '@/lib/db/schema'
import { sql, desc, eq } from 'drizzle-orm'
import { Search, Download, BookOpen, ArrowRight, Sparkles } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const allCategories = await db.select().from(categories).orderBy(categories.name)
  const recentDoas = await db.select({
    id: doas.id, title: doas.title, slug: doas.slug,
    arabic: doas.arabic, categoryName: categories.name, categorySlug: categories.slug,
  }).from(doas)
    .innerJoin(categories, eq(doas.categoryId, categories.id))
    .where(eq(doas.isActive, true))
    .orderBy(desc(doas.createdAt))
    .limit(12)

  return (
    <div className="min-h-screen">
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/40 via-[#0a0a0a] to-[#0a0a0a]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,168,83,0.08),transparent_60%)]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />

        <div className="relative z-10 px-4 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            Kumpulan Doa Islam Sehari-hari
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-emerald-400 bg-clip-text text-transparent">
              Mari Berdoa
            </span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-8 leading-relaxed">
            Kumpulan doa sehari-hari lengkap dengan tulisan Arab, bacaan Latin, 
            arti, dan sumber. Download gambar doa aesthetic untuk dibagikan.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <Link
              href="/doa"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black font-semibold rounded-full hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/20"
            >
              <Search className="w-4 h-4" />
              Cari Doa
            </Link>
            <Link
              href="#kategori"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-full hover:bg-white/10 transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Lihat Kategori
            </Link>
          </div>
        </div>

        {/* Decorative bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent" />
      </section>

      {/* ═══ RECENT DOA ═══ */}
      <section className="px-4 max-w-6xl mx-auto mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold">Doa Terbaru</h2>
            <p className="text-white/40 text-sm mt-1">Kumpulan doa pilihan</p>
          </div>
          <Link href="/doa" className="text-sm text-amber-400 hover:text-amber-300 flex items-center gap-1 transition-colors">
            Lihat Semua <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentDoas.map((doa) => (
            <Link
              key={doa.id}
              href={`/doa/${doa.slug}`}
              className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-amber-500/20 transition-all duration-500"
            >
              <div className="text-right mb-3">
                <p className="text-xl font-arabic leading-relaxed text-amber-300/90 line-clamp-2" dir="rtl">
                  {doa.arabic.length > 60 ? doa.arabic.substring(0, 60) + '...' : doa.arabic}
                </p>
              </div>
              <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors mb-2 line-clamp-1">
                {doa.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {doa.categoryName}
                </span>
                <Download className="w-4 h-4 text-white/20 group-hover:text-amber-400/60 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ KATEGORI ═══ */}
      <section id="kategori" className="px-4 max-w-6xl mx-auto mb-20">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold">Kategori Doa</h2>
          <p className="text-white/40 text-sm mt-2">Pilih kategori doa yang kamu cari</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {allCategories.map((cat) => (
            <Link
              key={cat.id}
              href={`/kategori/${cat.slug}`}
              className="group bg-white/5 border border-white/5 rounded-xl p-5 text-center hover:bg-white/[0.08] hover:border-amber-500/20 transition-all"
            >
              <div className="text-3xl mb-2">{cat.icon || '📖'}</div>
              <h3 className="font-medium text-sm text-white group-hover:text-amber-400 transition-colors">
                {cat.name}
              </h3>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="border-t border-white/5 py-8 px-4 text-center">
        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent mb-2">
          Mari Berdoa
        </div>
        <p className="text-white/20 text-xs">Semoga bermanfaat. Aamiin 🤲</p>
      </footer>
    </div>
  )
}
