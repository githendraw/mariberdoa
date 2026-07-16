import { NextRequest, NextResponse } from 'next/server'
import * as fs from 'fs'
import * as path from 'path'

export async function GET(req: NextRequest) {
  const filePath = req.nextUrl.searchParams.get('path')
  if (!filePath) {
    return NextResponse.json({ error: 'Parameter path diperlukan' }, { status: 400 })
  }

  // Security: prevent directory traversal
  const safePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '')
  const fullPath = path.join(process.cwd(), 'public', safePath)

  // Only allow files from images/cards directory
  if (!fullPath.startsWith(path.join(process.cwd(), 'public', 'images', 'cards'))) {
    return NextResponse.json({ error: 'Akses ditolak' }, { status: 403 })
  }

  if (!fs.existsSync(fullPath)) {
    return NextResponse.json({ error: 'File tidak ditemukan' }, { status: 404 })
  }

  const buffer = fs.readFileSync(fullPath)
  const ext = path.extname(fullPath).toLowerCase()
  const contentTypeMap: Record<string, string> = {
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
  }

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': contentTypeMap[ext] || 'application/octet-stream',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
