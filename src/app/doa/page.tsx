import { db } from '@/lib/db/index'
import { doas, categories } from '@/lib/db/schema'
import { eq, desc, sql, and, like } from 'drizzle-orm'
import Link from 'next/link'
import { Search, ArrowRight, Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DoaPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; kategori?: string }>
}) {
  const { q, kategori } = await searchParams

  const allCategories = await db.select().from(categories).orderBy(categories.name)

  const conditions = [eq(doas.isActive, true)]
  if (q) conditions.push(
    sql`(${doas.title} ILIKE ${'%' + q + '%'} OR ${doas.latin} ILIKE ${'%' + q + '%'} OR ${doas.translation} ILIKE ${'%' + q + '%'})`
  )
  if (kategori) {
    const cat = await db.select({ id: categories.id }).from(categories).where(eq(categories.slug, kategori)).limit(1)
    if (cat.length > 0) conditions.push(eq(doas.categoryId, cat[0].id))
  }

  const allDoas = await db.select({
    id: doas.id, title: doas.title, slug: doas.slug,
    arabic: doas.arabic, categoryName: categories.name, categorySlug: categories.slug,
  }).from(doas)
    .innerJoin(categories, eq(doas.categoryId, categories.id))
    .where(and(...conditions))
    .orderBy(desc(doas.createdAt))

  return (
    <div className="min-h-screen max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="text-amber-400/60 hover:text-amber-400 text-sm mb-4 inline-block transition-colors">
          ← Beranda
        </Link>
        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-emerald-400 to-amber-300 bg-clip-text text-transparent">
          {q ? `Hasil: "${q}"` : kategori ? allCategories.find(c => c.slug === kategori)?.name : 'Semua Doa'}
        </h1>
        <p className="text-white/40 text-sm mt-1">
          {allDoas.length} doa ditemukan
        </p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <form className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
          <input
            name="q"
            defaultValue={q || ''}
            placeholder="Cari doa, bacaan latin, atau artinya..."
            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
          />
        </form>
        <div className="flex gap-2 overflow-x-auto pb-1" style={{ scrollbarWidth: 'none' }}>
          <Link
            href="/doa"
            className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
              !kategori ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
            }`}
          >
            Semua
          </Link>
          {allCategories.map(cat => (
            <Link
              key={cat.id}
              href={`/doa?kategori=${cat.slug}`}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                kategori === cat.slug ? 'bg-amber-500 text-black' : 'bg-white/5 text-white/60 hover:bg-white/10'
              }`}
            >
              {cat.icon} {cat.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Doa Grid */}
      {allDoas.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-white/40 text-lg">Doa tidak ditemukan</p>
          <p className="text-white/20 text-sm mt-2">Coba kata kunci lain</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {allDoas.map((d) => (
            <Link
              key={d.id}
              href={`/doa/${d.slug}`}
              className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:bg-white/[0.08] hover:border-amber-500/20 transition-all duration-500"
            >
              <div className="text-right mb-3">
                <p className="text-xl font-arabic leading-relaxed text-amber-300/90 line-clamp-2" dir="rtl">
                  {d.arabic.length > 60 ? d.arabic.substring(0, 60) + '...' : d.arabic}
                </p>
              </div>
              <h3 className="font-semibold text-white group-hover:text-amber-400 transition-colors mb-2">
                {d.title}
              </h3>
              <div className="flex items-center justify-between">
                <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  {d.categoryName}
                </span>
                <Download className="w-4 h-4 text-white/20 group-hover:text-amber-400/60 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
