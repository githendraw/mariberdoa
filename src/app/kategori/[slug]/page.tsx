import { db } from '@/lib/db/index'
import { doas, categories } from '@/lib/db/schema'
import { eq, desc } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Download } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function KategoriDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const cat = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1)
  if (cat.length === 0) notFound()

  const allDoas = await db.select({
    id: doas.id, title: doas.title, slug: doas.slug,
    arabic: doas.arabic,
  }).from(doas)
    .where(eq(doas.categoryId, cat[0].id))
    .orderBy(desc(doas.createdAt))

  return (
    <div className="min-h-screen max-w-4xl mx-auto px-4 py-8">
      <Link href="/" className="text-amber-400/60 hover:text-amber-400 text-sm mb-4 inline-block transition-colors">
        ← Beranda
      </Link>
      <h1 className="text-3xl font-bold mb-1">{cat[0].icon} {cat[0].name}</h1>
      <p className="text-white/40 text-sm mb-8">{allDoas.length} doa</p>

      <div className="space-y-3">
        {allDoas.map((d) => (
          <Link
            key={d.id}
            href={`/doa/${d.slug}`}
            className="flex items-center justify-between bg-white/5 border border-white/5 rounded-xl px-5 py-4 hover:bg-white/[0.08] hover:border-amber-500/20 transition-all group"
          >
            <div className="flex-1">
              <p className="text-right text-lg font-arabic text-amber-300/70 line-clamp-1 mb-1" dir="rtl">
                {d.arabic}
              </p>
              <h3 className="font-medium text-white group-hover:text-amber-400 transition-colors">
                {d.title}
              </h3>
            </div>
            <Download className="w-4 h-4 text-white/20 group-hover:text-amber-400/60 ml-4 flex-shrink-0 transition-colors" />
          </Link>
        ))}
      </div>
    </div>
  )
}
