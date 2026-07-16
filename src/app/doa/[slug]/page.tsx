import { db } from '@/lib/db/index'
import { doas, categories } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import DoaDetailClient from './client'
import { ArrowLeft } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function DoaDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const doa = await db.select({
    id: doas.id, title: doas.title, slug: doas.slug,
    arabic: doas.arabic, latin: doas.latin, translation: doas.translation,
    source: doas.source, imageUrl: doas.imageUrl,
    categoryName: categories.name, categorySlug: categories.slug,
  }).from(doas)
    .innerJoin(categories, eq(doas.categoryId, categories.id))
    .where(eq(doas.slug, slug))
    .limit(1)

  if (doa.length === 0) notFound()

  const d = doa[0]

  return (
    <div className="min-h-screen max-w-3xl mx-auto px-4 py-8">
      {/* Back */}
      <Link href="/doa" className="inline-flex items-center gap-1.5 text-amber-400/60 hover:text-amber-400 text-sm mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Kembali ke daftar doa
      </Link>

      {/* Category */}
      <Link
        href={`/doa?kategori=${d.categorySlug}`}
        className="inline-block text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full mb-4 hover:bg-emerald-500/20 transition-colors"
      >
        {d.categoryName}
      </Link>

      {/* Title */}
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">{d.title}</h1>

      {/* Arabic */}
      <div className="bg-white/5 border border-white/5 rounded-2xl p-6 sm:p-8 mb-6 text-center">
        <p className="text-3xl sm:text-4xl font-arabic leading-[2.5] text-amber-200/90" dir="rtl">
          {d.arabic}
        </p>
      </div>

      {/* Latin */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-amber-400/60 uppercase tracking-wider mb-2">Bacaan Latin</h3>
        <p className="text-white/80 text-base leading-relaxed italic">
          {d.latin}
        </p>
      </div>

      {/* Translation */}
      <div className="mb-6">
        <h3 className="text-xs font-semibold text-amber-400/60 uppercase tracking-wider mb-2">Artinya</h3>
        <p className="text-white text-base leading-relaxed">
          {d.translation}
        </p>
      </div>

      {/* Source */}
      {d.source && (
        <div className="mb-8">
          <h3 className="text-xs font-semibold text-amber-400/60 uppercase tracking-wider mb-2">Sumber</h3>
          <p className="text-emerald-400/80 text-sm">{d.source}</p>
        </div>
      )}

      {/* Download Card */}
      <DoaDetailClient
        title={d.title}
        slug={d.slug}
        arabic={d.arabic}
        latin={d.latin}
        translation={d.translation}
        source={d.source || undefined}
        category={d.categoryName || ''}
      />
    </div>
  )
}
